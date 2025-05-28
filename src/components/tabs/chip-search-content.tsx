"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/shared/search-bar";
import ChipListItem from "@/components/shared/chip-list-item"; // Import new component
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SearchX, FileText, RefreshCw, Zap, Sparkles, HelpCircle, Shuffle, ChevronDown } from "lucide-react";
import BrandListWithFilter from './brand-list-with-filter';
import AlternativeSearchPage from './alternative-search-page';
import SilkscreenReversePage from './silkscreen-reverse-page';
import CrossSearchContent from './cross-search-content'; // Import the new component

// 搜索模式类型定义
type SearchMode = 'datasheet' | 'silkscreen' | 'cross' | 'alternative' | 'brand';

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
  },
  cross: {
    label: '交叉查询',
    icon: Shuffle,
    placeholder: '多维度交叉查询芯片信息',
    description: '通过多种条件组合查询芯片'
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

  // 筛选器状态
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  // 计算过滤后的结果
  const filteredResults = React.useMemo(() => {
    let filtered = [...searchResults];

    // 品牌筛选
    if (selectedBrand) {
      filtered = filtered.filter(chip => chip.manufacturer === selectedBrand);
    }

    // 分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(chip => chip.category === selectedCategory);
    }

    // 排序
    if (selectedSort === 'relevance') {
      // 按相关性排序（这里可以根据实际需求实现）
      filtered.sort((a, b) => a.model.localeCompare(b.model));
    } else if (selectedSort === 'update-time') {
      // 按更新时间排序（这里使用模拟逻辑）
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    return filtered;
  }, [searchResults, selectedBrand, selectedCategory, selectedSort]);

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
        case 'cross':
          // 这里可以调用专门的交叉查询API
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

  // 兜底，防止searchModes[searchMode]为undefined
  const safeMode = searchModes[searchMode] ? searchMode : 'datasheet';

  // 直接渲染对应模式的组件
  if (safeMode === 'brand') {
    return <BrandListWithFilter />;
  }
  if (safeMode === 'alternative') {
    return <AlternativeSearchPage />;
  }
  if (safeMode === 'silkscreen') {
    return <SilkscreenReversePage />;
  }
  if (safeMode === 'cross') {
    return <CrossSearchContent />;
  }

  // 对于 datasheet 模式（以及任何其他未特殊处理的模式），渲染通用搜索界面
  // 在此区域内，safeMode 必然是 'datasheet'
  return (
    <div className="space-y-6">
        <>


          {/* 搜索控制区 - 简化版本 */}
          {!hideSearchBar && (
            <div className="flex justify-center">
              <SearchBar
                onSearch={handleSearch}
                className="w-full max-w-2xl"
                placeholder={searchModes.datasheet.placeholder} // Use datasheet placeholder
                initialQuery={currentQuery}
              />
            </div>
          )}

          {/* 内容展示区（动态变化） */}
          {isLoading ? (
          <div className="flex justify-center py-12">
            {/* 在此区域内 safeMode 必然是 datasheet */}
            <LoadingSpinner label={`正在${searchModes.datasheet.label}...`} />
          </div>
        ) : !hasSearched ? (
          // 简洁的初始状态 - 聚焦实用性
          <div className="py-8">
            {/* 搜索提示和快捷入口 */}
            <div className="max-w-2xl mx-auto space-y-6">


              {/* 热门搜索 */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  🔥 热门搜索
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {/* 在此区域内 safeMode 必然是 datasheet，只显示 datasheet 热门搜索 */}
                  {['STM32F407', 'ESP32', 'TPS5430', 'LM358', 'AMS1117', 'ATmega328P', 'LM2596', 'NE555', '74HC595', 'Arduino', 'LM317', 'STM32F103'].map((term) => (
                    <button
                      key={term}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 border border-gray-200 dark:border-gray-700 rounded-md transition-all duration-200 hover:shadow-sm truncate text-center"
                      onClick={() => handleSearch(term)}
                      title={term}
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
                  <p>• 支持型号搜索：如 "STM32F407VGT6"</p>
                  <p>• 支持制造商：如 "STMicroelectronics"</p>
                  <p>• 支持特性搜索：如 "32位微控制器"</p>
                </div>
              </div>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            {/* 搜索结果标题和筛选器 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              {/* 搜索结果统计 */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">搜索结果</span>
                    <span className="font-semibold text-blue-700 dark:text-blue-300">{filteredResults.length}</span>
                    <span className="text-blue-600 dark:text-blue-400">个型号</span>
                  </span>
                  {filteredResults.length !== searchResults.length && (
                    <span className="text-gray-500 text-xs">（已筛选，原始结果 {searchResults.length} 个）</span>
                  )}
                </p>
              </div>

              {/* 筛选器区域 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  筛选条件
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* 品牌筛选 */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">品牌</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">全部品牌</option>
                      {Array.from(new Set(searchResults.map(chip => chip.manufacturer))).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* 分类筛选 */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">分类</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">全部分类</option>
                      {Array.from(new Set(searchResults.map(chip => chip.category).filter(Boolean))).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* 设计资源筛选 */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">设计资源</label>
                    <select
                      value={selectedResource}
                      onChange={(e) => setSelectedResource(e.target.value)}
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">全部资源</option>
                      <option value="reference-design">参考设计</option>
                      <option value="application-guide">应用指南</option>
                      <option value="technical-article">技术文章</option>
                    </select>
                  </div>

                  {/* 排序方式 */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">排序方式</label>
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      <option value="">默认排序</option>
                      <option value="relevance">相关性由强到弱</option>
                      <option value="update-time">信息更新时间</option>
                    </select>
                  </div>
                </div>

                {/* 清除筛选按钮 */}
                {(selectedBrand || selectedCategory || selectedResource || selectedSort) && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        setSelectedBrand('');
                        setSelectedCategory('');
                        setSelectedResource('');
                        setSelectedSort('');
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      清除筛选
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI增强提示 */}
            {aiEnhanced && (
              <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 dark:bg-purple-950/20 p-2 rounded-lg mb-3">
                <Sparkles className="h-4 w-4" />
                <span>AI增强搜索已启用，结果已智能优化</span>
              </div>
            )}

            {/* 产品列表 */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">产品</h3>
              {filteredResults.length > 0 ? (
                filteredResults.map((chip, index) => (
                  <ChipListItem
                    key={chip.id}
                    chip={chip}
                    // Conditional prop based on datasheet mode
                    showAlternativeCount={chip.model === 'TPS5430' && chip.id === 'TPS5430-1'}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>没有符合筛选条件的产品</p>
                  <button
                    onClick={() => {
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSelectedResource('');
                      setSelectedSort('');
                    }}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    清除筛选条件
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Alert variant="default" className="shadow-md">
            <SearchX className="h-5 w-5" />
            <AlertTitle>
              {/* 在此区域内 safeMode 必然是 datasheet */}
              {'未找到芯片'}
            </AlertTitle>
            <AlertDescription>
               {/* 在此区域内 safeMode 必然是 datasheet */}
              {'没有芯片符合您的搜索条件。请尝试不同的关键词。'}
              {aiEnhanced && (
                <div className="mt-2 text-purple-600">
                  💡 AI建议：尝试使用更通用的关键词或检查拼写
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </>
    </div>
  );
}
