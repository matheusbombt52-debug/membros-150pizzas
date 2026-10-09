import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getVolume, recipesOf, volumeLabel } from "@/data/recipes";
import { UnlockCard } from "@/components/UnlockCard";
import { RecipeCard } from "@/components/RecipeCard";
import { useExplored, useUnlocked } from "@/lib/store";

export const Route = createFileRoute("/membros/volumes/$volumeId")({
  loader: ({ params }) => {
    const volume = getVolume(params.volumeId);
    if (!volume) throw notFound();
    return { volumeId: volume.id };
  },
  head: ({ loaderData }) => {
    const v = loaderData ? getVolume(loaderData.volumeId) : undefined;
    const title = v ? `${volumeLabel(v)} — ${v.title} | 150 Receitas Italianas` : "Volume não encontrado";
    const desc = v ? `${v.names.length} receitas: ${v.description}` : "Volume não encontrado.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center">
      <h1 className="text-3xl">Volume não encontrado</h1>
      <Link to="/membros/volumes" className="mt-4 inline-block font-semibold text-primary">← Ver volumes</Link>
    </div>
  ),
  component: VolumePage,
});

function VolumePage() {
  const { volumeId } = Route.useLoaderData();
  const volume = getVolume(volumeId)!;
  const list = recipesOf(volumeId);
  const explored = useExplored();
  const unlocked = useUnlocked();
  const done = list.filter((r) => explored.includes(r.slug)).length;

  if (volume.extra && !unlocked.includes(volume.id)) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <Link to="/membros/produtos" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Meus produtos</Link>
        <div className="rounded-3xl border border-border bg-background p-5 shadow-soft sm:p-6">
          <UnlockCard volume={volume} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {volume.extra ? (
        <Link to="/membros/produtos" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Meus produtos</Link>
      ) : (
        <Link to="/membros/volumes" className="text-sm font-semibold text-muted-foreground hover:text-foreground">← Todos os volumes</Link>
      )}
      <header className="relative overflow-hidden rounded-3xl bg-ink text-ink-foreground shadow-lift">
        <img src={volume.extra ? list[0]!.image : volume.cover} alt={volume.title} width={1024} height={768} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="relative px-6 pb-8 pt-28 sm:px-10 sm:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{volume.emoji} {volumeLabel(volume)}</p>
          <h1 className="mt-2 text-4xl font-semibold sm:text-6xl">{volume.title}</h1>
          <p className="mt-2 max-w-xl text-ink-foreground/80">{volume.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-ink-foreground/15 px-4 py-1.5 backdrop-blur">{list.length} receitas</span>
            <span className="rounded-full bg-basil px-4 py-1.5">{done} exploradas</span>
          </div>
        </div>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </div>
  );
}
