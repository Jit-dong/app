"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileText, Cpu, Filter, X, GitCompare } from 'lucide-react';
import type { AlternativePart, AlternativeLevel, BrandCategory } from '@/lib/types';

interface AlternativePartsFilteredProps {
  parts: AlternativePart[];
  originalPart: string;
  onCompare?: (part: AlternativePart) => void;
}

// 替代等级配置
const alternativeLevelConfig = {
  'BOM2BOM': {
    label: '完全兼容',
    icon: '🥇',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: '可直接替换'
  },
  'P2P': {
    label: 'P2P兼容',
    icon: '🥈',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: '管脚相同'
  },
  'FUNCTIONAL': {
    label: '功能相近',
    icon: '🥉',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: '需要验证'
  },
  'PACKAGE': {
    label: '封装相同',
    icon: '📦',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    description: '仅封装相同'
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

// 状态颜色配置
const getLifecycleColor = (lifecycle: string) => {
  switch (lifecycle) {
    case '量产':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case '立即供货':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case '停产':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case '样品':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case '预生产':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// 状态图标配置
const getLifecycleIcon = (lifecycle: string) => {
  switch (lifecycle) {
    case '量产':
      return '✅';
    case '立即供货':
      return '🚀';
    case '停产':
      return '❌';
    case '样品':
      return '🧪';
    case '预生产':
      return '⏳';
    default:
      return '📦';
  }
};

export default function AlternativePartsFiltered({ parts, originalPart, onCompare }: AlternativePartsFilteredProps) {
  const { toast } = useToast();
  const [selectedLevel, setSelectedLevel] = useState<AlternativeLevel | 'ALL'>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<BrandCategory | 'ALL'>('ALL');
  const [showFilters, setShowFilters] = useState(false);

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

  // 筛选逻辑
  const filteredParts = parts.filter(part => {
    const levelMatch = selectedLevel === 'ALL' || part.alternativeLevel === selectedLevel;
    const brandMatch = selectedBrand === 'ALL' || part.brandCategory === selectedBrand;
    return levelMatch && brandMatch;
  });

  // 按兼容性评分排序
  const sortedParts = filteredParts.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  // 清除筛选
  const clearFilters = () => {
    setSelectedLevel('ALL');
    setSelectedBrand('ALL');
  };

  // 获取可用的筛选选项
  const availableLevels = Array.from(new Set(parts.map(p => p.alternativeLevel)));
  const availableBrands = Array.from(new Set(parts.map(p => p.brandCategory)));

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-orange-200/60 dark:border-gray-700/50 shadow-lg shadow-orange-100/50 dark:shadow-gray-900/20">
      <div className="p-2">
        {/* 标题区域 - 极致紧凑 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center">
            <Cpu className="h-3 w-3 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
              {originalPart} 替代料
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              共 {parts.length} 个，显示 {sortedParts.length} 个
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700 h-6 px-2 text-xs"
          >
            <Filter className="h-3 w-3" />
            筛选
          </Button>
        </div>

        {/* 筛选器 - 极致紧凑 */}
        {showFilters && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-2 mb-2 border border-orange-200/50 dark:border-orange-700/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs">筛选条件</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-2">
              {/* 替代等级筛选 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  替代等级
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSelectedLevel('ALL')}
                    className={`p-1 rounded-md text-xs font-medium transition-all ${
                      selectedLevel === 'ALL'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    全部
                  </button>
                  {availableLevels.map(level => {
                    const config = alternativeLevelConfig[level];
                    return (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`p-1 rounded-md text-xs font-medium transition-all ${
                          selectedLevel === level
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {config.icon}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 品牌分类筛选 */}
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  品牌分类
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => setSelectedBrand('ALL')}
                    className={`p-1 rounded-md text-xs font-medium transition-all ${
                      selectedBrand === 'ALL'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    全部
                  </button>
                  {availableBrands.map(brand => {
                    const config = brandCategoryConfig[brand];
                    return (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`p-1 rounded-md text-xs font-medium transition-all ${
                          selectedBrand === brand
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {config.icon}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 清除筛选 */}
              {(selectedLevel !== 'ALL' || selectedBrand !== 'ALL') && (
                <div className="pt-1 border-t border-orange-200/50 dark:border-orange-700/30">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700 h-6 text-xs"
                  >
                    清除筛选
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 当前筛选状态显示 - 紧凑 */}
        {(selectedLevel !== 'ALL' || selectedBrand !== 'ALL') && (
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedLevel !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs">
                {alternativeLevelConfig[selectedLevel].icon}
                <button
                  onClick={() => setSelectedLevel('ALL')}
                  className="hover:bg-orange-200 dark:hover:bg-orange-800/50 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
            {selectedBrand !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                {brandCategoryConfig[selectedBrand].icon}
                <button
                  onClick={() => setSelectedBrand('ALL')}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* 替代料列表 - 极致紧凑 */}
        <div className="space-y-1.5">
          {sortedParts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">没有符合筛选条件的替代料</p>
            </div>
          ) : (
            sortedParts.map(part => (
              <AlternativePartCard
                key={part.id}
                part={part}
                onDatasheetOpen={handleDatasheetOpen}
                onCompare={onCompare}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 替代料卡片组件 - 极致紧凑
function AlternativePartCard({
  part,
  onDatasheetOpen,
  onCompare
}: {
  part: AlternativePart;
  onDatasheetOpen: (part: AlternativePart) => void;
  onCompare?: (part: AlternativePart) => void;
}) {
  const levelConfig = alternativeLevelConfig[part.alternativeLevel];
  const brandConfig = brandCategoryConfig[part.brandCategory];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200/60 dark:border-gray-600/50 p-2 hover:shadow-md transition-all duration-200">
      {/* 头部：图片、型号、评分 - 单行布局 */}
      <div className="flex items-center gap-2 mb-1">
        {/* 产品图片 - 更小 */}
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
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
            <Cpu className="h-4 w-4" />
          </div>
        </div>

        {/* 型号和品牌 - 紧凑 */}
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
            {part.partNumber}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {part.manufacturer}
          </div>
        </div>

        {/* 评分和状态 - 紧凑 */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${levelConfig.bgColor} ${levelConfig.color} font-medium`}>
            {levelConfig.icon} {part.compatibilityScore}%
          </span>
          <span className={`text-xs ${brandConfig.color}`}>
            {brandConfig.icon}
          </span>
        </div>

        {/* 操作按钮 - 更小 */}
        <div className="flex gap-1 flex-shrink-0">
          {/* 对比按钮 */}
          {onCompare && (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 px-1 py-0.5 h-auto text-xs"
              onClick={() => onCompare(part)}
              title="详细对比"
            >
              <GitCompare className="h-3 w-3" />
            </Button>
          )}

          {/* 数据手册按钮 */}
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 px-1 py-0.5 h-auto text-xs"
            onClick={() => onDatasheetOpen(part)}
            title="查看数据手册"
          >
            <FileText className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* 产品信息 - 极致紧凑 */}
      <div className="text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">封装:</span>
            <span className="text-gray-900 dark:text-gray-100">{part.package}</span>
          </div>
          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getLifecycleColor(part.lifecycle)}`}>
            {getLifecycleIcon(part.lifecycle)} {part.lifecycle}
          </span>
        </div>

        <div className="text-gray-600 dark:text-gray-400 text-xs leading-tight mt-1 truncate">
          {part.description}
        </div>
      </div>
    </div>
  );
}
