import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { volumeLabel, type Volume } from "@/data/recipes";
import { useUnlocked } from "@/lib/store";
import { UnlockCard } from "@/components/UnlockCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const cardClass =
  "group card-hover relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-3xl bg-ink text-left shadow-soft sm:aspect-[3/4]";

export function VolumeCard({ volume }: { volume: Volume }) {
  const unlocked = useUnlocked();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const locked = !!volume.extra && !unlocked.includes(volume.id);

  const content = (
    <>
      <img src={volume.cover} alt={volume.title} loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={volume.extra ? "absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" : "absolute inset-0 bg-gradient-fade"} />
      {locked && (
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold text-gold backdrop-blur">
          <Lock className="h-3 w-3" /> Bloqueado
        </span>
      )}
      <div className="relative p-5 text-ink-foreground">
        {volume.extra && <h3 className="sr-only">{volume.title}</h3>}
        {!volume.extra && (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {volume.emoji} {volumeLabel(volume)}
            </p>
            <h3 className="mt-1 text-2xl font-semibold leading-tight sm:text-3xl">{volume.title}</h3>
            <p className="mt-1 text-sm text-ink-foreground/70">{volume.names.length} receitas</p>
          </>
        )}
        <span className={`inline-flex rounded-full bg-ink-foreground px-4 py-2 text-xs font-semibold text-ink transition-colors group-hover:bg-gold ${volume.extra ? "" : "mt-4"}`}>
          {locked ? "Liberar acesso" : "Ver receitas"}
        </span>
      </div>
    </>
  );

  if (!locked) {
    return (
      <Link to="/membros/volumes/$volumeId" params={{ volumeId: volume.id }} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cardClass}>
        {content}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Liberar {volume.title}</DialogTitle>
            <DialogDescription>Digite a senha enviada por e-mail ou compre o produto com desconto.</DialogDescription>
          </DialogHeader>
          <UnlockCard
            volume={volume}
            onUnlocked={() => {
              setOpen(false);
              navigate({ to: "/membros/volumes/$volumeId", params: { volumeId: volume.id } });
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
