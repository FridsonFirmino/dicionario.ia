# Dicionário.ia

Dicionário conceitual inteligente com respostas instantâneas. Pesquise qualquer palavra, termo ou conceito e entenda em segundos.

## Stack

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS v4
- Lucide React

## Scripts

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # compila para produção
pnpm preview    # preview da build
pnpm lint       # eslint
```

## Estrutura

```
src/
├── components/
│   ├── ui/            # Tag, Skeleton, Logo, ThemeToggle, CodeBlock
│   ├── layout/        # Container, Navbar
│   ├── search/        # SearchBar, SearchExamples
│   ├── landing/       # LandingHero
│   ├── results/       # InstantAnswer, TermHeader, QuickAnswer, etc.
│   └── settings/      # SettingsPanel
├── hooks/             # useSearch, useTheme
├── types/             # TermData, SearchStatus
├── data/              # mockData
├── App.tsx
├── index.css
└── main.tsx
```

## SEO

- Meta tags Open Graph e Twitter Cards
- JSON-LD com SearchAction (schema.org)
- Robots.txt e Sitemap
- Dark/light mode com theme-color
