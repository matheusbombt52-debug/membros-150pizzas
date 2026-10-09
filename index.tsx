import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/components/AuthScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar — 150 Receitas Italianas" },
      { name: "description", content: "Acesse sua área exclusiva com 150 receitas italianas, 7 volumes." },
      { property: "og:title", content: "Entrar — 150 Receitas Italianas" },
      { property: "og:description", content: "Acesse sua área exclusiva com 150 receitas italianas, 7 volumes." },
    ],
  }),
  component: () => <AuthScreen mode="login" />,
});
