import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { MenuSection } from "@/components/site/MenuSection";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Hero, Showcase, About, Gallery, Contact, Footer } from "@/components/site/Sections";
import { CartProvider, useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مانشيز Munchie's | برجر وبطاطس في أسوان" },
      { name: "description", content: "منيو مانشيز كامل بالأسعار — برجر، فات بير، بطاطس Cup وCono. اختار واطلب على واتساب. لو كبير عليك، اضغط!" },
      { property: "og:title", content: "مانشيز Munchie's — لو كبير عليك، اضغط" },
      { property: "og:description", content: "برجر وبطاطس وجود فايبز في أسوان. اطلب على واتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function FloatingCart() {
  const { count, total, setOpen } = useCart();
  if (!count) return null;
  return (
    <button onClick={() => setOpen(true)} className="btn-gold fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 px-6 py-3.5 text-lg">
      <ShoppingBag className="h-5 w-5" /> شوف طلبك ({count}) — {total} ج
    </button>
  );
}

function Index() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <Showcase />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingCart />
      <CartDrawer />
    </CartProvider>
  );
}
