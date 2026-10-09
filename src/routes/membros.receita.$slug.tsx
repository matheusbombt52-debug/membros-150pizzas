import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Clock, Heart, Users, Lightbulb } from "lucide-react";
import { getRecipe, getVolume, recipesOf, volumeLabel } from "@/data/recipes";
import { markExplored, toggleFavorite, useFavorites, useUnlocked } from "@/lib/store";
import { UnlockCard } from "@/components/UnlockCard";

export const Route = createFileRoute("/membros/receita/$slug")({
  loader: ({ params }) => {
    const r = getRecipe(params.slug);
    if (!r) throw notFound();
    return { slug: r.slug };
  },
  head: ({ loaderData }) => {
    const r = loaderData ? getRecipe(loaderData.slug) : undefined;
    const title = r ? `${r.name} — 150 Receitas Italianas` : "Receita não encontrada";
    return {
      meta: [
        { title },
        { name: "description", content: r?.description ?? "Receita não encontrada." },
        { property: "og:title", content: title },
        { property: "og:description", content: r?.description ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-3xl">Receita não encontrada</h1>
      <Link to="/membros/volumes" className="mt-4 inline-block font-semibold text-primary">← Voltar para receitas</Link>
    </div>
  ),
  component: RecipePage,
});

function RecipePage() {
  const { slug } = Route.useLoaderData();
  const r = getRecipe(slug)!;
  const vol = getVolume(r.volumeId)!;
  const favs = useFavorites();
  const fav = favs.includes(slug);
  const unlocked = useUnlocked();
  const locked = !!vol.extra && !unlocked.includes(vol.id);
  useEffect(() => {
    if (!locked) markExplored(slug);
  }, [slug, locked]);

  const siblings = recipesOf(vol.id);
  const idx = siblings.findIndex((s) => s.slug === slug);
  const next = siblings[(idx + 1) % siblings.length]!;

  if (locked) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <Link to="/membros/produtos" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Meus produtos</Link>
        <div className="rounded-3xl border border-border bg-background p-5 shadow-soft sm:p-6">
          <UnlockCard volume={vol} />
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between gap-3">
        <Link to="/membros/volumes/$volumeId" params={{ volumeId: vol.id }} className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          ← Voltar para receitas
        </Link>
        <button
          onClick={() => toggleFavorite(slug)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${fav ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-primary"}`}
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} /> {fav ? "Favoritada" : "Favoritar"}
        </button>
      </div>

      <div className="overflow-hidden rounded-3xl shadow-lift">
        <img src={r.image} alt={r.name} width={1024} height={768} className="aspect-[16/10] w-full object-cover" />
      </div>

      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {volumeLabel(vol)} · {vol.title} · Nº {String(r.number).padStart(3, "0")}
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-6xl">{r.name}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{r.description}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
          <Clock className="h-6 w-6 shrink-0 text-primary" />
          <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Tempo de preparo</p><p className="font-display text-2xl font-semibold">{r.time}</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
          <Users className="h-6 w-6 shrink-0 text-basil" />
          <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Rendimento</p><p className="font-display text-xl font-semibold leading-tight sm:text-2xl">{r.yield}</p></div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
        <section className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="text-3xl font-semibold">Ingredientes</h2>
          <ul className="mt-4 space-y-3">
            {r.ingredients.map((i) => (
              <li key={i} className="flex gap-3 border-b border-dashed border-border pb-3 last:border-0">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl bg-card p-6 shadow-soft">
          <h2 className="text-3xl font-semibold">Modo de preparo</h2>
          <ol className="mt-4 space-y-5">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wine font-display text-lg font-semibold text-primary-foreground">{i + 1}</span>
                <p className="pt-1.5 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="rounded-3xl border border-gold/40 bg-accent p-6">
        <h2 className="flex items-center gap-2 text-3xl font-semibold"><Lightbulb className="h-6 w-6 text-gold" /> Dicas</h2>
        <ul className="mt-4 space-y-2">
          {r.tips.map((t) => (
            <li key={t} className="flex gap-3"><span className="text-gold">✦</span>{t}</li>
          ))}
        </ul>
      </section>

      <Link
        to="/membros/receita/$slug"
        params={{ slug: next.slug }}
        className="group card-hover flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft"
      >
        <img src={next.image} alt={next.name} loading="lazy" width={1024} height={768} className="h-20 w-24 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Próxima receita</p>
          <p className="truncate font-display text-2xl font-semibold">{next.name}</p>
        </div>
        <span className="ml-auto text-2xl text-primary transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}
