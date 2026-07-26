import { Tag } from '../ui/Tag';

interface TermHeaderProps {
  term: string;
  categories: string[];
}

export function TermHeader({ term, categories }: TermHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
        {term}
      </h1>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Tag key={cat} variant="category">{cat}</Tag>
        ))}
      </div>
    </div>
  );
}
