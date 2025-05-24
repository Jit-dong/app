import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsItemProps {
  icon?: LucideIcon;
  avatarSrc?: string;
  avatarFallback?: string;
  label: string;
  value?: string | React.ReactNode;
  onItemClick?: () => void;
  href?: string;
  actionSlot?: React.ReactNode;
  clickable?: boolean; // Explicitly control chevron visibility
  className?: string;
  isLast?: boolean;
}

export default function SettingsItem({
  icon: Icon,
  avatarSrc,
  avatarFallback,
  label,
  value,
  onItemClick,
  href,
  actionSlot,
  clickable,
  className,
  isLast = false,
}: SettingsItemProps) {
  const hasAction = !!href || !!onItemClick || clickable;

  const content = (
    <div
      className={cn(
        "flex items-center justify-between p-4 min-h-[60px]",
        hasAction && "cursor-pointer hover:bg-muted/50",
        !isLast && "border-b",
        className
      )}
      onClick={onItemClick}
      role={hasAction ? "button" : undefined}
      tabIndex={hasAction ? 0 : undefined}
      onKeyDown={hasAction ? (e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick?.(); } : undefined}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        {avatarSrc && (
           <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc} alt={label} />
            <AvatarFallback>{avatarFallback || label.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-muted-foreground">{value}</span>}
        {actionSlot}
        {hasAction && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className="block">{content}</a>
      </Link>
    );
  }

  return content;
}
