# Design System — Dicionário.ia

Base pronta a copiar para o projecto da **extensão**: tokens de cor (light/dark) e as duas estruturas de layout (sem pesquisa / com pesquisa).

**Como usar:** copia os blocos de código abaixo para a extensão. Os componentes JSX referenciados estão no repo em `src/components/` (ver [secção 5](#5-ficheiros-de-referência)).

---

## 1. Cores — Light & Dark

### 1.1 Estratégia

- Tema claro por omissão; tema escuro activado pela **classe `.dark`** em `<html>` (mesma estratégia do `useTheme` actual).
- Todos os componentes usam **tokens semânticos** (`bg-raised`, `text-ink-muted`…) — nunca classes `zinc-*` directas. Assim um único ficheiro controla os dois modos.
- Cores de superfície alinhadas com o `theme-color` do `index.html`: `#ffffff` (light) / `#0a0a0b` (dark).

### 1.2 Tokens CSS — copiar/colar

```css
/* tokens.css — Dicionário.ia */

:root {
  color-scheme: light;

  /* Superfícies */
  --surface: #ffffff;          /* página              (bg-white)            */
  --raised: #fafafa;           /* cartões             (bg-zinc-50)          */
  --sunken: #f4f4f5;           /* chips, ícones, kbd  (bg-zinc-100)         */
  --hover: #e4e4e7;            /* hover de chips      (hover:bg-zinc-200)   */

  /* Bordas */
  --line: rgb(228 228 231 / 0.5);   /* borda subtil    (border-zinc-200/50) */
  --line-strong: #d4d4d8;           /* inputs          (border-zinc-300)    */
  --line-focus: #a1a1aa;            /* foco            (focus:border-zinc-400) */

  /* Texto */
  --ink: #18181b;              /* títulos             (text-zinc-900)       */
  --ink-secondary: #3f3f46;    /* ênfase, resposta    (text-zinc-700)       */
  --ink-body: #52525b;         /* parágrafos          (text-zinc-600)       */
  --ink-muted: #71717a;        /* descrições, labels  (text-zinc-500)       */
  --ink-faint: #a1a1aa;        /* títulos de secção, ícones, placeholder
                                  (text-zinc-400)                           */

  /* Acento & estados */
  --accent: #059669;           /* emerald-600         (text-emerald-600)    */
  --accent-solid: #10b981;     /* emerald-500         (bg-emerald-500)      */
  --accent-soft: rgb(16 185 129 / 0.1);   /* fundo de badge                */
  --warning: #d97706;          /* amber-600           (text-amber-600)      */
  --danger: #dc2626;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.08);
  --shadow-focus: 0 4px 16px rgb(24 24 27 / 0.05);
}

.dark {
  color-scheme: dark;

  /* Superfícies */
  --surface: #0a0a0b;          /* página              (bg-[#0a0a0b])        */
  --raised: #111113;           /* cartões             (bg-zinc-900/50)      */
  --sunken: #18181b;           /* inputs, ícones      (bg-zinc-900)         */
  --hover: #27272a;            /* hover de chips      (hover:bg-zinc-800)   */

  /* Bordas */
  --line: rgb(39 39 42 / 0.5);              /* (border-zinc-800/50)        */
  --line-strong: #3f3f46;                   /* (border-zinc-700)           */
  --line-focus: #52525b;                    /* (focus:border-zinc-600)     */

  /* Texto */
  --ink: #f4f4f5;              /* (text-zinc-100)                             */
  --ink-secondary: #d4d4d8;    /* (text-zinc-300)                             */
  --ink-body: #a1a1aa;         /* (text-zinc-400)                             */
  --ink-muted: #a1a1aa;        /* (text-zinc-400)                             */
  --ink-faint: #71717a;        /* (text-zinc-500)                             */

  /* Acento & estados */
  --accent: #34d399;           /* emerald-400        (text-emerald-400)      */
  --accent-solid: #10b981;     /* emerald-500                                 */
  --accent-soft: rgb(16 185 129 / 0.1);
  --warning: #f59e0b;          /* amber-500          (text-emerald-500)      */
  --danger: #f87171;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
  --shadow-focus: 0 4px 16px rgb(0 0 0 / 0.6);
}
```

### 1.3 Registo no Tailwind v4

No `index.css` da extensão (uma única vez):

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --font-sans: system-ui, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, Consolas, "JetBrains Mono", monospace;

  --color-surface: var(--surface);
  --color-raised: var(--raised);
  --color-sunken: var(--sunken);
  --color-hover: var(--hover);

  --color-line: var(--line);
  --color-line-strong: var(--line-strong);
  --color-line-focus: var(--line-focus);

  --color-ink: var(--ink);
  --color-ink-secondary: var(--ink-secondary);
  --color-ink-body: var(--ink-body);
  --color-ink-muted: var(--ink-muted);
  --color-ink-faint: var(--ink-faint);

  --color-accent: var(--accent);
  --color-accent-solid: var(--accent-solid);
  --color-accent-soft: var(--accent-soft);
  --color-warning: var(--warning);
  --color-danger: var(--danger);
}

/* @theme inline → utilities geradas:
   bg-surface bg-raised bg-sunken bg-hover bg-accent-soft bg-accent-solid
   border-line border-line-strong border-line-focus
   text-ink text-ink-secondary text-ink-body text-ink-muted text-ink-faint
   text-accent text-warning text-danger
   shadow-sm shadow-md                                    */

@import "./tokens.css";
```

### 1.4 Alternar o tema (hook copiável)

```ts
// useTheme.ts
import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("dicionario-theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("dicionario-theme", theme);
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggle };
}
```

> **Extensão:** para evitar flash de tema no popup/side panel, aplica antes do primeiro paint, no `<head>` do HTML:
>
> ```html
> <script>
>   (() => {
>     const t = localStorage.getItem("dicionario-theme");
>     const dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
>     document.documentElement.classList.toggle("dark", dark);
>   })();
> </script>
> ```

### 1.5 Mapeamento — classes actuais → tokens

| Classes actuais (light / dark) | Token |
|---|---|
| `bg-white` / `bg-[#0a0a0b]` | `bg-surface` |
| `bg-zinc-50` / `bg-zinc-900/50` | `bg-raised` |
| `bg-zinc-100` / `bg-zinc-900`, `bg-zinc-800` | `bg-sunken` |
| `hover:bg-zinc-200` / `hover:bg-zinc-800` | `hover:bg-hover` |
| `border-zinc-200/50` / `border-zinc-800/50` | `border-line` |
| `border-zinc-300` / `border-zinc-700` | `border-line-strong` |
| `focus:border-zinc-400` / `focus:border-zinc-600` | `focus:border-line-focus` |
| `text-zinc-900` / `text-zinc-100` | `text-ink` |
| `text-zinc-800` / `text-zinc-200` | `text-ink` (inputs, código) |
| `text-zinc-700` / `text-zinc-300` | `text-ink-secondary` |
| `text-zinc-600` / `text-zinc-400` | `text-ink-body` |
| `text-zinc-500` / `text-zinc-400` | `text-ink-muted` |
| `text-zinc-400` / `text-zinc-500` | `text-ink-faint` |
| `placeholder-zinc-400` / `placeholder-zinc-500` | `placeholder-ink-faint` |
| `text-emerald-600` / `text-emerald-400` | `text-accent` |
| `bg-emerald-500` | `bg-accent-solid` |
| `bg-emerald-500/10` | `bg-accent-soft` |
| `text-amber-600` / `text-amber-500` | `text-warning` |
| `shadow-sm` `shadow-md` / `shadow-black/20` | `shadow-sm` `shadow-md` |

### 1.6 Regras de uso

1. **Página** sempre `bg-surface`; cartões e blocos de destaque `bg-raised` + `border-line` + `rounded-xl`.
2. **Nunca** `text-ink-faint` para conteúdo principal — só títulos de secção em maiúsculas, ícones decorativos, placeholder e kbd (contraste < 4.5:1).
3. Texto corrido → `text-ink-body`; ênfase dentro de texto → `text-ink-secondary`; títulos → `text-ink`.
4. **Opacidade `/50`** só em bordas subtis dentro de cartões (`border-line`), nunca em texto.
5. Estados: positivo/acto → `accent`; caution → `warning`; erro → `danger`. O fundo do badge é sempre `bg-accent-soft` (ou `color-mix` da cor a 10%).
6. Foco visível: `focus-visible:ring-2 ring-line-focus` em todos os botões e inputs.

---

## 2. Layout — sem pesquisa (estado *idle*)

### 2.1 Árvore

```
<div class="flex flex-col items-center justify-center
            min-h-[calc(100vh-3.5rem)] px-4">          ← viewport inteira
  └─ <div class="w-full max-w-3xl mx-auto px-4 sm:px-6
                 flex flex-col items-center gap-8 mb-8 -mt-20">
       ├─ 1. Logo            size="lg"  → text-5xl md:text-6xl font-semibold
       │                        ".ia"    → text-ink-faint
       ├─ 2. Tagline         text-base md:text-lg text-ink-muted text-center
       │                        destaque → text-ink-secondary font-medium
       ├─ 3. SearchBar       size="large" (h-12 md:h-14)
       ├─ 4. Badge de área   rounded-full bg-accent-soft text-accent
       │                        text-xs font-medium px-3 py-1.5 + ícone 14
       └─ 5. SearchExamples  label: text-ink-faint text-xs uppercase tracking-wider
                              chips: bg-sunken hover:bg-hover text-ink-muted
                                     hover:text-ink rounded-full px-3 py-1.5 text-sm
```

### 2.2 Componente copiável

```tsx
// IdleLayout.tsx
import { Target } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { SearchExamples } from "./SearchExamples";
import { Logo } from "./Logo";

interface IdleLayoutProps {
  area: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export function IdleLayout({
  area,
  query,
  onQueryChange,
  onSearch,
}: IdleLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8 gap-8 -mt-20">
        <Logo size="lg" />

        <p className="text-base md:text-lg text-ink-muted text-center leading-relaxed">
          Pesquise qualquer termo ou expressão técnica e entenda{" "}
          <span className="text-ink-secondary font-medium">
            pelo contexto certo
          </span>
        </p>

        <div className="w-full">
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearch}
            size="large"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-medium">
          <Target size={14} />
          Área de conhecimento atual: {area}
        </div>

        <SearchExamples onSelect={onSearch} />
      </div>
    </div>
  );
}
```

### 2.3 Adaptação à extensão

| Superfície | Ajuste |
|---|---|
| **Popup** (360–400px) | Remove `min-h-[calc(100vh-3.5rem)]` e `-mt-20`; usa `py-6 gap-6`. Os `sm:` não disparam (< 640px): o kbd `⌘K` fica oculto automaticamente. |
| **Side panel** (≥ 400px) | Mantém a árvore; `max-w-3xl` continua a centrar o conteúdo. |
| Ambos | `SearchBar` sempre `size="large"` com `autoFocus`; ⌘/Ctrl+K foca o input. |

---

## 3. Layout — com pesquisa

### 3.1 Árvore

```
<main>
  └─ <div class="pt-6 pb-8">
       ├─ SearchBar wrapper → w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8
       │    (size="default" h-12 · onClear → reset · loading → spinner)
       │
       └─ conteúdo conforme <status>:
            ├─ searching   → LoadingSkeleton
            ├─ results     → InstantAnswer
            ├─ no-results  → NoResults
            └─ error       → ErrorState
```

### 3.2 Estados

| `status` | Componente | Estrutura visual |
|---|---|---|
| `searching` | `LoadingSkeleton` | `max-w-3xl mx-auto px-4 space-y-6` — skeletons `h-10 w-64`, tags `h-5 rounded-full`, parágrafos `h-4`, bloco `h-32 rounded-lg`; todos `bg-hover animate-pulse rounded-md` |
| `results` | `InstantAnswer` | `max-w-3xl mx-auto px-4 sm:px-6 pb-16` — ver 3.3 |
| `no-results` | `NoResults` | centrado `py-16 px-4`; ícone 24 dentro de círculo `w-12 h-12 bg-sunken`; `h2 text-lg text-ink-secondary`; `p text-ink-faint max-w-sm` |
| `error` | `ErrorState` | igual a no-results (`AlertCircle`) + botão `Tentar novamente`: `px-4 py-2 text-sm text-ink-secondary bg-sunken hover:bg-hover rounded-lg` |

**Ordem das secções em `results`:**

```
InstantAnswer
├─ metadados      text-xs text-ink-faint · ponto w-1.5 h-1.5 bg-accent-solid
│                   ("Conteúdo gerado por IA" + área de conhecimento)
├─ TermHeader     h1 text-3xl md:text-4xl font-bold text-ink + Tags (category)
├─ QuickAnswer    bg-raised border-line rounded-xl p-4 -mx-4
│                   label: text-xs uppercase text-ink-faint
│                   texto: text-base md:text-lg text-ink-secondary
├─ ConceptSection h2: text-sm uppercase text-ink-faint · p: text-ink-body
├─ ExampleSection → CodeBlock (bg-raised border-line, header bg-sunken,
│                   código font-mono text-ink) + descrição text-ink-muted
├─ WhenToUse      grid sm:grid-cols-2 gap-4 · cartões bg-raised border-line
│                   "Usar" → text-accent · "Evitar" → text-warning
│                   bullets → text-ink-body / marcador text-ink-faint(dark: line-strong)
├─ CommonMistakes cartões bg-raised border-line · erro: text-ink-secondary
│                   + correção: text-ink-muted
└─ RelatedTerms   chips bg-sunken hover:bg-hover text-ink-secondary rounded-full
```

### 3.3 Componente copiável

```tsx
// SearchLayout.tsx
import { SearchBar } from "./SearchBar";
import { InstantAnswer } from "./results";
import { ErrorState } from "./results/ErrorState";
import { NoResults } from "./results/NoResults";
import { LoadingSkeleton } from "./ui/Skeleton";
import type { SearchStatus, TermData } from "./types";

interface SearchLayoutProps {
  status: SearchStatus;
  query: string;
  result: TermData | null;
  searchedTerm: string;
  source: "mock" | "groq";
  area: string;
  onQueryChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear: () => void;
  onRetry: () => void;
}

export function SearchLayout({
  status,
  query,
  result,
  searchedTerm,
  source,
  area,
  onQueryChange,
  onSubmit,
  onClear,
  onRetry,
}: SearchLayoutProps) {
  return (
    <div className="pt-6 pb-8">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          onSubmit={onSubmit}
          onClear={onClear}
          loading={status === "searching"}
        />
      </div>

      {status === "searching" && <LoadingSkeleton />}

      {status === "results" && result && (
        <InstantAnswer
          data={result}
          onSearch={onSubmit}
          source={source}
          contextArea={area}
        />
      )}

      {status === "no-results" && <NoResults term={searchedTerm} />}

      {status === "error" && <ErrorState onRetry={onRetry} />}
    </div>
  );
}
```

### 3.4 Orquestração dos dois layouts

```tsx
// App/Popup — alterna os dois estados
const { status, /* … */ } = useSearch(area, language);

return status === "idle"
  ? <IdleLayout area={area} query={query}
      onQueryChange={setQuery} onSearch={search} />
  : <SearchLayout status={status} query={query} result={result}
      searchedTerm={searchedTerm} source={source} area={area}
      onQueryChange={setQuery} onSubmit={search} onClear={reset}
      onRetry={retry} />;
```

### 3.5 Larguras e responsivo

| Elemento | Classe | Notas |
|---|---|---|
| Coluna de conteúdo | `w-full max-w-3xl mx-auto px-4 sm:px-6` | mesma medida nas 2 estruturas — evita saltos ao pesquisar |
| SearchBar wrapper | `mb-8` no modo pesquisa; dentro do fluxo (`gap-8`) no idle | |
| Secções de resultado | `mb-10` entre secções; última sem margem (`RelatedTerms`) | |
| Grelha WhenToUse | `grid-cols-1 sm:grid-cols-2 gap-4` | empilha em popups estreitos |
| Resultado total | `pb-16` | espaço para o botão flutuante de Definições |

---

## 4. SearchBar (tokenizada — copiar)

```tsx
// SearchBar.tsx
import { LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  size?: "default" | "large";
}

export function SearchBar({
  value, onChange, onSubmit, onClear, loading = false, size = "default",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown as unknown as EventListener);
    return () =>
      document.removeEventListener("keydown", handleKeyDown as unknown as EventListener);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
    onClear?.();
  };

  const height = size === "large" ? "h-12 md:h-14" : "h-12";
  const textSize = size === "large" ? "text-base" : "text-sm md:text-base";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center justify-center mb-1">
        <span className="text-center text-[13px] text-ink-faint">
          O Dicionario.IA pode conter imprecisões. Confirme informações
          importantes em outras fontes.
        </span>
      </div>
      <div
        className={`relative flex items-center ${height} w-full rounded-xl border
          border-line-strong bg-raised shadow-sm transition-all duration-200
          focus-within:border-line-focus focus-within:shadow-md focus-within:shadow-focus`}
      >
        <span className="pl-4 pr-2 text-ink-faint shrink-0">
          <Search size={20} />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pesquise uma palavra ou conceito..."
          className={`flex-1 bg-transparent border-none outline-none ${textSize}
            text-ink placeholder-ink-faint px-2 min-w-0`}
          autoComplete="off"
          autoFocus={size === "large"}
        />

        {loading && (
          <span className="pr-2">
            <LoaderCircle size={20} className="animate-spin text-ink-faint" />
          </span>
        )}

        <div className="flex items-center gap-1 pr-3 shrink-0 w-[72px] justify-end">
          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-ink-faint hover:text-ink-secondary transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs
            text-ink-faint bg-sunken rounded-md font-mono">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>
      </div>
    </form>
  );
}
```

---

## 5. Ficheiros de referência

| Assunto | Caminho |
|---|---|
| Tokens / base CSS | `src/index.css` · `index.html` (`theme-color`) |
| Tema | `src/hooks/useTheme.ts` · `src/components/ui/ThemeToggle.tsx` |
| Estado idle | `src/components/landing/LandingHero.tsx` · `src/components/search/SearchExamples.tsx` |
| Estado pesquisa | `src/pages/Home.tsx` · `src/hooks/useSearch.ts` |
| SearchBar | `src/components/search/SearchBar.tsx` |
| Resultados | `src/components/results/` (`index.tsx`, `TermHeader`, `QuickAnswer`, `ConceptSection`, `ExampleSection`, `WhenToUse`, `CommonMistakes`, `RelatedTerms`, `NoResults`, `ErrorState`) |
| Skeleton / UI | `src/components/ui/` (`Skeleton`, `Tag`, `Logo`, `CodeBlock`) |
| Tipos (`SearchStatus`, `TermData`) | `src/types/index.ts` |
