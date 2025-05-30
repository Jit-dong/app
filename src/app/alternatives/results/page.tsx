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
import ChipInfoDisplay from "@/components/shared/chip-info-display";
import OrderingDetailsLayout from "@/components/shared/ordering-details-layout";
import AlternativePartsTable from "@/components/shared/alternative-parts-table";

export default function AlternativeResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchResult, setSearchResult] = useState<AlternativeSearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [alternativeParts, setAlternativeParts] = useState<any[]>([]);

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

          {/* 标题区域 */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-orange-200/60 dark:border-gray-700/50 p-4 shadow-lg shadow-orange-100/50 dark:shadow-gray-900/20">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
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



        {/* 筛选器 - 移动端优化 */}
        {searchResult &&
         searchResult.orderDetails.length > 3 &&
         !(searchResult.isExactMatch && searchResult.orderDetails.length === searchResult.totalAlternatives) && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-orange-200/60 dark:border-gray-700/50 p-3 mb-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">筛选条件</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="px-2 py-1.5 text-xs border border-orange-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {packages.map(pkg => (
                    <option key={pkg} value={pkg}>封装: {pkg}</option>
                  ))}
                </select>

                <select
                  value={selectedPins}
                  onChange={(e) => setSelectedPins(e.target.value)}
                  className="px-2 py-1.5 text-xs border border-orange-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {pins.map(pin => (
                    <option key={pin} value={pin}>管脚: {pin}</option>
                  ))}
                </select>

                <select
                  value={selectedTemp}
                  onChange={(e) => setSelectedTemp(e.target.value)}
                  className="px-2 py-1.5 text-xs border border-orange-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {temps.map(temp => (
                    <option key={temp} value={temp}>温度: {temp}</option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs h-8 bg-orange-50 dark:bg-gray-700 border-orange-200 dark:border-gray-600 hover:bg-orange-100 dark:hover:bg-gray-600"
                >
                  重置
                </Button>
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
              <AlternativePartsTable
                parts={alternativeParts}
                originalPart={query}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
