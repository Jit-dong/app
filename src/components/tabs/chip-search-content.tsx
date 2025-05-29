"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/shared/search-bar";
import ChipListItem from "@/components/shared/chip-list-item"; // Import new component
import type { Chip, ReferenceDesign, TechnicalDocument, ApplicationGuide, IndustryNews } from "@/lib/types";
import {
  searchChips,
  searchReferenceDesigns,
  searchTechnicalDocuments,
  searchApplicationGuides,
  searchIndustryNews,
  findOrderDetailsByChipId
} from "@/lib/placeholder-data";
import ContentItem from '@/components/shared/content-item';
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX, FileText, RefreshCw, Zap, Sparkles, HelpCircle, Shuffle, MoreHorizontal, ChevronDown, ChevronUp, ShoppingCart, Package, Truck } from "lucide-react";
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
  const [referenceDesigns, setReferenceDesigns] = useState<ReferenceDesign[]>([]);
  const [technicalDocuments, setTechnicalDocuments] = useState<TechnicalDocument[]>([]);
  const [applicationGuides, setApplicationGuides] = useState<ApplicationGuide[]>([]);
  const [industryNews, setIndustryNews] = useState<IndustryNews[]>([]);
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

  // 分页状态
  const [displayedCount, setDisplayedCount] = useState(5); // 初始显示5个结果
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 订购信息展开状态
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  // 各内容类型的展示模式状态（折叠/展开）
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);
  const [isReferenceDesignsExpanded, setIsReferenceDesignsExpanded] = useState(false);
  const [isTechnicalDocsExpanded, setIsTechnicalDocsExpanded] = useState(false);
  const [isApplicationGuidesExpanded, setIsApplicationGuidesExpanded] = useState(false);
  const [isIndustryNewsExpanded, setIsIndustryNewsExpanded] = useState(false);

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

  // 计算当前显示的结果（分页）
  const displayedResults = React.useMemo(() => {
    return filteredResults.slice(0, displayedCount);
  }, [filteredResults, displayedCount]);

  // 当搜索结果变化时，重置所有展开状态
  React.useEffect(() => {
    setIsProductsExpanded(false);
    setIsReferenceDesignsExpanded(false);
    setIsTechnicalDocsExpanded(false);
    setIsApplicationGuidesExpanded(false);
    setIsIndustryNewsExpanded(false);
  }, [filteredResults.length, referenceDesigns.length, technicalDocuments.length, applicationGuides.length, industryNews.length]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (initialQuery) {
        // 如果有初始查询，执行搜索
        const results = searchChips(initialQuery);
        const refDesigns = searchReferenceDesigns(initialQuery);
        const techDocs = searchTechnicalDocuments(initialQuery);
        const appGuides = searchApplicationGuides(initialQuery);
        const news = searchIndustryNews(initialQuery);

        setSearchResults(results);
        setReferenceDesigns(refDesigns);
        setTechnicalDocuments(techDocs);
        setApplicationGuides(appGuides);
        setIndustryNews(news);
      } else {
        // 否则显示默认结果
        const initialResults = searchChips("", {});
        // Prioritize TPS5430 items for demo if present
        const tpsDemoItems = initialResults.filter(c => c.model === 'TPS5430');
        const otherItems = initialResults.filter(c => c.model !== 'TPS5430');
        setSearchResults([...tpsDemoItems, ...otherItems]);

        // 加载默认的其他内容
        setReferenceDesigns(searchReferenceDesigns(""));
        setTechnicalDocuments(searchTechnicalDocuments(""));
        setApplicationGuides(searchApplicationGuides(""));
        setIndustryNews(searchIndustryNews(""));
      }
      setIsLoading(false);
    }, 500);
  }, [initialQuery]);

  // 当筛选条件改变时重置分页
  useEffect(() => {
    resetPagination();
  }, [selectedBrand, selectedCategory, selectedResource, selectedSort]);

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

      // 搜索其他类型的内容
      const refDesigns = searchReferenceDesigns(query);
      const techDocs = searchTechnicalDocuments(query);
      const appGuides = searchApplicationGuides(query);
      const news = searchIndustryNews(query);

      // 如果启用AI增强，可以对结果进行AI处理
      if (useAI) {
        // 这里可以添加AI增强逻辑，比如智能排序、相关推荐等
        console.log('AI增强搜索已启用');
      }

      setSearchResults(results);
      setReferenceDesigns(refDesigns);
      setTechnicalDocuments(techDocs);
      setApplicationGuides(appGuides);
      setIndustryNews(news);
      setIsLoading(false);
    }, searchDelay);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    resetPagination(); // 重置分页
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

  // 处理"展示更多"按钮点击
  const handleLoadMore = () => {
    setIsLoadingMore(true);

    // 模拟加载延迟
    setTimeout(() => {
      setDisplayedCount(prev => prev + 5); // 每次加载5个更多结果
      setIsLoadingMore(false);
    }, 800);
  };

  // 重置分页状态（当搜索或筛选条件改变时）
  const resetPagination = () => {
    setDisplayedCount(5);
  };

  // 切换订购信息展开状态
  const toggleOrderInfo = (chipId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(chipId)) {
        newSet.delete(chipId);
      } else {
        newSet.add(chipId);
      }
      return newSet;
    });
  };

  // 判断各内容类型是否应该显示折叠模式（多条数据时）
  const shouldShowCollapsedMode = filteredResults.length > 3;
  const shouldShowReferenceDesignsCollapsed = referenceDesigns.length > 3;
  const shouldShowTechnicalDocsCollapsed = technicalDocuments.length > 3;
  const shouldShowApplicationGuidesCollapsed = applicationGuides.length > 3;
  const shouldShowIndustryNewsCollapsed = industryNews.length > 3;



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
            {/* 简洁的筛选条件 */}
            <div className="space-y-4">
              {/* 一行显示所有筛选条件 */}
              <div className="grid grid-cols-4 gap-3">
                {/* 品牌筛选 */}
                <div className="space-y-1">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">品牌</option>
                    {Array.from(new Set(searchResults.map(chip => chip.manufacturer))).map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* 分类筛选 */}
                <div className="space-y-1">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">分类</option>
                    {Array.from(new Set(searchResults.map(chip => chip.category).filter(Boolean))).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* 设计资源筛选 */}
                <div className="space-y-1">
                  <select
                    value={selectedResource}
                    onChange={(e) => setSelectedResource(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">设计资源</option>
                    <option value="reference-design">参考设计</option>
                    <option value="application-guide">应用指南</option>
                    <option value="technical-article">技术文章</option>
                  </select>
                </div>

                {/* 排序方式 */}
                <div className="space-y-1">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">排序方式</option>
                    <option value="relevance">相关性由强到弱</option>
                    <option value="update-time">信息更新时间</option>
                  </select>
                </div>
              </div>

              {/* 清除筛选按钮 - 简化版 */}
              {(selectedBrand || selectedCategory || selectedResource || selectedSort) && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSelectedResource('');
                      setSelectedSort('');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    清除筛选
                  </button>
                </div>
              )}
            </div>

            {/* AI增强提示 */}
            {aiEnhanced && (
              <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 dark:bg-purple-950/20 p-2 rounded-lg mb-3">
                <Sparkles className="h-4 w-4" />
                <span>AI增强搜索已启用，结果已智能优化</span>
              </div>
            )}

            {/* 搜索结果分类显示 */}
            <div className="space-y-6">
              {/* 1. 产品框架 - 所有产品聚合在一个大框架中 */}
              {filteredResults.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      产品 ({filteredResults.length})
                    </h3>
                  </div>

                  {/* 产品网格布局 - 根据模式显示不同的布局 */}
                  {shouldShowCollapsedMode && !isProductsExpanded ? (
                    // 折叠模式：紧凑移动端体验
                    <div className="space-y-2">
                      {filteredResults.slice(0, 3).map((chip) => (
                        <div key={chip.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-98 transition-all duration-150">
                          {/* 产品信息 - 紧凑布局 */}
                          <div className="flex items-center gap-3">
                            {/* 产品图标 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>

                            {/* 产品信息 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{chip.model}</h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">开关稳压器-DC/DC转换器</span>
                                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  <span className="text-xs font-medium text-green-700 dark:text-green-400">量产</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-tight">{chip.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 展开模式：超紧凑设计
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {displayedResults.map((chip) => (
                      <div key={chip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden">
                        {/* 产品头部 - 紧凑版 */}
                        <div className="p-3 pb-2">
                          <div className="flex items-start gap-2 mb-2">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                                <img
                                  src={`/brands/image_cp/${chip.model}.png`}
                                  alt={chip.model}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <Package className="hidden h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{chip.model}</h4>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">开关稳压器-DC/DC转换器</span>
                                  <div className="flex items-center gap-0.5 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    <span className="text-xs font-medium text-green-700 dark:text-green-400">量产</span>
                                  </div>
                                </div>
                                {/* PDF数据手册链接 */}
                                <a
                                  href={`/datasheets/${chip.model}.pdf`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded transition-colors flex-shrink-0"
                                  title="查看数据手册PDF"
                                >
                                  <FileText className="h-3 w-3" />
                                  <span>PDF</span>
                                </a>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-tight">{chip.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* 产品信息 - 极简显示 */}
                        <div className="px-3 pb-3">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="font-medium text-gray-900 dark:text-gray-100">德州仪器-TI</span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-xs">替代料 6</span>
                              <button
                                onClick={() => toggleOrderInfo(chip.id)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
                                title="查看订购信息"
                              >
                                <ShoppingCart className="h-3 w-3" />
                                {expandedOrders.has(chip.id) ? (
                                  <ChevronUp className="h-3 w-3" />
                                ) : (
                                  <ChevronDown className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 展开的订购信息 - 紧凑版 */}
                        {expandedOrders.has(chip.id) && (() => {
                          const chipOrderDetails = findOrderDetailsByChipId(chip.id);
                          return (
                            <div className="mx-3 mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30">
                              <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                订购详情 ({chipOrderDetails.length} 个型号)
                              </h5>
                              <div className="space-y-3">
                                {chipOrderDetails.map((orderDetail) => (
                                  <div key={orderDetail.id} className="bg-white dark:bg-gray-800/70 rounded-lg p-3 border border-white/50 dark:border-gray-700/50">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{orderDetail.model}</span>
                                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                      <span className="text-xs text-green-600 dark:text-green-400">{orderDetail.lifecycle}</span>
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                      {/* 第一行：封装、管脚、工作温度 */}
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                          <span className="text-gray-500 dark:text-gray-400 font-medium">封装:</span>
                                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.package}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="text-gray-500 dark:text-gray-400 font-medium">引脚:</span>
                                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.pins}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <span className="text-gray-500 dark:text-gray-400 font-medium">工作温度:</span>
                                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.workTemp}</span>
                                        </div>
                                      </div>

                                      {/* 第二行：包装数量、承运商、状态 */}
                                      <div className="flex items-center gap-4">
                                        {orderDetail.packagingQuantity ? (
                                          <>
                                            <div className="flex items-center gap-1">
                                              <span className="text-gray-500 dark:text-gray-400 font-medium">包装数量:</span>
                                              <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.packagingQuantity}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <span className="text-gray-500 dark:text-gray-400 font-medium">承运商:</span>
                                              <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.carrier}</span>
                                            </div>
                                          </>
                                        ) : (
                                          <div className="flex items-center gap-1">
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">包装:</span>
                                            <span className="font-bold text-gray-900 dark:text-gray-100">2500/T&R</span>
                                          </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                          <span className="text-gray-500 dark:text-gray-400 font-medium">状态:</span>
                                          <div className="flex items-center gap-1">
                                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                            <span className="font-bold text-green-600 dark:text-green-400">{orderDetail.lifecycle}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起按钮 */}
                  {shouldShowCollapsedMode && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isProductsExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            收起 ({filteredResults.length - 3} 个)
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            展开更多 ({filteredResults.length - 3} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* 展示更多按钮（仅在展开模式下显示） */}
                  {(!shouldShowCollapsedMode || isProductsExpanded) && displayedResults.length < filteredResults.length && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isLoadingMore ? (
                          <>
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            加载中...
                          </>
                        ) : (
                          <>
                            <MoreHorizontal className="h-4 w-4" />
                            展示更多 ({filteredResults.length - displayedResults.length} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 2. 参考设计框架 - 所有参考设计聚合在一个大框架中 */}
              {referenceDesigns.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      参考设计 ({referenceDesigns.length})
                    </h3>
                  </div>

                  {/* 参考设计布局 - 根据模式显示不同的布局 */}
                  {shouldShowReferenceDesignsCollapsed && !isReferenceDesignsExpanded ? (
                    // 折叠模式：紧凑移动端体验
                    <div className="space-y-2">
                      {referenceDesigns.slice(0, 3).map((design) => (
                        <div key={design.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-98 transition-all duration-150">
                          <div className="flex items-center gap-3">
                            {/* 设计图标 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>

                            {/* 设计信息 */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">{design.title}</h4>
                              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                {design.manufacturer}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 展开模式：完整显示
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {referenceDesigns.map((design) => (
                        <div key={design.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{design.title}</h4>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            品牌：{design.manufacturer}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            描述：{design.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起按钮 */}
                  {shouldShowReferenceDesignsCollapsed && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsReferenceDesignsExpanded(!isReferenceDesignsExpanded)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isReferenceDesignsExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            收起 ({referenceDesigns.length - 3} 个)
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            展开更多 ({referenceDesigns.length - 3} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. 技术文档框架 - 所有技术文档聚合在一个大框架中 */}
              {technicalDocuments.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      技术文档 ({technicalDocuments.length})
                    </h3>
                  </div>

                  {/* 技术文档布局 - 根据模式显示不同的布局 */}
                  {shouldShowTechnicalDocsCollapsed && !isTechnicalDocsExpanded ? (
                    // 折叠模式：紧凑移动端体验
                    <div className="space-y-2">
                      {technicalDocuments.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-98 transition-all duration-150">
                          <div className="flex items-center gap-3">
                            {/* 文档图标 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>

                            {/* 文档信息 */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">{doc.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{doc.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 展开模式：完整显示
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {technicalDocuments.map((doc) => (
                        <div key={doc.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{doc.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{doc.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起按钮 */}
                  {shouldShowTechnicalDocsCollapsed && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsTechnicalDocsExpanded(!isTechnicalDocsExpanded)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isTechnicalDocsExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            收起 ({technicalDocuments.length - 3} 个)
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            展开更多 ({technicalDocuments.length - 3} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. 应用指南框架 - 所有应用指南聚合在一个大框架中 */}
              {applicationGuides.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      应用指南 ({applicationGuides.length})
                    </h3>
                  </div>

                  {/* 应用指南布局 - 根据模式显示不同的布局 */}
                  {shouldShowApplicationGuidesCollapsed && !isApplicationGuidesExpanded ? (
                    // 折叠模式：紧凑移动端体验
                    <div className="space-y-2">
                      {applicationGuides.slice(0, 3).map((guide) => (
                        <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-98 transition-all duration-150">
                          <div className="flex items-center gap-3">
                            {/* 指南图标 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>

                            {/* 指南信息 */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">{guide.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{guide.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 展开模式：完整显示
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {applicationGuides.map((guide) => (
                        <div key={guide.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{guide.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{guide.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起按钮 */}
                  {shouldShowApplicationGuidesCollapsed && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsApplicationGuidesExpanded(!isApplicationGuidesExpanded)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isApplicationGuidesExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            收起 ({applicationGuides.length - 3} 个)
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            展开更多 ({applicationGuides.length - 3} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 5. 行业资讯框架 - 所有行业资讯聚合在一个大框架中 */}
              {industryNews.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      行业资讯 ({industryNews.length})
                    </h3>
                  </div>

                  {/* 行业资讯布局 - 根据模式显示不同的布局 */}
                  {shouldShowIndustryNewsCollapsed && !isIndustryNewsExpanded ? (
                    // 折叠模式：紧凑移动端体验
                    <div className="space-y-2">
                      {industryNews.slice(0, 3).map((news) => (
                        <div key={news.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 active:scale-98 transition-all duration-150">
                          <div className="flex items-center gap-3">
                            {/* 资讯图标 */}
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>

                            {/* 资讯信息 */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">{news.title}</h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{news.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 展开模式：完整显示
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {industryNews.map((news) => (
                        <div key={news.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{news.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{news.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 展开/收起按钮 */}
                  {shouldShowIndustryNewsCollapsed && (
                    <div className="flex justify-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => setIsIndustryNewsExpanded(!isIndustryNewsExpanded)}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        {isIndustryNewsExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            收起 ({industryNews.length - 3} 个)
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            展开更多 ({industryNews.length - 3} 个)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 无结果提示 */}
              {filteredResults.length === 0 && referenceDesigns.length === 0 && technicalDocuments.length === 0 && applicationGuides.length === 0 && industryNews.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>没有找到相关内容</p>
                  <button
                    onClick={() => {
                      setSelectedBrand('');
                      setSelectedCategory('');
                      setSelectedResource('');
                      setSelectedSort('');
                      resetPagination();
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
