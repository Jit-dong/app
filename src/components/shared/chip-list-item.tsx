
import Link from 'next/link';
import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Replace, ShieldCheck, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { findAlternativesByChipId } from '@/lib/placeholder-data'; // To get alternative count

interface ChipListItemProps {
  chip: Chip;
  showAlternativeCount?: boolean; // To conditionally show "替代料: XX+"
}

export default function ChipListItem({ chip, showAlternativeCount = false }: ChipListItemProps) {
  const alternativeCount = findAlternativesByChipId(chip.id).length;
  const displayAlternativeText = alternativeCount > 0 ? (alternativeCount > 99 ? '99+' : alternativeCount.toString()) : '0';

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/chip/${chip.id}`} passHref legacyBehavior>
        <a className="block hover:bg-muted/30 transition-colors">
          <div className="p-4 space-y-1.5">
            {/* Line 1 */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary group-hover:underline group-hover:text-primary/90 break-all">
                {chip.model}
              </span>
              <span className="text-sm text-muted-foreground">({chip.manufacturer})</span>
              {chip.series && (
                <Badge variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">系列</Badge>
              )}
            </div>

            {/* Line 2 */}
            {chip.category && (
              <p className="text-xs text-muted-foreground">
                分类：{chip.category}
              </p>
            )}

            {/* Line 3 */}
            <p className="text-sm text-foreground line-clamp-2">
              描述：{chip.description}
            </p>

            {/* Line 4 */}
            {chip.applications && chip.applications.length > 0 && (
              <p className="text-xs text-muted-foreground">
                应用：{chip.applications.join('，')}
              </p>
            )}
          </div>
          <Separator />
          {/* Line 5 */}
          <div className="p-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
            {chip.datasheetUrl && chip.datasheetUrl !== '#' && (
              <span
                onClick={(e) => { 
                  e.preventDefault(); // Prevent link navigation from parent
                  stopPropagation(e); 
                  window.open(chip.datasheetUrl, '_blank');
                }}
                className="flex items-center gap-1 text-muted-foreground hover:text-accent hover:underline cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" /> 数据手册 <ExternalLink className="h-3 w-3 opacity-70" />
              </span>
            )}
            
            {showAlternativeCount && (
              <span 
                className="flex items-center gap-1 text-muted-foreground"
              >
                <Replace className="h-3.5 w-3.5" /> 替代料: {displayAlternativeText}
              </span>
            )}

            {chip.automotiveGrade && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> 车规级
              </span>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}
