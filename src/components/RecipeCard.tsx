import { Link } from "@tanstack/react-router";
import { Heart, Check } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { toggleFavorite, useExplored, useFavorites } from "@/lib/store";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const favs = useFavorites();
  const seen = useExplored();
  const fav = favs.includes(recipe.slug);
  return (
    <article className="group card-hover relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft">
      <Link to="/membros/receita/$slug" params={{ slug: recipe.slug }} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 font-display text-sm font-semibold text-ink-foreground backdrop-blur">
          Nº {String(recipe.number).padStart(3, "0")}
        </span>
        {seen.includes(recipe.slug) && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-basil px-2 py-0.5 text-[11px] font-semibold text-basil-foreground">
            <Check className="h-3 w-3" /> Explorada
          </span>
        )}
      </Link>
      <button
        aria-label={fav ? "Remover dos favoritos" : "Favoritar"}
        onClick={() => toggleFavorite(recipe.slug)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-primary shadow-soft backdrop-blur transition-transform active:scale-90"
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-primary" : ""}`} />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-2xl font-semibold leading-tight">{recipe.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
        <Link
          to="/membros/receita/$slug"
          params={{ slug: recipe.slug }}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-3 text-sm font-semibold text-primary"
        >
          Ver receita <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
