// Menu taken from Munchie's printed menus. Edit names/prices here — everything else updates.
const imgs = import.meta.glob<{ default: { url: string } }>("../assets/menu/*.asset.json", { eager: true });
export const img = (key: string): string | undefined =>
  imgs[`../assets/menu/${key}.jpg.asset.json`]?.default.url;

export type Category = { id: string; label: string; note?: string };
export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number; // EGP
  category: string;
  image?: string;
  bestSeller?: boolean;
  isNew?: boolean;
};

export const categories: Category[] = [
  { id: "burgers", label: "برجر مانشيز" },
  { id: "vip", label: "VIP منيو" },
  { id: "fatbir", label: "فات بير", note: "بدون بطاطس — ضيف بطاطس + كولا بـ 35 ج" },
  { id: "specials", label: "سبيشال" },
  { id: "cup", label: "Cup بطاطس" },
  { id: "cono", label: "Cono بطاطس" },
  { id: "extras", label: "إضافات" },
];

type Row = [id: string, name: string, desc: string, price: number, image?: string, flags?: "best" | "new"];
const rows: Record<string, Row[]> = {
  burgers: [
    ["m-beef", "مانشيز بيف", "برجر + سلايس شيدر + صوص مانشيز + خضار + خيار مخلل + بطاطس", 140, "beef", "best"],
    ["m-strips", "مانشيز استربس", "استربس + صوص مانشيز + خضار + تركي + خيار مخلل + بطاطس", 135, "strips", "best"],
    ["m-grill", "فراخ جريل", "صدور جريل + صوص مانشيز + خضار + خيار مخلل + بطاطس", 130, "grill", "best"],
    ["m-rambo", "رامبو", "برجر + استربس أو جريل + تركي + خضار + صوص مانشيز + خيار مخلل + بطاطس", 180, "rambo", "best"],
    ["m-bikini", "مانشيز بيكيني", "برجر + صوص مانشيز + خضار + هوت دوج + خلطة مانشيز السرية + بطاطس", 170, "bikini"],
    ["m-steak", "مانشيز استيك", "برجر + صوص مانشيز + خضار + لحم استيك + خلطة مانشيز السرية + بطاطس", 175, "steak", "best"],
  ],
  vip: [
    ["v-honey", "هاني جلايزد", "برجر بالعسل + صوص مانشيز + خس + بيف بيكون + خيار مخلل + بطاطس", 120, "honey", "best"],
    ["v-philly", "فيلي تشيز استيك", "لحم استيك + صوص مانشيز + خلطة مانشيز + أمريكان تشيز + بطاطس", 180, "philly", "best"],
    ["v-tropi", "تروبي", "برجر + أناناس + صوص مانشيز + خس + مشروم + باربكيو + بطاطس", 125, "tropi", "best"],
    ["v-cigar", "سيجار", "هوت دوج + خلطة مانشيز + هاني ماسترد + بصل مكرمل + بطاطس", 80, "cigar", "best"],
    ["v-smash", "مانشيز سماش", "برجر سماش + صوص مانشيز + شيدر أحمر + بصل مكرمل + بطاطس", 120, "smash", "best"],
    ["v-omly", "أوملي", "برجر + بيض مقلي + صوص مانشيز + خس + طماطم + خيار مخلل + بطاطس", 140, "omly", "best"],
    ["v-croissant", "كرواسون سماش", "برجر سماش + كرواسون + روز بيف + صوص مانشيز + أمريكان تشيز + خيار مخلل + بطاطس", 120, "croissant", "best"],
    ["v-oldschool", "أولد سكول", "برجر + صوص مانشيز + هاني ماسترد + شيدر أحمر + خيار مخلل + بطاطس", 120, "oldschool", "best"],
    ["v-grilawy", "جريلاوي", "صوص باربكيو + كرنب بالعسل + برجر فراخ جريل + صوص شيدر + بطاطس", 100, "grilawy"],
    ["v-twister", "تويستر", "استربس + عيش تورتيا + موتزاريلا + كابوتشا + صوص شيدر + بطاطس", 115, "twister", "new"],
  ],
  fatbir: [
    ["f-beef", "فات بير بيف", "٢ قطع برجر + صوص مانشيز + خضار + موتزاريلا + خيار مخلل", 185, "fb-beef", "best"],
    ["f-strips", "فات بير استربس", "فراخ استربس + صوص مانشيز + خضار + موتزاريلا + تركي + شيدر + خيار مخلل", 170, "fb-strips"],
    ["f-grill", "فات بير فراخ جريل", "صدور جريل + صوص مانشيز + خضار + موتزاريلا + تركي + خيار مخلل", 165, "fb-grill"],
    ["f-5050", "فات بير 50/50", "برجر + استربس أو جريل + صوص مانشيز + خضار + موتزاريلا + شيدر + روز بيف + خيار مخلل", 190, "fb-5050", "best"],
    ["f-bikini", "فات بير بيكيني", "برجر + صوص مانشيز + خضار + هوت دوج + موتزاريلا + خلطة مانشيز السرية", 195, "fb-bikini"],
    ["f-steak", "فات بير استيك", "برجر + صوص مانشيز + خضار + لحم استيك + موتزاريلا + خلطة مانشيز السرية", 230, "fb-steak", "best"],
  ],
  specials: [
    ["s-loaded", "لوديد فرايز", "بطاطس + برجر مفروم + شيدر + صوص مانشيز + هالبينو + بصل", 120, "loaded-fries", "best"],
    ["s-fraizo", "فرايزو", "بطاطس + كابوتشا + تركي + صوص", 70, "fraizo", "best"],
    ["s-macdo", "تشيكن ماكدو الكداب", "بطاطس + عيش توست + خس + صوص مانشيز + كولا", 65, "macdo"],
    ["s-grilled-cheese", "برجر جريلد تشيز", "برجر + عيش توست + أمريكان تشيز + بطاطس", 120, "grilled-cheese", "best"],
  ],
  cup: [
    ["c-2sauce", "Cup ٢ صوص", "بطاطس + ٢ صوص", 45, "cup", "best"],
    ["c-hotdog", "Cup هوت دوج", "بطاطس + هوت دوج + صوص", 55, "cup"],
    ["c-grill", "Cup جريل", "بطاطس + فراخ جريل + صوص", 70, "cup"],
    ["c-burger", "Cup برجر", "بطاطس + برجر + صوص", 80, "cup", "best"],
    ["c-crispy", "Cup كريسبي", "بطاطس + كرسبي + صوص", 75, "cup", "best"],
  ],
  cono: [
    ["k-2sauce", "Cono ٢ صوص", "بطاطس + ٢ صوص", 55, "cono", "best"],
    ["k-hotdog", "Cono هوت دوج", "بطاطس + هوت دوج + صوص", 65, "cono"],
    ["k-grill", "Cono جريل", "بطاطس + فراخ جريل + صوص", 80, "cono", "best"],
    ["k-burger", "Cono برجر", "بطاطس + برجر + صوص", 100, "cono"],
    ["k-crispy", "Cono كريسبي", "بطاطس + كرسبي + صوص", 90, "cono", "best"],
  ],
  extras: [
    ["e-friescola", "بطاطس + كولا (مع الفات بير)", "", 35],
    ["e-chips", "بطاطس شيبس", "", 20],
    ["e-sauce", "صوص", "", 20],
    ["e-mushroom", "مشروم", "", 10],
    ["e-egg", "بيض", "", 10],
    ["e-cabbage", "كرنب بالعسل", "", 10],
    ["e-caramel", "بصل مكرمل", "", 7],
    ["e-peppers", "فلفل ألوان", "", 7],
    ["e-honey", "عسل", "", 7],
    ["e-jalapeno", "هالبينو", "", 4],
    ["e-pickles", "خيار مخلل", "", 4],
    ["e-onion", "بصل", "", 4],
    ["e-tomato", "طماطم", "", 4],
    ["e-lettuce", "خس", "", 4],
    ["e-pepper", "فلفل", "", 4],
  ],
};

export const menu: MenuItem[] = Object.entries(rows).flatMap(([category, list]) =>
  list.map(([id, name, desc, price, image, flag]) => ({
    id, name, desc, price, category,
    image: image ? img(image) : undefined,
    bestSeller: flag === "best",
    isNew: flag === "new",
  })),
);

export const contact = {
  phoneDisplay: "010 25707026",
  phoneLocal: "01025707026",
  whatsapp: "201025707026",
  address: "حديقة الورد أمام الراية — فرع الكورنيش، أسوان",
  facebook: "https://www.facebook.com/profile.php?id=61579057995805",
};
