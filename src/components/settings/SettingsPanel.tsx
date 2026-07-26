import { useState } from 'react';

const languages = ['Português (BR)', 'English', 'Español'];
const knowledgeAreas = ['Geral', 'Tecnologia', 'Ciências', 'Humanas', 'Economia'];

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('Português (BR)');
  const [area, setArea] = useState('Geral');

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Configurações"
        className="fixed bottom-5 right-5 z-40 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          <path fillRule="evenodd" d="M10 1.5a.75.75 0 01.75.75v1.28a.75.75 0 01-.531.72 7.5 7.5 0 00-1.438.416.75.75 0 01-.916-.33L8.04 3.23a.75.75 0 011.018-.962A8.97 8.97 0 0110 1.5zM3.343 4.657a.75.75 0 010 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707a.75.75 0 011.06 0zm12.314 0a.75.75 0 011.06 0l.707.707a.75.75 0 01-1.06 1.06l-.707-.707a.75.75 0 010-1.06zM10 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM3.479 12.48a.75.75 0 010 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707a.75.75 0 011.06 0zm13.042 0a.75.75 0 011.06 0l.707.707a.75.75 0 01-1.06 1.06l-.707-.707a.75.75 0 010-1.06zM10 17.25a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  Idioma
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
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
                  onChange={(e) => setArea(e.target.value)}
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
