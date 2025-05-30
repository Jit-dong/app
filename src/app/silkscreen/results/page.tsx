"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Star, Download, Cpu } from 'lucide-react';
import { searchSilkscreen, type SilkscreenData } from '@/lib/placeholder-data';
import Image from 'next/image';
import LoadingSpinner from '@/components/shared/loading-spinner';

function SilkscreenResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SilkscreenData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 筛选状态
  const [filters, setFilters] = useState({
    manufacturer: '',
    category: '',
    package: ''
  });

  // 加载收藏列表
  useEffect(() => {
    const favs = localStorage.getItem('silkscreen-favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  // 执行搜索
  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setIsLoading(true);
        // 模拟搜索延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        const searchResults = searchSilkscreen(query);
        setResults(searchResults);
        setIsLoading(false);
      };

      performSearch();
    } else {
      setIsLoading(false);
    }
  }, [query]);

  // 处理返回
  const handleBack = () => {
    router.push('/silkscreen');
  };

  // 收藏功能
  const toggleFavorite = (partNumber: string) => {
    const newFavorites = favorites.includes(partNumber)
      ? favorites.filter(f => f !== partNumber)
      : [...favorites, partNumber];
    setFavorites(newFavorites);
    localStorage.setItem('silkscreen-favorites', JSON.stringify(newFavorites));
  };

  // 简化分类名称
  const simplifyCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'Buck降压开关稳压器': '降压稳压器',
      '采用分离开关稳压器(DC/DC转换器)': 'DC/DC转换器',
      '运算放大器': '运算放大器',
      '负载开关': '负载开关',
      '电源管理 → LDO稳压器': 'LDO稳压器',
      '模拟器件 → 运算放大器': '运算放大器',
      '电源管理 → 降压转换器': '降压转换器',
      '模拟器件 → 定时器': '定时器',
      '数字逻辑 → 移位寄存器': '移位寄存器',
      '电源管理 → 可调稳压器': '可调稳压器'
    };

    return categoryMap[category] || category;
  };

  // 生成筛选选项
  const getFilterOptions = () => {
    const manufacturers = [...new Set(results.map(item => item.manufacturer))].sort();
    const categories = [...new Set(results.map(item => simplifyCategory(item.category)))].sort();
    const packages = [...new Set(results.map(item => item.package))].sort();

    return { manufacturers, categories, packages };
  };

  // 应用筛选
  const filteredResults = results.filter(item => {
    if (filters.manufacturer && item.manufacturer !== filters.manufacturer) return false;
    if (filters.category && simplifyCategory(item.category) !== filters.category) return false;
    if (filters.package && item.package !== filters.package) return false;
    return true;
  });

  // 重置筛选
  const resetFilters = () => {
    setFilters({
      manufacturer: '',
      category: '',
      package: ''
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">正在识别丝印 "{query}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">
            丝印反查结果
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 lg:px-8">

        {/* 搜索结果 */}
        {results.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                丝印 "<span className="text-blue-600 dark:text-blue-400">{query}</span>" 找到 {results.length} 个结果
                {filteredResults.length !== results.length && (
                  <span className="text-gray-500 dark:text-gray-400">
                    ，筛选后 {filteredResults.length} 个
                  </span>
                )}
              </h3>
            </div>

            {/* 筛选栏 */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/30 p-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* 品牌筛选 */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">品牌:</label>
                  <select
                    value={filters.manufacturer}
                    onChange={(e) => setFilters(prev => ({ ...prev, manufacturer: e.target.value }))}
                    className="w-32 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部</option>
                    {getFilterOptions().manufacturers.map(manufacturer => (
                      <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                    ))}
                  </select>
                </div>

                {/* 分类筛选 */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">分类:</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-32 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部</option>
                    {getFilterOptions().categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* 封装筛选 */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">封装:</label>
                  <select
                    value={filters.package}
                    onChange={(e) => setFilters(prev => ({ ...prev, package: e.target.value }))}
                    className="w-32 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">全部</option>
                    {getFilterOptions().packages.map(packageType => (
                      <option key={packageType} value={packageType}>{packageType}</option>
                    ))}
                  </select>
                </div>

                {/* 重置按钮 */}
                {(filters.manufacturer || filters.category || filters.package) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    重置筛选
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              {filteredResults.map((item) => (
                <div key={item.id} className="card-enhanced bg-white dark:bg-gray-800 p-3 animate-delay-100">
                  <div className="flex items-start gap-3">
                    {/* 产品图片 */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mb-1">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.partNumber}
                            width={64}
                            height={64}
                            className="object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Cpu className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      {/* 品牌标识 */}
                      <div className="text-center">
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {item.manufacturer}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {item.partNumber}
                            </h1>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full border border-blue-200 dark:border-blue-700">
                              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">丝印: {item.silkscreen}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
                            {item.description}
                          </p>
                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {/* 封装信息 - 毛玻璃橘黄色卡片 */}
                            <div className="flex items-center gap-2">
                              <span>封装:</span>
                              <div className="px-2 py-0.5 bg-orange-500/10 dark:bg-orange-400/10 backdrop-blur-sm border border-orange-200/50 dark:border-orange-400/30 rounded-full text-orange-700 dark:text-orange-300 font-medium text-xs shadow-sm">
                                {item.package}
                              </div>
                              <span>引脚:</span>
                              <div className="px-2 py-0.5 bg-orange-500/10 dark:bg-orange-400/10 backdrop-blur-sm border border-orange-200/50 dark:border-orange-400/30 rounded-full text-orange-700 dark:text-orange-300 font-medium text-xs shadow-sm">
                                {item.pins}
                              </div>
                            </div>
                            <div>分类: <span className="font-medium text-gray-900 dark:text-gray-100">{item.category}</span></div>
                          </div>
                        </div>

                        {/* 数据手册按钮组 - 右上角垂直排列 */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0 ml-3">
                          {/* 数据手册按钮 - 红色主题 */}
                          {item.datasheetUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/30 hover:-translate-y-0.5 px-2 py-1 h-auto min-w-[60px] backdrop-blur-sm"
                              onClick={() => {
                                if (item.datasheetUrl) {
                                  window.open(item.datasheetUrl, '_blank');
                                }
                              }}
                              title="查看数据手册"
                            >
                              <Download className="h-3 w-3" />
                              <span className="text-xs ml-1 font-medium">数据手册</span>
                            </Button>
                          )}

                          {/* 收藏按钮 */}
                          <Button
                            variant="outline"
                            size="sm"
                            className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 px-2 py-1 h-auto min-w-[60px] backdrop-blur-sm ${
                              favorites.includes(item.partNumber)
                                ? 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-950/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:border-yellow-300 dark:hover:border-yellow-600 hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30'
                                : 'text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-950/20 hover:bg-gray-100 dark:hover:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-gray-200/50 dark:hover:shadow-gray-900/30'
                            }`}
                            onClick={() => toggleFavorite(item.partNumber)}
                            title={favorites.includes(item.partNumber) ? '取消收藏' : '添加收藏'}
                          >
                            <Star className={`h-3 w-3 ${favorites.includes(item.partNumber) ? 'fill-current' : ''}`} />
                            <span className="text-xs ml-1 font-medium">收藏</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 筛选后无结果 */}
            {filteredResults.length === 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Cpu className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    筛选条件下无匹配结果
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    当前筛选条件下没有找到匹配的产品。
                    <br />
                    请尝试调整筛选条件或重置筛选。
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="border-2 rounded-xl px-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      重置筛选
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 无结果 */
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Cpu className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                未找到匹配结果
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                未匹配到丝印 "<span className="font-bold text-blue-600 dark:text-blue-400">{query}</span>" 的结果。
                <br />
                请尝试修改输入内容或返回重新搜索。
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-2 rounded-xl px-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  重新搜索
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SilkscreenResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><LoadingSpinner /></div>}>
      <SilkscreenResultsContent />
    </Suspense>
  );
}
