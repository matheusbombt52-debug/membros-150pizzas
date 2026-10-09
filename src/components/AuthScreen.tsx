import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import hero from "@/assets/hero-kitchen.jpg";
import { setUser } from "@/lib/store";

const input =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";

export function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && pass !== pass2) {
      toast.error("As senhas não coincidem.");
      return;
    }
    const fallback = email.split("@")[0] || "Cliente";
    setUser({ name: mode === "signup" ? name || fallback : fallback.charAt(0).toUpperCase() + fallback.slice(1), email: email || "cliente@email.com" });
    navigate({ to: "/membros" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img src={hero} alt="Cozinha italiana com forno a lenha" width={1280} height={1280} className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="relative flex h-full flex-col justify-end p-14 text-ink-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Ricette della nonna</p>
          <p className="mt-4 max-w-md font-display text-5xl leading-[1.05]">“A boa cozinha começa com o coração.”</p>
          <div className="mt-8 flex gap-8 text-sm text-ink-foreground/70">
            <span><b className="block font-display text-3xl text-ink-foreground">150</b>receitas</span>
            <span><b className="block font-display text-3xl text-ink-foreground">7</b>volumes</span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="tricolore absolute inset-x-0 top-0 h-1" />
        <div className="mx-auto w-full max-w-md page-enter">
          <div className="mb-8 text-center">
            <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-gradient-wine text-3xl shadow-lift">🍕</span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">150 RECEITAS ITALIANAS</h1>
            <p className="mt-2 font-display text-xl italic text-wine">Ricette della nonna · fatte in casa</p>
            <p className="mt-3 text-sm text-muted-foreground">Bem-vindo à sua área exclusiva de receitas italianas.</p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-full bg-secondary p-1">
            <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-card shadow-soft text-foreground" }} className="rounded-full py-2.5 text-center text-sm font-semibold text-muted-foreground transition">
              Entrar
            </Link>
            <Link to="/cadastro" activeProps={{ className: "bg-card shadow-soft text-foreground" }} className="rounded-full py-2.5 text-center text-sm font-semibold text-muted-foreground transition">
              Criar conta
            </Link>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Nome</span>
                <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required />
              </label>
            )}
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">E-mail</span>
              <input className={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" required />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">Senha</span>
              <input className={input} type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" required />
            </label>
            {mode === "signup" && (
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Confirmar senha</span>
                <input className={input} type="password" value={pass2} onChange={(e) => setPass2(e.target.value)} placeholder="••••••••" required />
              </label>
            )}
            {mode === "login" && (
              <div className="text-right">
                <button type="button" onClick={() => toast("Enviamos as instruções de recuperação para o seu e-mail.")} className="text-sm font-medium text-wine hover:underline">
                  Esqueci minha senha
                </button>
              </div>
            )}
            <button type="submit" className="h-14 w-full rounded-xl bg-gradient-wine text-base font-semibold text-primary-foreground shadow-lift transition hover:brightness-110 active:scale-[0.99]">
              {mode === "login" ? "Entrar na minha área" : "Criar minha conta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
