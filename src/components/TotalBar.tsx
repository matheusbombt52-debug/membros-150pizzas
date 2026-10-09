import { Link } from "@tanstack/react-router";
import { TOTAL_RECIPES, volumes } from "@/data/recipes";

export function TotalBar() {
  return (
    <div className="rounded-3xl border border-gold/30 bg-card p-6 shadow-soft sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Sua coleção</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-display text-2xl sm:text-3xl">
        {volumes.map((v, i) => (
          <span key={v.id} className="flex items-baseline gap-3">
            <Link to="/membros/volumes/$volumeId" params={{ volumeId: v.id }} className="group flex flex-col items-center">
              <span className="font-semibold transition-colors group-hover:text-primary">{v.names.length}</span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">Vol. {v.numeral}</span>
            </Link>
            <span className="text-muted-foreground">{i < volumes.length - 1 ? "+" : "="}</span>
          </span>
        ))}
        <span className="flex flex-col items-center">
          <span className="text-4xl font-bold text-primary sm:text-5xl">{TOTAL_RECIPES}</span>
          <span className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">receitas</span>
        </span>
      </div>
    </div>
  );
}

