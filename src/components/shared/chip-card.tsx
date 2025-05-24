
import Image from 'next/image';
import Link from 'next/link';
import type { Chip, AlternativeChip } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, Cpu } from 'lucide-react'; // Removed Replace

/**
 * @deprecated Prefer ChipListItem for search results and alternative lists. ChipCard might still be used for other display purposes or could be removed.
 */
interface ChipCardProps {
  chip: Chip | AlternativeChip;
  isAlternative?: boolean;
}

// Helper for localizing status and level, ideally this comes from a more robust i18n solution
const localizeStatus = (status?: string) => {
  if (!status) return '';
  const map: Record<string, string> = {
    'Active': '活跃',
    'EOL': '停产',
    'NRND': '不推荐新设计',
    'Preliminary': '初步',
    'Obsolete': '过时'
  };
  return map[status] || status;
}

const localizeAlternativeLevel = (level?: string) => {
  if (!level) return '';
  const map: Record<string, string> = {
    'Direct Drop-in': '直接替换',
    'Similar Functionality': '功能相似',
    'Potential Alternative': '潜在替代品'
  };
  return map[level] || level;
}


export default function ChipCard({ chip, isAlternative = false }: ChipCardProps) {
  const alternativeDetails = isAlternative ? (chip as AlternativeChip) : null;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        {chip.imageUrl && (
          <div className="relative h-40 w-full mb-4 rounded-t-lg overflow-hidden">
            <Image
              src={chip.imageUrl}
              alt={`${chip.model} 的图像`}
              layout="fill"
              objectFit="cover"
              data-ai-hint="microchip circuit"
            />
          </div>
        )}
        <CardTitle className="text-xl flex items-center gap-2">
          <Cpu className="h-6 w-6 text-accent" />
          {chip.model}
        </CardTitle>
        <CardDescription>{chip.manufacturer}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{chip.description}</p>
        
        <div className="space-y-1">
          {chip.lifecycleStatus && (
            <Badge variant={chip.lifecycleStatus === 'Active' ? 'default' : 'destructive'} className="text-xs">
              {localizeStatus(chip.lifecycleStatus)}
            </Badge>
          )}
          {alternativeDetails?.alternativeLevel && (
            <Badge variant="secondary" className="ml-2 text-xs bg-accent/20 text-accent-foreground">
              {localizeAlternativeLevel(alternativeDetails.alternativeLevel)}
            </Badge>
          )}
        </div>

        {alternativeDetails?.keyDifferences && alternativeDetails.keyDifferences.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground">主要区别:</h4>
            <ul className="list-disc list-inside text-xs">
              {alternativeDetails.keyDifferences.slice(0, 2).map(diff => <li key={diff}>{diff}</li>)}
            </ul>
          </div>
        )}

        {chip.tags && chip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {chip.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between pt-4">
        <Link href={`/chip/${chip.id}`} passHref legacyBehavior>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Info className="mr-2 h-4 w-4" /> 详情
          </Button>
        </Link>
        <div className="flex gap-2 w-full sm:w-auto">
        {chip.datasheetUrl && chip.datasheetUrl !== '#' && (
            <a href={chip.datasheetUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" /> 数据手册
              </Button>
            </a>
          )}
          {/* {!isAlternative && ( // Only show "Find Alternatives" if not already an alternative card
             <Link href={`/alternatives/${chip.id}`} passHref legacyBehavior>
              <Button variant="secondary" size="sm" className="w-full">
                <Replace className="mr-2 h-4 w-4" /> 替代品
              </Button>
            </Link>
          )} */}
        </div>
      </CardFooter>
    </Card>
  );
}
