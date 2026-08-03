import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import {
  knowledgeAreas,
  type KnowledgeArea,
} from '../../hooks/useSettings';

const languages = ['Português (BR)', 'English', 'Español'];

interface SettingsPanelProps {
  language: string;
  area: KnowledgeArea;
  onLanguageChange: (language: string) => void;
  onAreaChange: (area: KnowledgeArea) => void;
}

export function SettingsPanel({
  language,
  area,
  onLanguageChange,
  onAreaChange,
}: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Configurações"
        className="fixed bottom-5 right-5 z-40 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all duration-200"
      >
        <Settings size={20} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="fixed bottom-16 right-5 z-50 w-72 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Configurações
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Idioma
                </label>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 transition-colors"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Área de conhecimento
                </label>
                <select
                  value={area}
                  onChange={(e) => onAreaChange(e.target.value as KnowledgeArea)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 transition-colors"
                >
                  {knowledgeAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
