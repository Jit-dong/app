"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Download, Cpu } from 'lucide-react';
import { searchSilkscreen, type SilkscreenData } from '@/lib/placeholder-data';
import Image from 'next/image';
import LoadingSpinner from '@/components/shared/loading-spinner';

function SilkscreenResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<SilkscreenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 筛选状态
  const [filters, setFilters] = useState({
    manufacturer: '',
    category: '',
    package: ''
  });



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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-3 py-6 md:px-6 lg:px-8">
        {/* 返回按钮 - 移动端优化 */}
        <div className="mb-4">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/20 p-2 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回</span>
          </Button>
        </div>

        {/* 标题区域 - 美化设计 */}
        <div className="bg-gradient-to-r from-white/95 to-orange-50/90 dark:from-gray-800/95 dark:to-orange-900/20 backdrop-blur-sm rounded-2xl border border-orange-200/60 dark:border-gray-700/50 p-5 shadow-xl shadow-orange-100/30 dark:shadow-gray-900/20 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🔍</span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1 leading-tight">
                丝印 "{query}" 的查找结果
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {results.length > 0 ? (
                  <>找到 {results.length} 个匹配结果{filteredResults.length !== results.length && (
                    <span>，筛选后 {filteredResults.length} 个</span>
                  )}</>
                ) : '未找到匹配结果'}
              </p>
            </div>
          </div>

          {/* 查询类型指示器 */}
          {results.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                🎯 丝印匹配
              </div>
              <div className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-xs font-medium">
                ⚡ 实时数据
              </div>
            </div>
          )}
        </div>

        {/* 搜索结果 */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {/* 筛选器 - 美化设计 */}
            {results.length > 3 && (
              <div className="bg-gradient-to-r from-white/90 to-blue-50/80 dark:from-gray-800/90 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-gray-700/50 p-4 shadow-xl shadow-blue-100/30 dark:shadow-gray-900/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      智能筛选
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      快速找到符合需求的芯片
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 品牌筛选 */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      品牌
                    </label>
                    <select
                      value={filters.manufacturer}
                      onChange={(e) => setFilters(prev => ({ ...prev, manufacturer: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                    >
                      <option value="">全部品牌</option>
                      {getFilterOptions().manufacturers.map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                      ))}
                    </select>
                  </div>

                  {/* 分类筛选 */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      分类
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                    >
                      <option value="">全部分类</option>
                      {getFilterOptions().categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* 封装筛选 */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      封装
                    </label>
                    <select
                      value={filters.package}
                      onChange={(e) => setFilters(prev => ({ ...prev, package: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                    >
                      <option value="">全部封装</option>
                      {getFilterOptions().packages.map(packageType => (
                        <option key={packageType} value={packageType}>{packageType}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 筛选结果统计和重置 */}
                <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      筛选结果: <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredResults.length}</span> 个芯片
                    </span>
                    {(filters.manufacturer || filters.category || filters.package) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
                        className="text-xs bg-orange-50 dark:bg-gray-700 border-orange-200 dark:border-gray-600 hover:bg-orange-100 dark:hover:bg-gray-600 text-orange-600 dark:text-orange-400"
                      >
                        🔄 清除筛选
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

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

                        {/* 数据手册按钮 - 右上角 */}
                        <div className="flex-shrink-0 ml-3">
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
