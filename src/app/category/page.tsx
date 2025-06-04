"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { buckConverterFilterData, placeholderChips } from '@/lib/placeholder-data';
import { useCategoryFilter, type FilterDimension } from '@/hooks/use-category-filter';
import ProductListItem from '@/components/category/product-list-item';
import { Chip } from '@/lib/types';

export default function CategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 从URL参数获取分类信息
  const categoryName = searchParams.get('name') || '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器';
  const categoryDescription = searchParams.get('description') || 'Buck(降压)开关稳压器';

  // 检测是否为Buck分类
  const isBuckCategory = categoryName.includes('Buck(降压)开关稳压器');

  // 获取Buck分类下的产品
  const getBuckProducts = (): Chip[] => {
    return placeholderChips.filter(chip =>
      chip.category?.includes('Buck(降压)开关稳压器')
    );
  };

  const buckProducts = getBuckProducts();

  // 使用筛选Hook
  const {
    filterState,
    updateBrandFilter,
    updatePackageFilter,
    updateParameterFilter,
    updateSearchQuery,
    resetFilters,
    isBrandSelected,
    isPackageSelected,
    isParameterSelected,
    getSelectedFiltersCount,
    getFilterSummary,
    generateSearchParams
  } = useCategoryFilter();

  // 当前激活的筛选维度
  const [activeFilter, setActiveFilter] = useState<FilterDimension | null>(null);

  // 搜索输入状态
  const [searchInput, setSearchInput] = useState('');

  // 处理搜索
  const handleSearch = () => {
    updateSearchQuery(searchInput);
  };

  // 查看结果
  const viewResults = () => {
    const searchParams = generateSearchParams(categoryName);
    router.push(`/search?${searchParams}`);
  };

  // 切换筛选维度
  const toggleFilter = (dimension: FilterDimension) => {
    setActiveFilter(activeFilter === dimension ? null : dimension);
  };

  // 清除特定筛选条件
  const clearFilter = (type: FilterDimension, value?: string) => {
    if (type === 'brand' && value) {
      updateBrandFilter(value, false);
    } else if (type === 'package' && value) {
      updatePackageFilter(value, false);
    }
  };

  // 获取选中的筛选条件总数
  const selectedCount = getSelectedFiltersCount();

  // 筛选Buck产品
  const getFilteredBuckProducts = (): Chip[] => {
    if (!isBuckCategory) return [];

    let filtered = buckProducts;

    // 品牌筛选
    if (filterState.selectedBrand.length > 0) {
      filtered = filtered.filter(chip =>
        filterState.selectedBrand.some(brand =>
          chip.manufacturer.includes(brand.replace(/\(.*\)/, '').trim())
        )
      );
    }

    // 封装筛选
    if (filterState.selectedPackage.length > 0) {
      filtered = filtered.filter(chip =>
        chip.packageTypes?.some(pkg =>
          filterState.selectedPackage.includes(pkg)
        )
      );
    }

    // 搜索关键词筛选
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(chip =>
        chip.model.toLowerCase().includes(query) ||
        chip.description.toLowerCase().includes(query) ||
        chip.manufacturer.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredBuckProducts = getFilteredBuckProducts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {categoryDescription}
            </h1>
          </div>
        </div>
      </div>

      {/* 筛选结果计数 */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          筛选结果：共 <span className="text-blue-600 font-medium">{filterState.resultCount.toLocaleString()}+</span> 个型号
        </p>
      </div>

      {/* 筛选标签 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => toggleFilter('brand')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-r border-gray-200 dark:border-gray-700 transition-colors relative ${
              activeFilter === 'brand'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            品牌 {activeFilter === 'brand' ? '↑' : '↓'}
            {filterState.selectedBrand.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                {filterState.selectedBrand.length}
              </Badge>
            )}
          </button>
          <button
            onClick={() => toggleFilter('package')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-r border-gray-200 dark:border-gray-700 transition-colors relative ${
              activeFilter === 'package'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            封装 {activeFilter === 'package' ? '↑' : '↓'}
            {filterState.selectedPackage.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                {filterState.selectedPackage.length}
              </Badge>
            )}
          </button>
          <button
            onClick={() => toggleFilter('parameter')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
              activeFilter === 'parameter'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            参数 {activeFilter === 'parameter' ? '↑' : '↓'}
            {Object.keys(filterState.selectedParameters).length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                {Object.values(filterState.selectedParameters).reduce((total, values) => total + values.length, 0)}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* 已选择的筛选条件显示 */}
      {selectedCount > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700 p-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filterState.selectedBrand.map((brand) => (
                <Badge
                  key={brand}
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                >
                  {brand}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter('brand', brand)}
                  />
                </Badge>
              ))}
              {filterState.selectedPackage.map((pkg) => (
                <Badge
                  key={pkg}
                  variant="secondary"
                  className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                >
                  {pkg}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => clearFilter('package', pkg)}
                  />
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              清除全部
            </Button>
          </div>
        </div>
      )}



      {/* 筛选选项区域 */}
      {activeFilter && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {activeFilter === 'brand' && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {buckConverterFilterData.brands.map((brand) => (
                  <div
                    key={brand}
                    onClick={() => updateBrandFilter(brand, !isBrandSelected(brand))}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      isBrandSelected(brand)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-sm font-medium">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFilter === 'package' && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {buckConverterFilterData.packages.map((pkg) => (
                  <div
                    key={pkg}
                    onClick={() => updatePackageFilter(pkg, !isPackageSelected(pkg))}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      isPackageSelected(pkg)
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-sm font-medium">{pkg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFilter === 'parameter' && (
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(buckConverterFilterData.parameters).map(([category, config]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {config.options.map((option) => (
                      <div
                        key={option}
                        onClick={() => updateParameterFilter(category, option, !isParameterSelected(category, option))}
                        className={`p-2 rounded-md border text-center cursor-pointer transition-all ${
                          isParameterSelected(category, option)
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="text-xs">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 搜索框 - 在Buck分类下显示 */}
      {isBuckCategory && (
        <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Input
              type="text"
              placeholder="请输入关键词"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-12 h-12 text-base"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-1 top-1 h-10 w-10 p-0 bg-orange-500 hover:bg-orange-600"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Buck分类产品列表 */}
      {isBuckCategory && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                产品列表 ({filteredBuckProducts.length})
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                共找到 {filteredBuckProducts.length} 个产品
              </div>
            </div>

            {filteredBuckProducts.length > 0 ? (
              <div className="space-y-0">
                {filteredBuckProducts.map((chip) => (
                  <ProductListItem key={chip.id} chip={chip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>没有找到符合条件的产品</p>
                <p className="text-sm mt-2">请尝试调整筛选条件</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 底部操作按钮 - 只在非Buck分类时显示 */}
      {!isBuckCategory && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <Button
            onClick={viewResults}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            查看 {filterState.resultCount.toLocaleString()}+ 个型号
          </Button>
        </div>
      )}

      {/* 底部固定信息 */}
      <div className={`bg-gray-100 dark:bg-gray-800 p-4 ${isBuckCategory ? 'mb-4' : 'mb-20'}`}>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium">分类路径：</span>
            <span className="text-xs">{categoryName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">当前分类：</span>
            <span>{categoryDescription}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🔍</span>
              <span className="font-medium">筛选条件</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-600 font-medium">已选: {getSelectedFiltersCount()}个</span>
              {getSelectedFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-red-600 hover:text-red-800 p-1 h-auto"
                >
                  清除
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
