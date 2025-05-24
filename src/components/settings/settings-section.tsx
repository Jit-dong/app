import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SettingsSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  noCard?: boolean; // Option to render without a Card wrapper
}

export default function SettingsSection({
  title,
  description,
  children,
  className,
  titleClassName,
  noCard = false,
}: SettingsSectionProps) {
  const content = (
    <div className={className}>
      {title && (
        <div className="mb-4 px-1">
          <h2 className={`text-lg font-semibold tracking-tight ${titleClassName}`}>{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className={noCard ? "" : "space-y-0"}>{children}</div>
    </div>
  );

  if (noCard) {
    return content;
  }

  return (
    <Card>
      {title && !description && (
         <CardHeader className={titleClassName ? titleClassName : 'pb-2 pt-4'}>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      {title && description && (
        <CardHeader className={titleClassName ? titleClassName : 'pb-2 pt-4'}>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent className={title ? 'pt-0 pb-2' : 'py-2'}>
        {children}
      </CardContent>
    </Card>
  );
}
