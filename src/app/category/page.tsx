"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, Filter, ChevronUp, ChevronDown, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { placeholderChips, buckConverterThreeLevelData } from '@/lib/placeholder-data';
import ThreeLevelFilter, { FilterSelections } from '@/components/category/three-level-filter';
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

  // 三级筛选的选择状态
  const [threeLevelSelections, setThreeLevelSelections] = useState<FilterSelections>({
    brand: { region: [], manufacturer: [] },
    package: { type: [], size: [], pins: [] },
    parameters: {
      application: {},
      topology: {},
      electrical: {},
      special: {},
      protection: {}
    }
  });

  // 获取当前分类下的产品
  const getCategoryProducts = (): Chip[] => {
    if (isBuckCategory) {
      return placeholderChips.filter(chip =>
        chip.category?.includes('Buck(降压)开关稳压器')
      );
    }

    // 对于其他分类，根据分类描述进行匹配
    return placeholderChips.filter(chip => {
      if (!chip.category) return false;

      // 尝试匹配分类描述
      const categoryLower = chip.category.toLowerCase();
      const descriptionLower = categoryDescription.toLowerCase();

      // 精确匹配
      if (categoryLower.includes(descriptionLower)) return true;

      // 部分匹配常见分类
      if (descriptionLower.includes('微控制器') && categoryLower.includes('mcu')) return true;
      if (descriptionLower.includes('32位') && categoryLower.includes('32位')) return true;
      if (descriptionLower.includes('ldo') && categoryLower.includes('ldo')) return true;
      if (descriptionLower.includes('运算放大器') && categoryLower.includes('放大器')) return true;

      return false;
    });
  };

  const categoryProducts = getCategoryProducts();

  // 搜索查询状态
  const [searchQuery, setSearchQuery] = useState('');

  // 筛选面板显示状态
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // 基于三级筛选和搜索的产品筛选逻辑
  const getFilteredProducts = (): Chip[] => {
    let filtered = categoryProducts;

    // 搜索关键词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(chip =>
        chip.model.toLowerCase().includes(query) ||
        chip.description.toLowerCase().includes(query) ||
        chip.manufacturer.toLowerCase().includes(query)
      );
    }

    // 根据三级筛选条件进行筛选
    // 这里可以根据 threeLevelSelections 的值来筛选产品
    // 暂时返回搜索结果，后续可以根据具体需求实现筛选逻辑

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // 筛选面板控制函数
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  // 计算已选择的筛选条件总数
  const getTotalSelectedCount = (): number => {
    const brandCount = threeLevelSelections.brand.region.length + threeLevelSelections.brand.manufacturer.length;
    const packageCount = threeLevelSelections.package.type.length + threeLevelSelections.package.size.length + threeLevelSelections.package.pins.length;
    const parameterCount = Object.values(threeLevelSelections.parameters).reduce((total, category) =>
      total + Object.values(category).reduce((sum, arr) => sum + arr.length, 0), 0);
    return brandCount + packageCount + parameterCount;
  };

  // 重置所有筛选条件
  const resetAllFilters = () => {
    setThreeLevelSelections({
      brand: { region: [], manufacturer: [] },
      package: { type: [], size: [], pins: [] },
      parameters: {
        application: {},
        topology: {},
        electrical: {},
        special: {},
        protection: {}
      }
    });
    setSearchQuery('');
  };

  // 处理筛选条件变化
  const handleFilterChange = (selections: FilterSelections) => {
    setThreeLevelSelections(selections);
  };

  // 删除特定品牌筛选
  const removeBrandFilter = (brand: string, type: 'region' | 'manufacturer') => {
    const newSelections = { ...threeLevelSelections };
    newSelections.brand[type] = newSelections.brand[type].filter(item => item !== brand);
    setThreeLevelSelections(newSelections);
  };

  // 删除特定封装筛选
  const removePackageFilter = (pkg: string, type: 'type' | 'size' | 'pins') => {
    const newSelections = { ...threeLevelSelections };
    newSelections.package[type] = newSelections.package[type].filter(item => item !== pkg);
    setThreeLevelSelections(newSelections);
  };

  const totalSelectedCount = getTotalSelectedCount();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {categoryDescription}
            </h1>
          </div>
        </div>
      </div>

      {/* 筛选控制栏 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={isFilterPanelOpen ? "default" : "outline"}
              onClick={toggleFilterPanel}
              className="flex items-center gap-1.5 text-sm px-3 py-1.5"
              size="sm"
            >
              <Filter className="h-3.5 w-3.5" />
              筛选
              {isFilterPanelOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>

            <Button
              variant="ghost"
              onClick={resetAllFilters}
              className="text-gray-600 dark:text-gray-400 text-sm px-2 py-1.5"
              size="sm"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              重置
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              已选: <span className="font-medium text-blue-600">{totalSelectedCount}</span>
            </span>
            {totalSelectedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={resetAllFilters} className="p-1">
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 已选择的筛选条件标签 */}
      {totalSelectedCount > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 px-3 py-2">
          <div className="flex flex-wrap gap-1.5">
            {/* 品牌地域标签 */}
            {threeLevelSelections.brand.region.map(region => (
              <Badge key={region} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5">
                🌍 {region}
                <X className="ml-1 h-2.5 w-2.5 cursor-pointer" onClick={() => removeBrandFilter(region, 'region')} />
              </Badge>
            ))}

            {/* 品牌厂商标签 */}
            {threeLevelSelections.brand.manufacturer.map(brand => (
              <Badge key={brand} variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5">
                🏢 {brand}
                <X className="ml-1 h-2.5 w-2.5 cursor-pointer" onClick={() => removeBrandFilter(brand, 'manufacturer')} />
              </Badge>
            ))}

            {/* 封装类型标签 */}
            {threeLevelSelections.package.type.map(pkg => (
              <Badge key={pkg} variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5">
                📦 {pkg}
                <X className="ml-1 h-2.5 w-2.5 cursor-pointer" onClick={() => removePackageFilter(pkg, 'type')} />
              </Badge>
            ))}

            {/* 封装尺寸标签 */}
            {threeLevelSelections.package.size.map(size => (
              <Badge key={size} variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5">
                📐 {size}
                <X className="ml-1 h-2.5 w-2.5 cursor-pointer" onClick={() => removePackageFilter(size, 'size')} />
              </Badge>
            ))}

            {/* 封装引脚标签 */}
            {threeLevelSelections.package.pins.map(pins => (
              <Badge key={pins} variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5">
                📌 {pins}引脚
                <X className="ml-1 h-2.5 w-2.5 cursor-pointer" onClick={() => removePackageFilter(pins, 'pins')} />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* 可折叠的筛选面板 */}
      {isFilterPanelOpen && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 px-3 py-2">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              💡 选择筛选条件来精确查找您需要的产品
            </p>
          </div>

          {/* 三级筛选组件 */}
          <ThreeLevelFilter
            data={buckConverterThreeLevelData}
            onSelectionChange={handleFilterChange}
          />
        </div>
      )}

      {/* 筛选结果统计和搜索框 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            筛选结果: 共 <span className="font-medium text-blue-600">{filteredProducts.length}</span> 个产品
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {isFilterPanelOpen ? '收起筛选面板' : '展开筛选面板'}
          </span>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            type="search"
            placeholder="在当前分类中搜索芯片型号..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 text-sm h-8 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-800 rounded-lg font-medium text-gray-700 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* 当前分类产品列表 */}
      {categoryProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                产品列表 ({filteredProducts.length})
              </h3>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="space-y-0">
                {filteredProducts.map((chip) => (
                  <ProductListItem key={chip.id} chip={chip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p className="text-sm">没有找到符合条件的产品</p>
                <p className="text-xs mt-1">请尝试调整筛选条件</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 底部间距 */}
      <div className="pb-4"></div>
    </div>
  );
}
