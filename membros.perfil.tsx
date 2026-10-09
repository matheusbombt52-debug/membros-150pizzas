import { createFileRoute, Link } from "@tanstack/react-router";
import { TOTAL_EXTRA_RECIPES, TOTAL_RECIPES } from "@/data/recipes";
import { useExplored, useFavorites, useUser } from "@/lib/store";

export const Route = createFileRoute("/membros/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — 150 Receitas Italianas" },
      { name: "description", content: "Sua conta e sua coleção de receitas italianas." },
      { property: "og:title", content: "Meu perfil — 150 Receitas Italianas" },
      { property: "og:description", content: "Sua conta e sua coleção de receitas italianas." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useUser();
  const favs = useFavorites();
  const seen = useExplored();
  const name = user?.name || "Cliente";
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-ink p-8 text-ink-foreground shadow-lift">
        <div className="tricolore absolute inset-x-0 top-0 h-1" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Minha conta</p>
        <div className="mt-5 flex items-center gap-5">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-wine font-display text-4xl font-semibold">{name.charAt(0).toUpperCase()}</span>
          <div className="min-w-0">
            <h1 className="truncate text-4xl font-semibold">{name}</h1>
            <p className="truncate text-ink-foreground/70">{user?.email || "cliente@email.com"}</p>
            <span className="mt-2 inline-block rounded-full border border-gold/50 px-3 py-0.5 text-xs text-gold">Membro Premium</span>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-card p-6 shadow-soft sm:p-8">
        <h2 className="text-3xl font-semibold">Minha coleção</h2>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { n: TOTAL_RECIPES + TOTAL_EXTRA_RECIPES, l: "receitas disponíveis" },
            { n: seen.length, l: "exploradas" },
            { n: favs.length, l: "favoritas" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-secondary p-4">
              <p className="font-display text-4xl font-semibold text-primary">{s.n}</p>
              <p className="text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <Link to="/membros" className="flex h-14 items-center justify-center rounded-2xl bg-gradient-wine font-semibold text-primary-foreground shadow-lift">
        Voltar para a área de receitas
      </Link>
    </div>
  );
}
