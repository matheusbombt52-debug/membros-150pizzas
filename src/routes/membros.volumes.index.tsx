import { createFileRoute } from "@tanstack/react-router";
import { volumes } from "@/data/recipes";
import { VolumeCard } from "@/components/VolumeCard";
import { TotalBar } from "@/components/TotalBar";

export const Route = createFileRoute("/membros/volumes/")({
  head: () => ({
    meta: [
      { title: "Os 7 volumes — 150 Receitas Italianas" },
      { name: "description", content: "Clássicas, artesanais, especiais, queijos, vegetarianas, doces e massas: 150 receitas em 7 volumes." },
      { property: "og:title", content: "Os 7 volumes — 150 Receitas Italianas" },
      { property: "og:description", content: "150 receitas organizadas em 7 volumes." },
    ],
  }),
  component: VolumesPage,
});

function VolumesPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">La collezione</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">150 Receitas em 7 volumes</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">Escolha um volume para ver todas as receitas.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {volumes.map((v) => (
          <VolumeCard key={v.id} volume={v} />
        ))}
      </div>
      <TotalBar />
    </div>
  );
}
