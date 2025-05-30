"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import type { AlternativePart, AlternativeLevel, BrandCategory } from '@/lib/types';

interface AlternativePartsCategorizedProps {
  parts: AlternativePart[];
  originalPart: string;
}

// 替代等级配置
const alternativeLevelConfig = {
  'BOM2BOM': {
    label: '完全替代 (BOM2BOM)',
    icon: '🥇',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    description: '封装、管脚、电气特性完全相同，可直接替换'
  },
  'P2P': {
    label: '管脚相同 (P2P)',
    icon: '🥈',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    description: '管脚定义相同，封装可能不同，需确认电气参数'
  },
  'FUNCTIONAL': {
    label: '功能相近',
    icon: '🥉',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-700',
    description: '功能类似但参数可能不同，需要重新设计验证'
  },
  'PACKAGE': {
    label: '封装相同',
    icon: '📦',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20',
    borderColor: 'border-gray-200 dark:border-gray-700',
    description: '仅封装尺寸相同，功能可能完全不同'
  }
};

// 品牌分类配置
const brandCategoryConfig = {
  'SAME_BRAND': {
    label: '相同品牌',
    icon: '🏢',
    color: 'text-green-600 dark:text-green-400'
  },
  'DOMESTIC': {
    label: '国内品牌',
    icon: '🇨🇳',
    color: 'text-red-600 dark:text-red-400'
  },
  'FOREIGN': {
    label: '国外品牌',
    icon: '🌍',
    color: 'text-blue-600 dark:text-blue-400'
  }
};

export default function AlternativePartsCategorized({ parts, originalPart }: AlternativePartsCategorizedProps) {
  const { toast } = useToast();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // 数据手册处理函数
  const handleDatasheetOpen = (part: AlternativePart) => {
    if (part.datasheetUrl) {
      window.open(part.datasheetUrl, '_blank');
      toast({
        title: "数据手册打开",
        description: `正在新窗口中打开 ${part.partNumber} 数据手册...`,
      });
    } else {
      toast({
        title: "数据手册不可用",
        description: "该替代料的数据手册暂时无法访问。",
        variant: "destructive",
      });
    }
  };

  // 按替代等级分组
  const partsByLevel = parts.reduce((acc, part) => {
    if (!acc[part.alternativeLevel]) {
      acc[part.alternativeLevel] = [];
    }
    acc[part.alternativeLevel].push(part);
    return acc;
  }, {} as Record<AlternativeLevel, AlternativePart[]>);

  // 按品牌分类分组
  const partsByBrand = parts.reduce((acc, part) => {
    if (!acc[part.brandCategory]) {
      acc[part.brandCategory] = [];
    }
    acc[part.brandCategory].push(part);
    return acc;
  }, {} as Record<BrandCategory, AlternativePart[]>);

  // 切换展开状态
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // 替代等级排序
  const levelOrder: AlternativeLevel[] = ['BOM2BOM', 'P2P', 'FUNCTIONAL', 'PACKAGE'];
  const brandOrder: BrandCategory[] = ['SAME_BRAND', 'DOMESTIC', 'FOREIGN'];

  return (
    <div className="space-y-6">
      {/* 按替代等级分类 */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-orange-200/60 dark:border-gray-700/50 shadow-xl shadow-orange-100/50 dark:shadow-gray-900/20">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {originalPart} 替代料信息
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                按替代等级分类 · 共找到 {parts.length} 个替代料选择
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {levelOrder.map(level => {
              const levelParts = partsByLevel[level];
              if (!levelParts || levelParts.length === 0) return null;

              const config = alternativeLevelConfig[level];
              const sectionId = `level-${level}`;
              const isExpanded = expandedSections[sectionId] ?? true;

              return (
                <div key={level} className={`rounded-xl border ${config.borderColor} ${config.bgColor} overflow-hidden`}>
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{config.icon}</span>
                      <div className="text-left">
                        <h3 className={`font-semibold ${config.color}`}>
                          {config.label}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {config.description} · {levelParts.length} 个选择
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      {levelParts
                        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
                        .map(part => (
                          <AlternativePartCard
                            key={part.id}
                            part={part}
                            onDatasheetOpen={handleDatasheetOpen}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 按品牌分类 */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-blue-200/60 dark:border-gray-700/50 shadow-xl shadow-blue-100/50 dark:shadow-gray-900/20">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌍</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                按品牌分类
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                国内品牌、国外品牌、相同品牌分类展示
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {brandOrder.map(brand => {
              const brandParts = partsByBrand[brand];
              if (!brandParts || brandParts.length === 0) return null;

              const config = brandCategoryConfig[brand];
              const sectionId = `brand-${brand}`;
              const isExpanded = expandedSections[sectionId] ?? true;

              return (
                <div key={brand} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 overflow-hidden">
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{config.icon}</span>
                      <div className="text-left">
                        <h3 className={`font-semibold ${config.color}`}>
                          {config.label}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {brandParts.length} 个替代料选择
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      {brandParts
                        .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
                        .map(part => (
                          <AlternativePartCard
                            key={part.id}
                            part={part}
                            onDatasheetOpen={handleDatasheetOpen}
                          />
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 替代料卡片组件
function AlternativePartCard({ 
  part, 
  onDatasheetOpen 
}: { 
  part: AlternativePart; 
  onDatasheetOpen: (part: AlternativePart) => void;
}) {
  const levelConfig = alternativeLevelConfig[part.alternativeLevel];
  const brandConfig = brandCategoryConfig[part.brandCategory];

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200/60 dark:border-gray-600/50 p-3 hover:shadow-md transition-all duration-200">
      {/* 头部：图片、型号、评分 */}
      <div className="flex items-center gap-3 mb-3">
        {/* 产品图片 */}
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {part.imageUrl ? (
            <img
              src={part.imageUrl}
              alt={part.partNumber}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`${part.imageUrl ? 'hidden' : ''} text-gray-400 text-xs text-center`}>
            <Cpu className="h-6 w-6 mx-auto mb-1" />
            芯片
          </div>
        </div>

        {/* 型号和品牌 */}
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
            {part.partNumber}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {part.manufacturer}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${levelConfig.bgColor} ${levelConfig.color} font-medium`}>
              {levelConfig.icon} {part.compatibilityScore}%
            </span>
            <span className={`text-xs ${brandConfig.color}`}>
              {brandConfig.icon} {brandConfig.label}
            </span>
          </div>
        </div>

        {/* 数据手册按钮 */}
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 px-2 py-1 h-auto text-xs flex-shrink-0"
          onClick={() => onDatasheetOpen(part)}
          title="查看数据手册"
        >
          <FileText className="h-3 w-3" />
        </Button>
      </div>

      {/* 产品信息 */}
      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-gray-500 dark:text-gray-400">封装:</span>
            <span className="ml-1 text-gray-900 dark:text-gray-100">{part.package}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">状态:</span>
            <span className="ml-1 text-gray-900 dark:text-gray-100">{part.lifecycle}</span>
          </div>
        </div>
        
        <div className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
          {part.description}
        </div>

        {/* 相同点和差异点 */}
        {(part.similarities || part.keyDifferences) && (
          <div className="pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
            {part.similarities && part.similarities.length > 0 && (
              <div className="mb-2">
                <span className="text-green-600 dark:text-green-400 font-medium text-xs">✓ 相同点:</span>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {part.similarities.join(' · ')}
                </div>
              </div>
            )}
            {part.keyDifferences && part.keyDifferences.length > 0 && (
              <div>
                <span className="text-orange-600 dark:text-orange-400 font-medium text-xs">⚠ 差异点:</span>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {part.keyDifferences.join(' · ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
