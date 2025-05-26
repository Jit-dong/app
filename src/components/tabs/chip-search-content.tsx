
"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/shared/search-bar";
import ChipListItem from "@/components/shared/chip-list-item"; // Import new component
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SearchX, FileText, RefreshCw, Zap, Sparkles, HelpCircle } from "lucide-react";

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'brand' | 'alternative';

// 搜索模式配置
const searchModes = {
  datasheet: {
    label: '查资料',
    icon: FileText,
    placeholder: '搜索芯片型号、制造商、特性...',
    description: '查找芯片详细资料和规格参数'
  },
  silkscreen: {
    label: '丝印反查',
    icon: Zap,
    placeholder: '输入芯片丝印查询型号',
    description: '通过丝印标识查找对应的芯片型号'
  },
  brand: {
    label: '查品牌',
    icon: RefreshCw,
    placeholder: '输入品牌名称查看产品线',
    description: '查看品牌的产品系列和热门型号'
  },
  alternative: {
    label: '查替代',
    icon: RefreshCw,
    placeholder: '输入芯片型号查找替代品',
    description: '查找芯片的替代型号和兼容产品'
  }
};

interface ChipSearchContentProps {
  initialQuery?: string;
  initialMode?: SearchMode;
  hideSearchBar?: boolean; // 是否隐藏搜索框
}

