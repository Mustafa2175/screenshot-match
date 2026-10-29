import { describe, it, expect } from "vitest";
import { buildOrderMessage, cartTotal, whatsappUrl, isValidEgyptPhone } from "@/lib/whatsapp";
import { contact } from "@/data/menu";

describe("whatsapp order", () => {
  const lines = [{ name: "مانشيز بيف", price: 140, qty: 2 }, { name: "صوص", price: 20, qty: 1 }];
  it("totals prices × quantities", () => expect(cartTotal(lines)).toBe(300));
  it("includes total and customer in message", () => {
    const m = buildOrderMessage(lines, { name: "أحمد", phone: "01012345678", address: "أسوان" });
    expect(m).toContain("الإجمالي: 300 ج");
    expect(m).toContain("الاسم: أحمد");
  });
  it("uses the Egyptian international number", () => {
    expect(contact.whatsapp).toBe("201025707026");
    expect(whatsappUrl(contact.whatsapp, "hi")).toBe("https://wa.me/201025707026?text=hi");
  });
  it("validates Egyptian mobiles", () => {
    expect(isValidEgyptPhone("01025707026")).toBe(true);
    expect(isValidEgyptPhone("12345")).toBe(false);
  });
});
