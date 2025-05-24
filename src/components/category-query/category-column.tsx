import type { Category } from '@/lib/category-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CategoryColumnProps {
  categories: Category[];
  selectedCategoryName?: string | null;
  onSelectCategory: (category: Category) => void;
  title: string;
  level: number; // For potential level-specific styling
  isLoading?: boolean; // For future async loading
}

export default function CategoryColumn({
  categories,
  selectedCategoryName,
  onSelectCategory,
  title,
  level,
  isLoading = false,
}: CategoryColumnProps) {
  return (
    <div className="flex-1 border-r border-border last:border-r-0 bg-card h-full flex flex-col">
      <h3 className="p-3 font-semibold text-sm border-b border-border text-center text-muted-foreground">
        {title}
      </h3>
      {isLoading ? (
        <div className="p-4 text-center text-muted-foreground">加载中...</div>
      ) : categories.length === 0 ? (
        <div className="p-4 text-center text-xs text-muted-foreground flex-grow flex items-center justify-center">请先选择上一级分类</div>
      ) : (
        <ScrollArea className="flex-grow">
          <ul className="p-1 space-y-0.5">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 text-sm rounded-md hover:bg-muted transition-colors flex justify-between items-center',
                    selectedCategoryName === category.name
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-foreground',
                    level === 1 && 'font-medium', // Example: Make L1 items slightly bolder
                    level === 2 && 'text-sm',
                    level === 3 && 'text-xs'
                  )}
                >
                  <span>{category.name}</span>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <span className={cn("text-xs opacity-70", selectedCategoryName === category.name && "text-primary-foreground/80")}>&gt;</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
