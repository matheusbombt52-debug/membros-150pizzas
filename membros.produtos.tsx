import { createFileRoute } from "@tanstack/react-router";
import { extraVolumes, TOTAL_EXTRA_RECIPES } from "@/data/recipes";
import { VolumeCard } from "@/components/VolumeCard";

export const Route = createFileRoute("/membros/produtos")({
  head: () => ({
    meta: [
      { title: "Meus produtos — 150 Receitas Italianas" },
      { name: "description", content: "Seus produtos extras: lasanhas, sobremesas, entradas e massas italianas." },
      { property: "og:title", content: "Meus produtos — 150 Receitas Italianas" },
      { property: "og:description", content: "Lasanhas, sobremesas, entradas e massas italianas já liberadas para você." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Seus extras</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">Meus produtos</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Toque em um produto, digite a senha que foi enviada para o seu e-mail e libere as receitas na hora. Ainda não tem algum deles? Aproveite o desconto para comprar agora.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {extraVolumes.map((v) => (
          <VolumeCard key={v.id} volume={v} />
        ))}
      </div>
      <div className="rounded-3xl border border-gold/30 bg-card p-6 shadow-soft sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Seus produtos extras</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-display text-2xl sm:text-3xl">
          {extraVolumes.map((v) => (
            <span key={v.id} className="flex items-baseline gap-3">
              <span className="flex flex-col items-center">
                <span className="font-semibold">+{v.names.length}</span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">{v.short}</span>
              </span>
              <span className="text-muted-foreground">+</span>
            </span>
          ))}
          <span className="flex flex-col items-center">
            <span className="text-4xl font-bold text-primary sm:text-5xl">{TOTAL_EXTRA_RECIPES}</span>
            <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">receitas extras</span>
          </span>
        </div>
      </div>
    </div>
  );
}
