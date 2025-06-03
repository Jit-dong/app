"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertCircle,
  Filter,
  Search
} from "lucide-react";
import { searchAlternatives, type AlternativeSearchResult, findAlternativePartsByOrderModel } from "@/lib/placeholder-data";
import type { AlternativePart } from "@/lib/types";
import ChipInfoDisplay from "@/components/shared/chip-info-display";
import OrderingDetailsLayout from "@/components/shared/ordering-details-layout";
import AlternativePartsTable from "@/components/shared/alternative-parts-table";
import AlternativePartsFiltered from "@/components/shared/alternative-parts-filtered";
import PartComparisonModal from "@/components/shared/part-comparison-modal";

export default function AlternativeResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchResult, setSearchResult] = useState<AlternativeSearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [alternativeParts, setAlternativeParts] = useState<any[]>([]);
  const [comparisonPart, setComparisonPart] = useState<AlternativePart | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // 搜索框相关状态
  const [searchInput, setSearchInput] = useState(query || "");
  const [isSearching, setIsSearching] = useState(false);

  // 筛选状态 - 针对订购详情
  const [selectedPackage, setSelectedPackage] = useState<string>('全部');
  const [selectedPins, setSelectedPins] = useState<string>('全部');
  const [selectedTemp, setSelectedTemp] = useState<string>('全部');

  // 搜索逻辑
  useEffect(() => {
    if (query) {
      setLoading(true);
      setIsSearching(false); // 重置搜索状态
      setSearchInput(query); // 更新搜索框的值

      // 模拟API调用延迟
      setTimeout(() => {
        const result = searchAlternatives(query);
        setSearchResult(result);

        // 如果是单个订购型号查询，获取替代料信息
        if (result && result.orderDetails.length === 1) {
          const alternatives = findAlternativePartsByOrderModel(query);
          setAlternativeParts(alternatives);
        } else {
          setAlternativeParts([]);
        }

        setLoading(false);
      }, 500);
    }
  }, [query]);

  // 获取筛选选项
  const packages = searchResult?.orderDetails
    ? ['全部', ...Array.from(new Set(searchResult.orderDetails.map(order => order.package)))]
    : ['全部'];

  const pins = searchResult?.orderDetails
    ? ['全部', ...Array.from(new Set(searchResult.orderDetails.map(order => order.pins?.toString() || '未知').filter(Boolean)))]
    : ['全部'];

  const temps = searchResult?.orderDetails
    ? ['全部', ...Array.from(new Set(searchResult.orderDetails.map(order => order.workTemp)))]
    : ['全部'];

  // 应用筛选
  const filteredOrderDetails = searchResult?.orderDetails.filter(order => {
    if (selectedPackage !== '全部' && order.package !== selectedPackage) return false;
    if (selectedPins !== '全部' && order.pins?.toString() !== selectedPins) return false;
    if (selectedTemp !== '全部' && order.workTemp !== selectedTemp) return false;
    return true;
  }) || [];

  // 重置筛选
  const resetFilters = () => {
    setSelectedPackage('全部');
    setSelectedPins('全部');
    setSelectedTemp('全部');
  };

  // 处理搜索功能
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      // 更新URL参数并触发重新搜索
      router.push(`/alternatives/results?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  // 处理对比功能
  const handleCompare = (part: AlternativePart) => {
    setComparisonPart(part);
    setShowComparison(true);
  };

  const handleCloseComparison = () => {
    setShowComparison(false);
    setComparisonPart(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">正在搜索替代方案...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-2 py-2 sm:px-3 sm:py-3">
        {/* 页面头部 - 极致紧凑 */}
        <div className="mb-2">
          {/* 返回按钮 */}
          <div className="mb-1">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-1 h-7 px-2 text-xs bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-3 w-3" />
              返回
            </Button>
          </div>

          {/* 搜索框 - 更大更易用 */}
          <div className="mb-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="搜索其他型号的替代料..."
                  className="w-full pl-10 pr-20 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                  disabled={isSearching}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSearching || !searchInput.trim()}
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 h-7 px-3 text-sm bg-orange-500 hover:bg-orange-600 text-white border-0"
                >
                  {isSearching ? '搜索中...' : '搜索'}
                </Button>
              </div>
            </form>
          </div>


        </div>



        {/* 筛选器 - 极致紧凑 */}
        {searchResult &&
         searchResult.orderDetails.length > 3 &&
         !(searchResult.isExactMatch && searchResult.orderDetails.length === searchResult.totalAlternatives) && (
          <div className="bg-gradient-to-r from-white/95 to-blue-50/90 dark:from-gray-800/95 dark:to-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-200/60 dark:border-gray-700/50 p-2 mb-2 shadow-md shadow-blue-100/30 dark:shadow-gray-900/20">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center shadow-md">
                <Filter className="h-2.5 w-2.5 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                  智能筛选
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                  快速找到符合需求的型号
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-0.5">
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                  封装
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-1.5 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                >
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg}>{pkg === '全部' ? '全部' : pkg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-0.5">
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  管脚
                </label>
                <select
                  value={selectedPins}
                  onChange={(e) => setSelectedPins(e.target.value)}
                  className="w-full px-1.5 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                >
                  {pins.map(pin => (
                    <option key={pin} value={pin}>{pin === '全部' ? '全部' : `${pin}P`}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-0.5">
                <label className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  温度
                </label>
                <select
                  value={selectedTemp}
                  onChange={(e) => setSelectedTemp(e.target.value)}
                  className="w-full px-1.5 py-1 text-xs border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                >
                  {temps.map(temp => (
                    <option key={temp} value={temp}>{temp === '全部' ? '全部' : temp}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 筛选结果统计和重置 */}
            <div className="mt-2 pt-1.5 border-t border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  结果: <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredOrderDetails.length}</span> 个
                </span>
                {(selectedPackage !== '全部' || selectedPins !== '全部' || selectedTemp !== '全部') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs h-5 px-1.5 bg-orange-50 dark:bg-gray-700 border-orange-200 dark:border-gray-600 hover:bg-orange-100 dark:hover:bg-gray-600 text-orange-600 dark:text-orange-400"
                  >
                    清除
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 结果内容 - 极致紧凑 */}
        {!searchResult || !searchResult.chip ? (
          <div className="text-center py-4">
            <AlertCircle className="h-6 w-6 text-gray-400 mx-auto mb-1" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
              未找到匹配的替代方案
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              请尝试调整搜索条件或检查型号是否正确
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* 芯片信息展示 - 始终显示父型号信息 */}
            {searchResult.chip && (
              <ChipInfoDisplay
                chip={{
                  ...searchResult.chip,
                  displayManufacturer: searchResult.chip.manufacturer,
                  displayCategory: searchResult.chip.category || '电源管理芯片',
                  displayDescription: searchResult.chip.description
                }}
                showDatasheetButtons={true}
                compact={true}
              />
            )}

            {/* 订购详情 - 使用与芯片详情页一致的布局 */}
            {filteredOrderDetails.length > 0 && (
              <OrderingDetailsLayout
                orderDetails={filteredOrderDetails}
                title={searchResult.orderDetails.length === 1 ? "当前产品订购详情" : "替代方案订购详情"}
                showImage={searchResult.orderDetails.length === 1}
              />
            )}

            {/* 替代料信息 - 仅在查询单个订购型号时显示 */}
            {searchResult.orderDetails.length === 1 && alternativeParts.length > 0 && (
              <AlternativePartsFiltered
                parts={alternativeParts}
                originalPart={query}
                onCompare={handleCompare}
              />
            )}
          </div>
        )}

        {/* 对比模态框 */}
        {comparisonPart && (
          <PartComparisonModal
            originalPart={query}
            alternativePart={comparisonPart}
            isOpen={showComparison}
            onClose={handleCloseComparison}
          />
        )}
      </div>
    </div>
  );
}
