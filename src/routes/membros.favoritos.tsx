import { createFileRoute, Link } from "@tanstack/react-router";
import { allRecipes } from "@/data/recipes";
import { RecipeCard } from "@/components/RecipeCard";
import { useFavorites } from "@/lib/store";

export const Route = createFileRoute("/membros/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — 150 Receitas Italianas" },
      { name: "description", content: "Suas receitas italianas favoritas em um só lugar." },
      { property: "og:title", content: "Favoritos — 150 Receitas Italianas" },
      { property: "og:description", content: "Suas receitas italianas favoritas em um só lugar." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favs = useFavorites();
  const list = allRecipes.filter((r) => favs.includes(r.slug));
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-4xl font-semibold sm:text-5xl">♡ Favoritos</h1>
        <p className="mt-1 text-muted-foreground">{list.length} receita{list.length === 1 ? "" : "s"} salva{list.length === 1 ? "" : "s"}</p>
      </header>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-card p-12 text-center shadow-soft">
          <p className="text-4xl">❤️</p>
          <p className="mt-3 font-display text-2xl">Nenhum favorito ainda</p>
          <p className="text-sm text-muted-foreground">Toque no coração de uma receita para salvá-la aqui.</p>
          <Link to="/membros/volumes" className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Explorar receitas</Link>
        </div>
      )}
    </div>
  );
}
