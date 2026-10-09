import { useSyncExternalStore } from "react";

type User = { name: string; email: string };

const KEYS = { user: "ri_user", fav: "ri_favorites", seen: "ri_explored", unlocked: "ri_unlocked" } as const;
const listeners = new Set<() => void>();
const cache = new Map<string, { raw: string | null; value: unknown }>();

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as T;
  let value: T = fallback;
  try {
    value = raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    value = fallback;
  }
  cache.set(key, { raw, value });
  return value;
}

function write(key: string, value: unknown) {
  if (value === null) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(value));
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const EMPTY: string[] = [];

export function useUser() {
  return useSyncExternalStore(subscribe, () => read<User | null>(KEYS.user, null), () => null);
}
export const setUser = (u: User | null) => write(KEYS.user, u);
export const getUser = () => read<User | null>(KEYS.user, null);

export function useFavorites() {
  return useSyncExternalStore(subscribe, () => read<string[]>(KEYS.fav, EMPTY), () => EMPTY);
}
export function toggleFavorite(slug: string) {
  const cur = read<string[]>(KEYS.fav, EMPTY);
  write(KEYS.fav, cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
}

export function useExplored() {
  return useSyncExternalStore(subscribe, () => read<string[]>(KEYS.seen, EMPTY), () => EMPTY);
}
export function markExplored(slug: string) {
  const cur = read<string[]>(KEYS.seen, EMPTY);
  if (!cur.includes(slug)) write(KEYS.seen, [...cur, slug]);
}

export function useUnlocked() {
  return useSyncExternalStore(subscribe, () => read<string[]>(KEYS.unlocked, EMPTY), () => EMPTY);
}
export function unlockProduct(id: string) {
  const cur = read<string[]>(KEYS.unlocked, EMPTY);
  if (!cur.includes(id)) write(KEYS.unlocked, [...cur, id]);
}
