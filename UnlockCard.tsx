import { useState } from "react";
import { toast } from "sonner";
import { KeyRound, Lock, ShoppingCart } from "lucide-react";
import type { Volume } from "@/data/recipes";
import { brl, checkPassword, discountPct, offers } from "@/data/offers";
import { unlockProduct } from "@/lib/store";

export function UnlockCard({ volume, onUnlocked }: { volume: Volume; onUnlocked?: () => void }) {
  const offer = offers[volume.id]!;
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (checkPassword(volume.id, pass)) {
      unlockProduct(volume.id);
      toast.success(`${volume.title} liberado! Bom apetite 🍽️`);
      onUnlocked?.();
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <img src={volume.cover} alt={volume.title} className="h-16 w-16 shrink-0 rounded-xl object-cover shadow-soft" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Lock className="h-3 w-3" /> Produto bloqueado
          </p>
          <h3 className="font-display text-2xl font-semibold leading-tight">{volume.title}</h3>
          <p className="text-sm text-muted-foreground">+{volume.names.length} receitas</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <p className="flex items-center gap-2 font-semibold"><KeyRound className="h-4 w-4 text-primary" /> Já comprou? Coloque sua senha para liberar</p>
        <p className="text-sm text-muted-foreground">
          A senha foi enviada para o <b>e-mail que você usou na compra</b> deste produto. Procure na caixa de entrada (e também em spam ou promoções) por uma mensagem com o assunto da sua compra.
        </p>
        <input
          value={pass}
          onChange={(e) => { setPass(e.target.value); setError(false); }}
          inputMode="numeric"
          autoComplete="off"
          placeholder="Digite a senha"
          aria-invalid={error}
          className="h-12 w-full rounded-xl border border-input bg-background px-4 text-center text-lg tracking-[0.3em] outline-none transition focus:border-primary"
        />
        {error && <p className="text-sm font-medium text-destructive">Senha incorreta. Confira o e-mail da compra e tente de novo.</p>}
        <button type="submit" disabled={!pass.trim()} className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
          Liberar acesso
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3 rounded-2xl border border-gold/40 bg-gold/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">Ainda não tem? Compre agora com desconto</p>
          <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">-{discountPct(offer)}%</span>
        </div>
        <p className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">de <s>{brl(offer.from)}</s> por</span>
          <span className="font-display text-4xl font-bold text-primary">{brl(offer.to)}</span>
        </p>
        <a href={offer.buyUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-basil font-semibold text-white transition hover:opacity-90">
          <ShoppingCart className="h-4 w-4" /> Comprar agora
        </a>
      </div>
    </div>
  );
}
