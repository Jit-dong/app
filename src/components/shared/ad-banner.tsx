import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdBannerProps {
  className?: string;
  closable?: boolean;
  onClose?: () => void;
  variant?: 'horizontal' | 'vertical';
}

export function AdBannerHorizontal({ className, closable, onClose }: AdBannerProps) {
  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-100 dark:border-blue-900",
      className
    )}>
      {closable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">专业电子元器件采购平台</h3>
            <p className="text-xs text-muted-foreground">海量库存，快速发货，品质保证</p>
          </div>
          <Button size="sm" className="ml-4">
            立即查看
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AdBannerVertical({ className, closable, onClose }: AdBannerProps) {
  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-100 dark:border-blue-900",
      className
    )}>
      {closable && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <div className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">专业电子元器件采购平台</h3>
          <p className="text-xs text-muted-foreground">海量库存，快速发货，品质保证</p>
          <Button size="sm" className="w-full">
            立即查看
          </Button>
        </div>
      </div>
    </div>
  );
} 