export type CartLine = { name: string; price: number; qty: number };
export type Customer = { name: string; phone: string; address: string; notes?: string };

export const cartTotal = (lines: CartLine[]) => lines.reduce((s, l) => s + l.price * l.qty, 0);

export function buildOrderMessage(lines: CartLine[], c: Customer): string {
  const items = lines.map((l) => `• ${l.name} × ${l.qty} = ${l.price * l.qty} ج`).join("\n");
  return [
    "أهلاً مانشيز! عايز أطلب الأوردر ده:",
    "",
    items,
    "",
    `الإجمالي: ${cartTotal(lines)} ج`,
    "",
    `الاسم: ${c.name}`,
    `رقم الموبايل: ${c.phone}`,
    `العنوان: ${c.address}`,
    `ملاحظات: ${c.notes?.trim() || "—"}`,
    "",
    "مستني تأكيد الطلب ❤️",
  ].join("\n");
}

export const whatsappUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const isValidEgyptPhone = (p: string) => /^01[0125]\d{8}$/.test(p.replace(/[\s-]/g, ""));
