// Ofertas e senhas dos produtos extras (order bumps).
// buyUrl: link de checkout (GG Checkout) de cada produto.
export type Offer = { from: number; to: number; password: string; buyUrl: string };

export const offers: Record<string, Offer> = {
  lasanhas: { from: 7.9, to: 6.9, password: "0958", buyUrl: "https://ggcheckout.app/checkout/v5/DOlBgyzIFuugXIGGovcH" },
  sobremesas: { from: 8.9, to: 7.9, password: "8576", buyUrl: "https://ggcheckout.app/checkout/v5/5FoX7ggoQfQ4HVaApSCo" },
  entradas: { from: 12.9, to: 9.9, password: "7564", buyUrl: "https://ggcheckout.app/checkout/v5/zya9tQWIjV4lWptIyYc0" },
  "massas-italianas": { from: 14.9, to: 12.9, password: "8753", buyUrl: "https://ggcheckout.app/checkout/v5/3pOWPfzmkflwcL68sFOz" },
};

export const discountPct = (o: Pick<Offer, "from" | "to">) => Math.round((1 - o.to / o.from) * 100);
export const brl = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`;
export const checkPassword = (productId: string, typed: string) =>
  offers[productId]?.password === typed.trim();
