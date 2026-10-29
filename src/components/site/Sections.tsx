import { useState } from "react";
import { Facebook, MapPin, Phone, X } from "lucide-react";
import { contact, img } from "@/data/menu";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-plum-deep pt-28 pb-20 md:pt-36">
      <div className="halftone pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="animate-rise">
          <p className="font-display text-lg tracking-wider text-gold" dir="ltr">BURGERS • FRIES • GOOD VIBES</p>
          <h1 className="mt-3 text-6xl leading-[1.1] font-black md:text-8xl">
            لو كبير عليك،{" "}
            <span className="relative inline-block px-3 text-ink">
              <span className="brush absolute inset-0 -rotate-2" aria-hidden />
              <span className="relative">اضغط!</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-xl text-muted-foreground">الجوع ليه حل واحد... مانشيز! اكتشف المنيو واختار اللي على مزاجك.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="btn-gold px-8 py-4 text-lg">اطلب دلوقتي</a>
            <a href="#menu" className="btn-ghost-light px-8 py-4 text-lg">شوف المنيو</a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          <div className="brush absolute inset-[8%] rotate-6 opacity-90" />
          <img src={img("hero")} alt="برجر مانشيز" className="relative h-full w-full rounded-full object-cover shadow-2xl ring-8 ring-plum" />
          <img src={img("cup")} alt="" aria-hidden className="animate-floaty absolute -bottom-4 -right-2 w-24 rounded-2xl shadow-xl md:w-32" />
          <img src={img("logo")} alt="" aria-hidden className="absolute -top-2 left-2 w-20 rounded-full shadow-xl md:w-24" />
        </div>
      </div>
    </section>
  );
}

const showcase = [
  { k: "smash", t: "مانشيز سماش" },
  { k: "rambo", t: "رامبو" },
  { k: "fb-5050", t: "فات بير 50/50" },
];

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-plum-deep py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="max-w-3xl text-5xl leading-tight font-black md:text-7xl">
          مش مجرد أكلة... دي <span className="font-display text-gold" dir="ltr">Munchie's</span> mood.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-5 md:grid-rows-2">
          {showcase.map((s, i) => (
            <figure key={s.k} className={`group relative overflow-hidden rounded-3xl bg-plum ${i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-2"}`}>
              <img src={img(s.k)} alt={s.t} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "h-80 md:h-full" : "h-64"}`} />
              <figcaption className="absolute bottom-4 right-4 rounded-full bg-gold px-5 py-2 text-lg font-black text-ink">{s.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-gold py-24 text-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-5xl font-black md:text-7xl">إحنا مانشيز!</h2>
          <p className="mt-6 text-xl leading-loose font-semibold">
            لما الجوع يضرب والنفس تبقى في أكلة مظبوطة، مانشيز موجود عشان يخلي التجربة ألذ. اختار من المنيو، وابعت طلبك، واستمتع بمود مانشيز.
          </p>
          <a href="#menu" className="mt-8 inline-block rounded-full bg-plum-deep px-8 py-4 text-lg font-black text-gold transition-transform hover:-translate-y-0.5">شوف المنيو</a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={img("loaded-fries")} alt="لوديد فرايز" loading="lazy" className="aspect-square w-full rotate-[-3deg] rounded-3xl object-cover shadow-xl" />
          <img src={img("grilled-cheese")} alt="برجر جريلد تشيز" loading="lazy" className="mt-10 aspect-square w-full rotate-[3deg] rounded-3xl object-cover shadow-xl" />
        </div>
      </div>
    </section>
  );
}

const gallery = ["loaded-fries", "honey", "cono", "omly", "fraizo", "croissant", "twister", "grilawy", "philly", "macdo", "steak", "tropi"];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="scroll-mt-20 bg-plum py-24">
      <div className="mx-auto max-w-7xl px-4">
        <p className="font-display text-gold" dir="ltr">GALLERY</p>
        <h2 className="mt-1 text-4xl font-black md:text-6xl">بص واتجوّع</h2>
        <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
          {gallery.map((k) => (
            <button key={k} onClick={() => setOpen(k)} className="mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid">
              <img src={img(k)} alt="من منيو مانشيز" loading="lazy" className="w-full transition-transform duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/90 p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-4 left-4 rounded-full bg-white/10 p-2" aria-label="إغلاق"><X /></button>
          <img src={img(open)} alt="" className="max-h-[85vh] max-w-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-plum-deep py-24">
      <div className="halftone pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-4xl font-black md:text-6xl">جعان؟ كلّمنا!</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a href={`tel:${contact.phoneLocal}`} className="rounded-3xl bg-card p-6 hover:ring-2 hover:ring-gold">
            <Phone className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-3 text-sm text-muted-foreground">تليفون</p>
            <p className="mt-1 text-xl font-black" dir="ltr">{contact.phoneDisplay}</p>
          </a>
          <div className="rounded-3xl bg-card p-6">
            <MapPin className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-3 text-sm text-muted-foreground">العنوان</p>
            <p className="mt-1 text-lg font-bold">{contact.address}</p>
          </div>
          <a href={contact.facebook} target="_blank" rel="noreferrer" className="rounded-3xl bg-card p-6 hover:ring-2 hover:ring-gold">
            <Facebook className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-3 text-sm text-muted-foreground">فيسبوك</p>
            <p className="mt-1 text-xl font-black">صفحة مانشيز</p>
          </a>
        </div>
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" className="btn-gold mt-10 inline-block px-10 py-4 text-xl">كلمنا على واتساب</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-right">
        <div className="flex items-center gap-3">
          <img src={img("logo")} alt="Munchie's" className="h-14 w-14 rounded-full" />
          <div>
            <p className="font-display text-2xl text-gold" dir="ltr">MUNCHIE'S</p>
            <p className="font-bold">لو كبير عليك، اضغط</p>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-5 font-bold text-muted-foreground">
          <a href="#menu" className="hover:text-gold">المنيو</a>
          <a href="#about" className="hover:text-gold">عن مانشيز</a>
          <a href="#gallery" className="hover:text-gold">الصور</a>
          <a href="#contact" className="hover:text-gold">تواصل</a>
          <a href={contact.facebook} target="_blank" rel="noreferrer" className="hover:text-gold">فيسبوك</a>
        </nav>
        <a href="#menu" className="btn-gold px-6 py-3">اطلب دلوقتي</a>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Munchie's مانشيز — أسوان</p>
    </footer>
  );
}
