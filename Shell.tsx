import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Home, BookOpen, Sparkles, Search, Heart, User, LogOut, Menu, X } from "lucide-react";
import { volumes } from "@/data/recipes";
import { setUser, useUser } from "@/lib/store";

const linkBase =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-foreground/70 transition-colors hover:bg-ink-foreground/5 hover:text-ink-foreground";
const linkActive = { className: "bg-ink-foreground/10 !text-ink-foreground" };

function Brand() {
  return (
    <Link to="/membros" className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-wine text-lg shadow-soft">🍕</span>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-xl font-semibold text-ink-foreground">150 Receitas</span>
        <span className="block text-[11px] uppercase tracking-[0.2em] text-gold">Italianas</span>
      </span>
    </Link>
  );
}

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" onClick={onNavigate}>
      <Link to="/membros" activeOptions={{ exact: true }} activeProps={linkActive} className={linkBase}>
        <Home className="h-4 w-4" /> Início
      </Link>
      <Link to="/membros/volumes" activeOptions={{ exact: true }} activeProps={linkActive} className={linkBase}>
        <BookOpen className="h-4 w-4" /> 150 Receitas
      </Link>
      <div className="mb-2 ml-5 flex flex-col border-l border-ink-foreground/10 pl-3">
        {volumes.map((v) => (
          <Link
            key={v.id}
            to="/membros/volumes/$volumeId"
            params={{ volumeId: v.id }}
            activeProps={{ className: "!text-gold" }}
            className="truncate py-1.5 text-[13px] text-ink-foreground/55 transition-colors hover:text-ink-foreground"
          >
            {v.title}
          </Link>
        ))}
      </div>
      <Link to="/membros/produtos" activeProps={linkActive} className={linkBase}>
        <Sparkles className="h-4 w-4" /> Meus Produtos
      </Link>
      <Link to="/membros/busca" activeProps={linkActive} className={linkBase}>
        <Search className="h-4 w-4" /> Buscar receitas
      </Link>
      <Link to="/membros/favoritos" activeProps={linkActive} className={linkBase}>
        <Heart className="h-4 w-4" /> Favoritos
      </Link>
      <Link to="/membros/perfil" activeProps={linkActive} className={linkBase}>
        <User className="h-4 w-4" /> Meu Perfil
      </Link>
      <button
        onClick={() => {
          setUser(null);
          navigate({ to: "/" });
        }}
        className={`${linkBase} mt-auto`}
      >
        <LogOut className="h-4 w-4" /> Sair
      </button>
    </nav>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const initial = (user?.name || "C").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col gap-8 bg-gradient-ink p-6 lg:flex">
        <div className="tricolore absolute inset-x-0 top-0 h-1" />
        <Brand />
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-gradient-ink px-4 py-3 lg:hidden">
        <Brand />
        <button aria-label="Abrir menu" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-ink-foreground/10 text-ink-foreground">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-in fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col gap-6 bg-gradient-ink p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between">
              <Brand />
              <button aria-label="Fechar menu" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-ink-foreground/10 text-ink-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-72">
        <div className="hidden items-center justify-end gap-3 px-10 pt-6 lg:flex">
          <Link to="/membros/perfil" className="flex items-center gap-3 rounded-full bg-card py-1.5 pl-1.5 pr-4 shadow-soft">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-basil text-sm font-semibold text-basil-foreground">{initial}</span>
            <span className="text-sm font-medium">{user?.name || "Cliente"}</span>
          </Link>
        </div>
        <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl bg-ink/95 p-1.5 shadow-lift backdrop-blur lg:hidden">
        {[
          { to: "/membros", icon: Home, label: "Início", exact: true },
          { to: "/membros/volumes", icon: BookOpen, label: "Receitas" },
          { to: "/membros/busca", icon: Search, label: "Buscar" },
          { to: "/membros/favoritos", icon: Heart, label: "Favoritos" },
          { to: "/membros/produtos", icon: Sparkles, label: "Extras" },
        ].map(({ to, icon: Icon, label, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: !!exact }}
            activeProps={{ className: "!text-gold bg-ink-foreground/10" }}
            className="flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-medium text-ink-foreground/60"
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
