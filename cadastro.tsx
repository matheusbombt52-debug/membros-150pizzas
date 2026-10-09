import { createFileRoute } from "@tanstack/react-router";
import { AuthScreen } from "@/components/AuthScreen";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — 150 Receitas Italianas" },
      { name: "description", content: "Crie sua conta e acesse as 150 receitas italianas." },
      { property: "og:title", content: "Criar conta — 150 Receitas Italianas" },
      { property: "og:description", content: "Crie sua conta e acesse as 150 receitas italianas." },
    ],
  }),
  component: () => <AuthScreen mode="signup" />,
});
