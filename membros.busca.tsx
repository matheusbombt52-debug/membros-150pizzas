import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { allRecipes, extraVolumes, normalize, volumes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";

type S = { q?: string | undefined; filtro?: string | undefined };

export const Route = createFileRoute("/membros/busca")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: typeof s["q"] === "string" ? (s["q"] as string) : undefined,
    filtro: typeof s["filtro"] === "string" ? (s["filtro"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Buscar receitas — 150 Receitas Italianas" },
      { name: "description", content: "Encontre qualquer uma das 150 receitas pelo nome e filtre por volume." },
      { property: "og:title", content: "Buscar receitas — 150 Receitas Italianas" },
      { property: "og:description", content: "Encontre qualquer uma das 150 receitas pelo nome." },
    ],
  }),
  component: SearchPage,
});

const filters = [{ id: "todos", label: "Todos" }, ...[...volumes, ...extraVolumes].map((v) => ({ id: v.id, label: v.short }))];

function SearchPage() {
  const { q = "", filtro = "todos" } = Route.useSearch();
  const navigate = useNavigate({ from: "/membros/busca" });
  const nq = normalize(q.trim());
  const results = allRecipes.filter(
    (r) => (filtro === "todos" || r.volumeId === filtro) && (!nq || normalize(r.name).includes(nq)),
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-semibold sm:text-5xl">Buscar receitas</h1>
        <p className="mt-1 text-muted-foreground">Experimente “Margherita”, “Lasanha”, “Tiramisù” ou “Nhoque”.</p>
      </header>
      <div className="relative">
        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => navigate({ search: (p: S) => ({ ...p, q: e.target.value }), replace: true })}
          placeholder="Buscar uma receita..."
          className="h-14 w-full rounded-2xl border border-input bg-card pl-14 pr-4 text-base shadow-soft outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => navigate({ search: (p: S) => ({ ...p, filtro: f.id }), replace: true })}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${filtro === f.id ? "bg-ink text-ink-foreground" : "bg-card text-muted-foreground shadow-soft hover:text-foreground"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{results.length} receita{results.length === 1 ? "" : "s"} encontrada{results.length === 1 ? "" : "s"}</p>
      {results.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-card p-12 text-center shadow-soft">
          <p className="text-4xl">🍝</p>
          <p className="mt-3 font-display text-2xl">Nenhuma receita encontrada</p>
          <p className="text-sm text-muted-foreground">Tente outro nome ou filtro.</p>
        </div>
      )}
    </div>
  );
}
