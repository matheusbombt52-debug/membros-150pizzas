import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-kitchen.jpg";
import { extraVolumes, featuredSlugs, getRecipe, pizzaSlugs, TOTAL_EXTRA_RECIPES, TOTAL_RECIPES, volumes } from "@/data/recipes";
import { VolumeCard } from "@/components/VolumeCard";
import { TotalBar } from "@/components/TotalBar";
import { useExplored, useUser } from "@/lib/store";

export const Route = createFileRoute("/membros/")({
  head: () => ({
    meta: [
      { title: "Início — 150 Receitas Italianas" },
      { name: "description", content: "Sua cozinha italiana: 7 volumes, 150 receitas, progresso e receitas favoritas." },
      { property: "og:title", content: "Início — 150 Receitas Italianas" },
      { property: "og:description", content: "Sua cozinha italiana: 7 volumes, 150 receitas para fazer em casa." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const user = useUser();
  const explored = useExplored();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const doneCount = explored.filter((slug) => pizzaSlugs.has(slug)).length;
  const pct = Math.round((doneCount / TOTAL_RECIPES) * 100);
  const featured = featuredSlugs.map(getRecipe).filter((r) => !!r);

  return (
    <div className="space-y-12">
      <section>
        <p className="text-sm text-muted-foreground">{user ? `Olá, ${user.name}` : ""}</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Ciao! 👋 <br className="sm:hidden" />
          <span className="italic text-wine">Bem-vindo à sua cozinha italiana.</span>
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Explore suas 150 receitas e descubra novos sabores para preparar em casa.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/membros/busca", search: { q, filtro: "todos" } });
          }}
          className="relative mt-6 max-w-xl"
        >
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar uma receita..."
            className="h-14 w-full rounded-2xl border border-input bg-card pl-14 pr-4 text-base shadow-soft outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </form>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-ink text-ink-foreground shadow-lift">
        <img src={hero} alt="" width={1280} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="relative grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">🍕 Sua coleção completa</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">150 receitas italianas para sentir o sabor da Itália em casa</h2>
            <p className="mt-3 text-ink-foreground/75">Uma coleção completa de receitas para você preparar pizzas, massas, molhos, combinações especiais e muito mais.</p>
            <Link to="/membros/volumes" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110">
              Explorar receitas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid h-40 w-40 place-items-center rounded-full border border-gold/50 bg-ink/60 text-center backdrop-blur sm:h-48 sm:w-48">
            <div>
              <p className="font-display text-6xl font-bold text-gold sm:text-7xl">150</p>
              <p className="text-xs uppercase tracking-[0.3em]">Receitas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Seu progresso</h2>
            <p className="text-sm text-muted-foreground">
              Você já explorou <b className="text-foreground">{doneCount}</b> de {TOTAL_RECIPES} receitas.
            </p>
          </div>
          <p className="font-display text-4xl font-semibold text-basil">{pct}%</p>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-r from-basil to-gold transition-all duration-700" style={{ width: `${Math.max(pct, 1)}%` }} />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-3xl font-semibold sm:text-4xl">Os 7 volumes</h2>
          <Link to="/membros/volumes" className="text-sm font-semibold text-primary">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {volumes.map((v) => (
            <VolumeCard key={v.id} volume={v} />
          ))}
        </div>
        <div className="mt-6">
          <TotalBar />
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-3xl font-semibold sm:text-4xl">Continue explorando</h2>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {featured.map((r) => (
            <Link
              key={r.slug}
              to="/membros/receita/$slug"
              params={{ slug: r.slug }}
              className="group card-hover relative h-64 w-60 shrink-0 snap-start overflow-hidden rounded-3xl bg-ink shadow-soft sm:w-72"
            >
              <img src={r.image} alt={r.name} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-fade" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
                <p className="text-xs text-gold">Nº {String(r.number).padStart(3, "0")}</p>
                <p className="font-display text-2xl font-semibold leading-tight">{r.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Libere com a sua senha</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Seus produtos extras</h2>
            <p className="mt-1 text-sm text-muted-foreground">+{TOTAL_EXTRA_RECIPES} receitas: toque em um produto para liberar ou comprar com desconto.</p>
          </div>
          <Link to="/membros/produtos" className="shrink-0 text-sm font-semibold text-primary">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {extraVolumes.map((v) => (
            <VolumeCard key={v.id} volume={v} />
          ))}
        </div>
      </section>
    </div>
  );
}
