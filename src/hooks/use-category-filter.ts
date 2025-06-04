"use client";

import { useState, useCallback } from 'react';

// 筛选状态接口
export interface CategoryFilterState {
  selectedBrand: string[];
  selectedPackage: string[];
  selectedParameters: Record<string, string[]>;
  searchQuery: string;
  resultCount: number;
}

// 筛选维度类型
export type FilterDimension = 'brand' | 'package' | 'parameter';

// 参数筛选类型
export interface ParameterFilter {
  category: string;
  value: string;
}

// 初始状态
const initialState: CategoryFilterState = {
  selectedBrand: [],
  selectedPackage: [],
  selectedParameters: {},
  searchQuery: '',
  resultCount: 10000
};

export function useCategoryFilter() {
  const [filterState, setFilterState] = useState<CategoryFilterState>(initialState);

  // 更新品牌筛选
  const updateBrandFilter = useCallback((brand: string, checked: boolean) => {
    setFilterState(prev => {
      const newSelectedBrand = checked
        ? [...prev.selectedBrand, brand]
        : prev.selectedBrand.filter(item => item !== brand);
      
      return {
        ...prev,
        selectedBrand: newSelectedBrand,
        resultCount: calculateResultCount(newSelectedBrand, prev.selectedPackage, prev.selectedParameters)
      };
    });
  }, []);

  // 更新封装筛选
  const updatePackageFilter = useCallback((packageType: string, checked: boolean) => {
    setFilterState(prev => {
      const newSelectedPackage = checked
        ? [...prev.selectedPackage, packageType]
        : prev.selectedPackage.filter(item => item !== packageType);
      
      return {
        ...prev,
        selectedPackage: newSelectedPackage,
        resultCount: calculateResultCount(prev.selectedBrand, newSelectedPackage, prev.selectedParameters)
      };
    });
  }, []);

  // 更新参数筛选
  const updateParameterFilter = useCallback((category: string, value: string, checked: boolean) => {
    setFilterState(prev => {
      const newSelectedParameters = { ...prev.selectedParameters };
      
      if (checked) {
        if (!newSelectedParameters[category]) {
          newSelectedParameters[category] = [];
        }
        newSelectedParameters[category] = [...newSelectedParameters[category], value];
      } else {
        if (newSelectedParameters[category]) {
          newSelectedParameters[category] = newSelectedParameters[category].filter(item => item !== value);
          if (newSelectedParameters[category].length === 0) {
            delete newSelectedParameters[category];
          }
        }
      }
      
      return {
        ...prev,
        selectedParameters: newSelectedParameters,
        resultCount: calculateResultCount(prev.selectedBrand, prev.selectedPackage, newSelectedParameters)
      };
    });
  }, []);

  // 更新搜索查询
  const updateSearchQuery = useCallback((query: string) => {
    setFilterState(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, []);

  // 重置所有筛选条件
  const resetFilters = useCallback(() => {
    setFilterState(initialState);
  }, []);

  // 检查品牌是否被选中
  const isBrandSelected = useCallback((brand: string) => {
    return filterState.selectedBrand.includes(brand);
  }, [filterState.selectedBrand]);

  // 检查封装是否被选中
  const isPackageSelected = useCallback((packageType: string) => {
    return filterState.selectedPackage.includes(packageType);
  }, [filterState.selectedPackage]);

  // 检查参数是否被选中
  const isParameterSelected = useCallback((category: string, value: string) => {
    return filterState.selectedParameters[category]?.includes(value) || false;
  }, [filterState.selectedParameters]);

  // 获取已选择的筛选条件数量
  const getSelectedFiltersCount = useCallback(() => {
    const brandCount = filterState.selectedBrand.length;
    const packageCount = filterState.selectedPackage.length;
    const parameterCount = Object.values(filterState.selectedParameters).reduce(
      (total, values) => total + values.length, 0
    );
    return brandCount + packageCount + parameterCount;
  }, [filterState]);

  // 获取筛选摘要
  const getFilterSummary = useCallback(() => {
    const summary: string[] = [];
    
    if (filterState.selectedBrand.length > 0) {
      summary.push(`品牌: ${filterState.selectedBrand.length}个`);
    }
    
    if (filterState.selectedPackage.length > 0) {
      summary.push(`封装: ${filterState.selectedPackage.length}个`);
    }
    
    const parameterCount = Object.values(filterState.selectedParameters).reduce(
      (total, values) => total + values.length, 0
    );
    if (parameterCount > 0) {
      summary.push(`参数: ${parameterCount}个`);
    }
    
    if (filterState.searchQuery) {
      summary.push(`搜索: "${filterState.searchQuery}"`);
    }
    
    return summary;
  }, [filterState]);

  // 生成搜索URL参数
  const generateSearchParams = useCallback((categoryName: string) => {
    const params = new URLSearchParams();
    
    params.set('category', categoryName);
    
    if (filterState.selectedBrand.length > 0) {
      params.set('brands', filterState.selectedBrand.join(','));
    }
    
    if (filterState.selectedPackage.length > 0) {
      params.set('packages', filterState.selectedPackage.join(','));
    }
    
    if (Object.keys(filterState.selectedParameters).length > 0) {
      params.set('parameters', JSON.stringify(filterState.selectedParameters));
    }
    
    if (filterState.searchQuery) {
      params.set('q', filterState.searchQuery);
    }
    
    return params.toString();
  }, [filterState]);

  return {
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
  };
}

// 计算结果数量的辅助函数（模拟）
function calculateResultCount(
  selectedBrands: string[],
  selectedPackages: string[],
  selectedParameters: Record<string, string[]>
): number {
  // 这里是模拟的计算逻辑，实际应该根据真实数据计算
  const baseCount = 10000;
  const brandReduction = selectedBrands.length * 300;
  const packageReduction = selectedPackages.length * 200;
  const parameterReduction = Object.values(selectedParameters).reduce(
    (total, values) => total + values.length * 150, 0
  );
  
  const result = baseCount - brandReduction - packageReduction - parameterReduction;
  return Math.max(100, result); // 确保至少有100个结果
}

// 筛选条件验证
export function validateFilterState(state: CategoryFilterState): boolean {
  // 检查是否有任何筛选条件被选中
  return (
    state.selectedBrand.length > 0 ||
    state.selectedPackage.length > 0 ||
    Object.keys(state.selectedParameters).length > 0 ||
    state.searchQuery.trim().length > 0
  );
}

// 筛选条件序列化（用于URL或存储）
export function serializeFilterState(state: CategoryFilterState): string {
  return JSON.stringify({
    brands: state.selectedBrand,
    packages: state.selectedPackage,
    parameters: state.selectedParameters,
    query: state.searchQuery
  });
}

// 筛选条件反序列化
export function deserializeFilterState(serialized: string): Partial<CategoryFilterState> {
  try {
    const parsed = JSON.parse(serialized);
    return {
      selectedBrand: parsed.brands || [],
      selectedPackage: parsed.packages || [],
      selectedParameters: parsed.parameters || {},
      searchQuery: parsed.query || ''
    };
  } catch {
    return {};
  }
}
