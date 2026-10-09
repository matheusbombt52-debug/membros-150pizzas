# 150 Receitas Italianas — Área de Membros

Área de membros com 150 receitas de pizza e 4 produtos extras (lasanhas, sobremesas, entradas e massas), liberados por senha.

## Rodar no computador

```bash
bun install
bun run dev
```

## Onde mexer

- `src/data/recipes.ts` — as 150 receitas de pizza e os volumes
- `src/data/extras.ts` — as 163 receitas dos produtos extras
- `src/data/offers.ts` — preços, descontos, senhas e links de compra dos extras
- `src/assets/` — fotos e capas (para trocar uma imagem, substitua o arquivo mantendo o nome)
- `src/routes/` — as telas do site

## Deploy

O `netlify.toml` já está configurado: conecte o repositório ao Netlify e faça o deploy.
