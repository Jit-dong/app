
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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
      {/* 产品标题区域 */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {chip.model}
              </h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400">正在供货</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              品牌：{chip.manufacturer || 'TI(德州仪器)'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              描述：{chip.description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="w-12 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          {chip.datasheetUrl && chip.datasheetUrl !== '#' && (
            <button
              onClick={(e) => {
                stopPropagation(e);
                window.open(chip.datasheetUrl, '_blank');
              }}
              className="flex items-center gap-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              <FileText className="h-4 w-4" />
              数据手册
            </button>
          )}

          {showAlternativeCount && (
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Replace className="h-4 w-4" />
              替代料: {displayAlternativeText}
            </span>
          )}

          {chip.automotiveGrade && (
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <ShieldCheck className="h-4 w-4" />
              车规级
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/chip/${chip.id}/purchase`} passHref legacyBehavior>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-950/20"
              onClick={stopPropagation}
            >
              查看订购信息
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
