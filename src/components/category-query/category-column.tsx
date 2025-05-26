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
    <div className="flex-1 border-r border-gray-200/60 dark:border-gray-700/60 last:border-r-0 bg-white/50 dark:bg-gray-900/50 h-full flex flex-col">
      <h3 className="p-4 font-bold text-sm border-b border-gray-200/60 dark:border-gray-700/60 text-center bg-gradient-to-r from-gray-100/80 to-blue-100/60 dark:from-gray-800/80 dark:to-blue-950/60 text-gray-700 dark:text-gray-200">
        {title}
      </h3>
      {isLoading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400 font-medium">加载中...</div>
      ) : categories.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400 flex-grow flex items-center justify-center font-medium">
          请先选择上一级分类
        </div>
      ) : (
        <ScrollArea className="flex-grow">
          <ul className="p-2 space-y-1">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => onSelectCategory(category)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center group',
                    selectedCategoryName === category.name
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg transform scale-[1.02]'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30 hover:shadow-md font-medium',
                    level === 1 && 'text-base font-semibold',
                    level === 2 && 'text-sm font-medium',
                    level === 3 && 'text-sm'
                  )}
                >
                  <span className="truncate">{category.name}</span>
                  {category.subCategories && category.subCategories.length > 0 && (
                    <span className={cn(
                      "text-sm ml-2 transition-transform duration-200 group-hover:translate-x-0.5",
                      selectedCategoryName === category.name
                        ? "text-white/90"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    )}>
                      ›
                    </span>
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
