"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertCircle,
  Filter
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

  // 筛选状态 - 针对订购详情
  const [selectedPackage, setSelectedPackage] = useState<string>('全部');
  const [selectedPins, setSelectedPins] = useState<string>('全部');
  const [selectedTemp, setSelectedTemp] = useState<string>('全部');

  // 搜索逻辑
  useEffect(() => {
    if (query) {
      setLoading(true);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6">
        {/* 页面头部 - 移动端优化 */}
        <div className="mb-4">
          {/* 返回按钮 */}
          <div className="mb-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2 h-9 px-3 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-orange-200 dark:border-gray-600 hover:bg-orange-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              返回
            </Button>
          </div>

          {/* 标题区域 - 美化设计 */}
          <div className="bg-gradient-to-r from-white/95 to-orange-50/90 dark:from-gray-800/95 dark:to-orange-900/20 backdrop-blur-sm rounded-2xl border border-orange-200/60 dark:border-gray-700/50 p-5 shadow-xl shadow-orange-100/30 dark:shadow-gray-900/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🔍</span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1 leading-tight">
                  "{query}" 的替代方案
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {searchResult?.chip ? (
                    searchResult.orderDetails.length === 1
                      ? `找到 1 个具体型号，共有 ${alternativeParts.length} 个替代料`
                      : `找到 ${filteredOrderDetails.length} 个替代选择`
                  ) : '未找到匹配结果'}
                </p>
              </div>
            </div>

            {/* 查询类型指示器 */}
            {searchResult?.chip && (
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  searchResult.orderDetails.length === 1
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {searchResult.orderDetails.length === 1 ? '🎯 精确匹配' : '📦 系列查询'}
                </div>
                <div className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-xs font-medium">
                  ⚡ 实时数据
                </div>
              </div>
            )}
          </div>
        </div>



        {/* 筛选器 - 美化设计 */}
        {searchResult &&
         searchResult.orderDetails.length > 3 &&
         !(searchResult.isExactMatch && searchResult.orderDetails.length === searchResult.totalAlternatives) && (
          <div className="bg-gradient-to-r from-white/95 to-blue-50/90 dark:from-gray-800/95 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/60 dark:border-gray-700/50 p-5 mb-6 shadow-xl shadow-blue-100/30 dark:shadow-gray-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                <Filter className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  智能筛选
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  快速找到符合需求的型号
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  封装类型
                </label>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 hover:border-orange-300"
                >
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg}>{pkg === '全部' ? '全部封装' : pkg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  管脚数量
                </label>
                <select
                  value={selectedPins}
                  onChange={(e) => setSelectedPins(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-green-300"
                >
                  {pins.map(pin => (
                    <option key={pin} value={pin}>{pin === '全部' ? '全部管脚' : `${pin} 管脚`}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  工作温度
                </label>
                <select
                  value={selectedTemp}
                  onChange={(e) => setSelectedTemp(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-purple-300"
                >
                  {temps.map(temp => (
                    <option key={temp} value={temp}>{temp === '全部' ? '全部温度' : temp}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 筛选结果统计和重置 */}
            <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  筛选结果: <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredOrderDetails.length}</span> 个型号
                </span>
                {(selectedPackage !== '全部' || selectedPins !== '全部' || selectedTemp !== '全部') && (
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

        {/* 结果内容 - 移动端优化 */}
        {!searchResult || !searchResult.chip ? (
          <div className="text-center py-8">
            <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              未找到匹配的替代方案
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              请尝试调整搜索条件或检查型号是否正确
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 芯片信息展示 - 只在查询父型号时显示，查询子型号时不显示 */}
            {searchResult.orderDetails.length > 1 && (
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
