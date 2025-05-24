import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  label?: string;
}

export default function LoadingSpinner({ className, size = 24, label = "加载中..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
      <Loader2
        className={cn('animate-spin text-accent', className)}
        size={size}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
