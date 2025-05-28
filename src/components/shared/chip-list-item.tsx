
import Link from 'next/link';
import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Replace, ShieldCheck, ExternalLink, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { findAlternativesByChipId } from '@/lib/placeholder-data'; // To get alternative count
import { useState } from 'react';

interface ChipListItemProps {
  chip: Chip;
  showAlternativeCount?: boolean; // To conditionally show "替代料: XX+"
}

export default function ChipListItem({ chip, showAlternativeCount = false }: ChipListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const alternativeCount = findAlternativesByChipId(chip.id).length;
  const displayAlternativeText = alternativeCount > 0 ? (alternativeCount > 99 ? '99+' : alternativeCount.toString()) : '0';

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
      {/* 分类路径 */}
      <div className="px-4 pt-3 pb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          产品
        </div>
        <div className="text-sm text-blue-600 dark:text-blue-400">
          电源管理芯片-直流直流交换器-降压型稳压器
        </div>
      </div>

      {/* 产品标题区域 */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {chip.model}
              </h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 dark:text-green-400">量产</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              品牌：{chip.manufacturer || 'TI(德州仪器)'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              描述：{chip.description}
            </p>
          </div>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
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
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-700 dark:hover:bg-blue-950/20"
              onClick={toggleExpanded}
            >
              <span>查看订购信息</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* 折叠展开的订购信息 - 紧跟在按钮下方 */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4 mb-4">
            {/* 顶部标签栏 */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">数据手册</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">替代料: {displayAlternativeText}</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">替代料列表: 2</span>
            </div>

            {/* 替代料列表 */}
            <div className="space-y-3">
              {/* 第一个替代料 */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {chip.model}DOCT
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400">量产</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div>封装: SOT23-6</div>
                      <div>替代料: 6</div>
                      <div>数量: 3201</div>
                      <div>包装: 3000/T&R</div>
                      <div className="col-span-2">工作温度: -40°至125°</div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">替代料: 3</div>
                  </div>
                </div>
              </div>

              {/* 第二个替代料 */}
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {chip.model}DDCR
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400">量产</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div>封装: SOT23-6</div>
                      <div>替代料: 6</div>
                      <div>数量: 3201</div>
                      <div>包装: 3000/T&R</div>
                      <div className="col-span-2">工作温度: -40°至125°</div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">替代料: 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 参考设计 */}
        <div className="mb-4">
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              参考设计
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {chip.model}EVM-715
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              品牌：{chip.manufacturer || 'TI(德州仪器)'}
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              描述：3A SWIFT 降压转换器评估模块
            </p>
          </div>
        </div>

        {/* 技术文档 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">技术文档</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>

        {/* 应用指南 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">应用指南</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>

        {/* 行业资讯 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">行业资讯</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>
      </div>
    </div>
  );
}
