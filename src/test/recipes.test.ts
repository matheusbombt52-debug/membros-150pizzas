import { describe, expect, it } from "vitest";
import { checkPassword, discountPct, offers } from "@/data/offers";
import { allRecipes, extraVolumes, recipes, volumes } from "@/data/recipes";

describe("collection", () => {
  it("has 150 recipes with unique slugs", () => {
    expect(recipes).toHaveLength(150);
    expect(new Set(recipes.map((r) => r.slug)).size).toBe(150);
  });
  it("splits volumes 30+25+25+20+20+15+15", () => {
    expect(volumes.map((v) => v.names.length)).toEqual([30, 25, 25, 20, 20, 15, 15]);
  });
  it("has 4 extra products with 30+35+48+50 recipes and unique slugs", () => {
    expect(extraVolumes.map((v) => v.names.length)).toEqual([30, 35, 48, 50]);
    expect(allRecipes).toHaveLength(150 + 163);
    expect(new Set(allRecipes.map((r) => r.slug)).size).toBe(150 + 163);
  });
  it("has a password and discount for each extra product", () => {
    expect(extraVolumes.every((v) => offers[v.id])).toBe(true);
    expect(extraVolumes.map((v) => discountPct(offers[v.id]!))).toEqual([13, 11, 23, 13]);
    expect(checkPassword("lasanhas", " 0958 ")).toBe(true);
    expect(checkPassword("lasanhas", "8576")).toBe(false);
  });
  it("every extra product has a checkout link", () => {
    expect(extraVolumes.every((v) => offers[v.id]!.buyUrl.startsWith("https://ggcheckout.app/checkout/"))).toBe(true);
    expect(new Set(extraVolumes.map((v) => offers[v.id]!.buyUrl)).size).toBe(4);
  });
});
