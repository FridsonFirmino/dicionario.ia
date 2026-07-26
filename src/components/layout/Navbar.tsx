import { useState } from "react";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onLogoClick: () => void;
}

const links = [
  { label: "Sobre", href: "#" },
  { label: "Extensão", href: "#" },
];

export function Navbar({ theme, onToggleTheme, onLogoClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-[#0a0a0b]/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Logo size="sm" onClick={onLogoClick} />

        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-1">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          className="sm:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-[#0a0a0b] px-4 py-3">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="text-sm text-zinc-400">Tema</span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
