import { CodeBlock } from '../ui/CodeBlock';

interface ExampleSectionProps {
  language: string;
  code: string;
  description: string;
}

export function ExampleSection({ language, code, description }: ExampleSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        Exemplo prático
      </h2>
      <CodeBlock language={language} code={code} />
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </section>
  );
}
