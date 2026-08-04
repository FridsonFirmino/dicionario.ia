import { Menu, X } from 'lucide-react';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onLogoClick: () => void;
}

const links = [
  { label: "Sobre", to: "/sobre" },
  { label: "Extensão", to: "#" },
];

export function Navbar({ theme, onToggleTheme, onLogoClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-[#0a0a0b]/70 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Logo size="sm" onClick={onLogoClick} />

        <nav className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            >
              {link.label}
            </Link>
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
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-[#0a0a0b] px-4 py-3">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                {link.label}
              </Link>
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
