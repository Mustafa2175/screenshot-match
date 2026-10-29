import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/menu";

type Line = { id: string; name: string; price: number; qty: number; image?: string };
type Ctx = {
  lines: Line[];
  add: (i: MenuItem) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "munchies-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(lines)); }, [lines, loaded]);

  const add = (i: MenuItem) =>
    setLines((ls) => {
      const f = ls.find((l) => l.id === i.id);
      return f ? ls.map((l) => (l.id === i.id ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { id: i.id, name: i.name, price: i.price, qty: 1, image: i.image }];
    });
  const setQty = (id: string, qty: number) =>
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  const remove = (id: string) => setLines((ls) => ls.filter((l) => l.id !== id));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  return (
    <CartContext.Provider value={{ lines, add, setQty, remove, clear: () => setLines([]), count, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