export default function ChipSearchContent({ initialQuery = '', initialMode = 'datasheet', hideSearchBar = false }: ChipSearchContentProps) {
  const [searchResults, setSearchResults] = useState<Chip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  const [searchMode, setSearchMode] = useState<SearchMode>(initialMode); // 使用传入的初始模式
  const [hasSearched, setHasSearched] = useState(!!initialQuery); // 如果有初始查询，则标记为已搜索
  const [aiEnhanced, setAiEnhanced] = useState(false); // AI增强功能状态
  const [showAiTooltip, setShowAiTooltip] = useState(false); // AI提示显示状态

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (initialQuery) {
        // 如果有初始查询，执行搜索
        const results = searchChips(initialQuery);
        setSearchResults(results);
      } else {
        // 否则显示默认结果
        const initialResults = searchChips("", {});
        // Prioritize TPS5430 items for demo if present
        const tpsDemoItems = initialResults.filter(c => c.model === 'TPS5430');
        const otherItems = initialResults.filter(c => c.model !== 'TPS5430');
        setSearchResults([...tpsDemoItems, ...otherItems]);
      }
      setIsLoading(false);
    }, 500);
  }, [initialQuery]);

  const performSearch = (query: string, mode: SearchMode = searchMode, useAI: boolean = aiEnhanced) => {
    setIsLoading(true);
    setHasSearched(true);

    // AI增强搜索需要更长时间
    const searchDelay = useAI ? 1500 : 500;

    setTimeout(() => {
      // 根据搜索模式调用不同的搜索逻辑
      let results: Chip[] = [];
      switch (mode) {
        case 'datasheet':
          results = searchChips(query);
          break;
        case 'silkscreen':
          // 这里可以调用专门的丝印搜索API
          results = searchChips(query); // 暂时使用相同逻辑
          break;
        case 'brand':
          // 这里可以调用专门的品牌搜索API
          results = searchChips(query); // 暂时使用相同逻辑
          break;
        default:
          results = searchChips(query);
      }

      // 如果启用AI增强，可以对结果进行AI处理
      if (useAI) {
        // 这里可以添加AI增强逻辑，比如智能排序、相关推荐等
        console.log('AI增强搜索已启用');
      }

      setSearchResults(results);
      setIsLoading(false);
    }, searchDelay);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    performSearch(query, searchMode);
  };

  const handleModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
    // 如果已经有搜索内容，重新搜索
    if (currentQuery.trim()) {
      performSearch(currentQuery, mode);
    }
  };

  const handleAiToggle = () => {
    const newAiState = !aiEnhanced;
    setAiEnhanced(newAiState);

    // 如果已经有搜索内容，重新搜索以应用AI增强
    if (currentQuery.trim() && hasSearched) {
      performSearch(currentQuery, searchMode, newAiState);
    }
  };

  return (
    <div className="space-y-6">
        {/* 搜索模式切换器 - 顶部显示 */}
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-xl bg-white dark:bg-gray-800 p-1 shadow-md border border-gray-200 dark:border-gray-700">
            {Object.entries(searchModes).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isActive = searchMode === key;
              return (
                <button
                  key={key}
                  onClick={() => handleModeChange(key as SearchMode)}
                  className={`
                    inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 当前模式描述 */}
        {!hideSearchBar && (
          <div className="text-center">
            <p className="text-muted-foreground">
              {searchModes[searchMode].description}
            </p>
          </div>
        )}

        {/* 搜索控制区 - 简化版本 */}
        {!hideSearchBar && (
          <div className="flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              className="w-full max-w-2xl"
              placeholder={searchModes[searchMode].placeholder}
              initialQuery={currentQuery}
              aiEnhanced={aiEnhanced}
              onAiToggle={handleAiToggle}
              showAiTooltip={showAiTooltip}
              onAiTooltipChange={setShowAiTooltip}
            />
          </div>
        )}

        {/* 内容展示区（动态变化） */}
        {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label={`正在${searchModes[searchMode].label}...`} />
        </div>
      ) : !hasSearched ? (
        // 简洁的初始状态 - 聚焦实用性
        <div className="py-8">
          {/* 搜索提示和快捷入口 */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 当前模式的简要说明 */}
            <div className="text-center">
              <p className="text-muted-foreground">
                {searchModes[searchMode].description}
              </p>
            </div>

            {/* 热门搜索 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                🔥 热门搜索
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {(searchMode === 'datasheet'
                  ? ['STM32F407', 'ESP32', 'TPS5430', 'LM358', 'AMS1117', 'ATmega328P']
                  : searchMode === 'silkscreen'
                  ? ['1117', '358', '5430', 'F407', 'ESP32', '328P']
                  : ['STMicroelectronics', 'Texas Instruments', 'Espressif', 'Microchip', 'Analog Devices']
                ).map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 hover:shadow-sm"
                    onClick={() => handleSearch(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* 搜索技巧 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                搜索技巧
              </h4>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {searchMode === 'datasheet' && (
                  <>
                    <p>• 支持型号搜索：如 "STM32F407VGT6"</p>
                    <p>• 支持制造商：如 "STMicroelectronics"</p>
                    <p>• 支持特性搜索：如 "32位微控制器"</p>
                  </>
                )}
                {searchMode === 'silkscreen' && (
                  <>
                    <p>• 输入芯片表面的丝印标识</p>
                    <p>• 支持部分丝印：如 "1117" 查找 AMS1117</p>
                    <p>• 大小写不敏感</p>
                  </>
                )}
                {searchMode === 'brand' && (
                  <>
                    <p>• 输入完整品牌名称获得最佳结果</p>
                    <p>• 支持中英文品牌名</p>
                    <p>• 查看品牌产品系列和热门型号</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {/* 根据搜索模式显示不同的结果标题 */}
          {searchMode === 'silkscreen' && currentQuery && (
            <div className="text-sm text-muted-foreground mb-3">
              丝印 <span className="font-medium">{currentQuery}</span> 可能对应的型号：
            </div>
          )}
          {searchMode === 'brand' && currentQuery && (
            <div className="text-sm text-muted-foreground mb-3">
              <span className="font-medium">{currentQuery}</span> 品牌产品：
            </div>
          )}

          {/* AI增强提示 */}
          {aiEnhanced && (
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 dark:bg-purple-950/20 p-2 rounded-lg mb-3">
              <Sparkles className="h-4 w-4" />
              <span>AI增强搜索已启用，结果已智能优化</span>
            </div>
          )}

          {searchResults.map((chip, index) => (
            <ChipListItem
              key={chip.id}
              chip={chip}
              showAlternativeCount={
                searchMode === 'datasheet' &&
                chip.model === 'TPS5430' &&
                chip.id === 'TPS5430-1'
              }
            />
          ))}
        </div>
      ) : (
        <Alert variant="default" className="shadow-md">
          <SearchX className="h-5 w-5" />
          <AlertTitle>
            {searchMode === 'datasheet' && '未找到芯片'}
            {searchMode === 'silkscreen' && '未找到对应型号'}
            {searchMode === 'brand' && '未找到品牌产品'}
          </AlertTitle>
          <AlertDescription>
            {searchMode === 'datasheet' && '没有芯片符合您的搜索条件。请尝试不同的关键词。'}
            {searchMode === 'silkscreen' && '未找到该丝印对应的型号。请检查丝印是否正确或尝试其他丝印。'}
            {searchMode === 'brand' && '未找到该品牌的产品信息。请检查品牌名称是否正确或尝试其他品牌。'}
            {aiEnhanced && (
              <div className="mt-2 text-purple-600">
                💡 AI建议：尝试使用更通用的关键词或检查拼写
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
