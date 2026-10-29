import { useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { contact } from "@/data/menu";
import { buildOrderMessage, isValidEgyptPhone, whatsappUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const { lines, setQty, remove, total, open, setOpen } = useCart();
  const [f, setF] = useState({ name: "", phone: "", address: "", notes: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  if (!open) return null;

  const send = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "اكتب اسمك";
    if (!isValidEgyptPhone(f.phone)) e.phone = "اكتب رقم موبايل صحيح (11 رقم)";
    if (!f.address.trim()) e.address = "اكتب العنوان";
    setErr(e);
    if (Object.keys(e).length) return;
    window.open(whatsappUrl(contact.whatsapp, buildOrderMessage(lines, f)), "_blank");
  };

  const field = (k: keyof typeof f, label: string, type = "text", area = false) => (
    <label className="block">
      <span className="mb-1 block text-sm font-bold">{label}</span>
      {area ? (
        <textarea value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} rows={2}
          className="w-full rounded-xl border border-input bg-white/5 px-3 py-2.5 outline-none focus:border-gold" />
      ) : (
        <input type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })}
          className="w-full rounded-xl border border-input bg-white/5 px-3 py-2.5 outline-none focus:border-gold" />
      )}
      {err[k] && <span className="mt-1 block text-sm text-destructive">{err[k]}</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-ink/70" onClick={() => setOpen(false)} />
      <aside className="flex h-full w-full max-w-md flex-col bg-plum-deep shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-2xl font-black">طلبك</h2>
          <button onClick={() => setOpen(false)} aria-label="إغلاق" className="rounded-full p-2 hover:bg-white/10"><X /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">السلة فاضية... روح المنيو واختار حاجة حلوة 🍔</p>
          ) : (
            <>
              <ul className="space-y-3">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-card p-3">
                    {l.image && <img src={l.image} alt="" className="h-14 w-14 rounded-xl object-cover" />}
                    <div className="flex-1">
                      <p className="font-bold">{l.name}</p>
                      <p className="text-sm text-gold">{l.price * l.qty} ج</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="زود" className="rounded-full bg-white/10 p-1.5"><Plus className="h-4 w-4" /></button>
                      <span className="w-6 text-center font-bold">{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="قلل" className="rounded-full bg-white/10 p-1.5"><Minus className="h-4 w-4" /></button>
                      <button onClick={() => remove(l.id)} aria-label="امسح" className="mr-1 rounded-full p-1.5 text-destructive hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between rounded-2xl bg-gold px-4 py-3 text-lg font-black text-ink">
                <span>الإجمالي</span><span>{total} ج</span>
              </div>
              <div className="space-y-3">
                {field("name", "الاسم")}
                {field("phone", "رقم الموبايل", "tel")}
                {field("address", "العنوان", "text", true)}
                {field("notes", "ملاحظات (اختياري)", "text", true)}
              </div>
            </>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-border p-4">
            <button onClick={send} className="btn-gold w-full py-3.5 text-lg">ابعت طلبك على واتساب</button>
            <p className="mt-2 text-center text-xs text-muted-foreground">إرسال الرسالة مش تأكيد للطلب — مانشيز هيرد عليك ويأكد الأوردر.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
