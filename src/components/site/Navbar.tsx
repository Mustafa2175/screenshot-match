import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { img } from "@/data/menu";
import { useCart } from "@/lib/cart";

const links = [
  ["#home", "الرئيسية"],
  ["#menu", "المنيو"],
  ["#about", "عن مانشيز"],
  ["#gallery", "الصور"],
  ["#contact", "تواصل معانا"],
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors ${scrolled || open ? "bg-plum-deep/95 shadow-lg backdrop-blur" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <img src={img("logo")} alt="Munchie's" className="h-12 w-12 rounded-full" />
          <span className="font-display text-2xl text-gold" dir="ltr">MUNCHIE'S</span>
        </a>
        <ul className="hidden items-center gap-6 font-bold lg:flex">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} className="transition-colors hover:text-gold">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={() => openCart(true)} aria-label="السلة" className="relative rounded-full p-2.5 hover:bg-white/10">
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -top-0.5 -left-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs font-black text-ink">{count}</span>
            )}
          </button>
          <a href="#menu" className="btn-gold hidden px-5 py-2.5 sm:inline-block">اطلب دلوقتي</a>
          <button className="rounded-full p-2.5 hover:bg-white/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="القائمة">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-1 px-4 pb-4 text-lg font-bold lg:hidden">
          {links.map(([h, l]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 hover:bg-white/10">{l}</a></li>
          ))}
          <li><a href="#menu" onClick={() => setOpen(false)} className="btn-gold mt-2 block px-5 py-3 text-center">اطلب دلوقتي</a></li>
        </ul>
      )}
    </header>
  );
}
