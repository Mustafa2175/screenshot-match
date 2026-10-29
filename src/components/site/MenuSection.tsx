import { useState } from "react";
import { Plus } from "lucide-react";
import { categories, menu, type MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";

function Card({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const onAdd = () => { add(item); setAdded(true); setTimeout(() => setAdded(false), 900); };

  if (!item.image)
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3">
        <span className="font-bold">{item.name}</span>
        <div className="flex items-center gap-3">
          <span className="font-black text-gold">{item.price} ج</span>
          <button onClick={onAdd} aria-label={`أضف ${item.name}`} className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink hover:bg-gold-soft">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    );

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] ring-1 ring-white/5 transition-transform hover:-translate-y-1">
      <div className="halftone relative aspect-[4/3] overflow-hidden bg-plum">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          {item.bestSeller && <span className="rounded-full bg-destructive px-2.5 py-1 text-[11px] font-black" dir="ltr">BEST SELLER</span>}
          {item.isNew && <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-black text-ink" dir="ltr">NEW</span>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black text-gold">{item.name}</h3>
          <span className="shrink-0 rounded-full border-2 border-gold px-3 py-0.5 font-black">{item.price} ج</span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
        <button onClick={onAdd} className="btn-gold mt-2 py-2.5">{added ? "اتضاف ✓" : "أضف للطلب"}</button>
      </div>
    </article>
  );
}

export function MenuSection() {
  const [cat, setCat] = useState(categories[0]?.id ?? "burgers");
  const current = categories.find((c) => c.id === cat)!;
  const items = menu.filter((m) => m.category === cat);
  return (
    <section id="menu" className="relative scroll-mt-20 bg-plum py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="font-display text-gold" dir="ltr">THE MENU</p>
        <h2 className="mt-1 text-4xl font-black md:text-6xl">إيه اللي نفسك فيه؟</h2>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">اختار أكلك، وشوف المنيو، وخلي مانشيز يظبطلك المود.</p>

        <div className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 font-bold transition-colors ${c.id === cat ? "bg-gold text-ink" : "bg-white/10 hover:bg-white/20"}`}>
              {c.label}
            </button>
          ))}
        </div>
        {current.note && <p className="mt-4 inline-block rounded-full bg-destructive/90 px-4 py-1.5 text-sm font-bold">{current.note}</p>}

        <div className={`mt-8 grid gap-5 ${cat === "extras" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {items.map((i) => <Card key={i.id} item={i} />)}
        </div>
      </div>
    </section>
  );
}
