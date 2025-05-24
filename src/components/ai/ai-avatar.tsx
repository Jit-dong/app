import type { LucideProps } from 'lucide-react';
import { Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AiAvatarProps extends Omit<LucideProps, 'size'> {
  containerClassName?: string;
  iconSize?: number; // in pixels
}

export default function AiAvatar({ containerClassName, iconSize = 32, className, ...props }: AiAvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-accent/10 text-accent p-2 shrink-0',
        containerClassName
      )}
    >
      {/* You can replace Cpu with a custom SVG or another icon */}
      <Cpu size={iconSize} className={cn(className)} {...props} />
    </div>
  );
}
