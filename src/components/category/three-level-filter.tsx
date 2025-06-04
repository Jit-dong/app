'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check } from 'lucide-react';
import { ThreeLevelFilterData } from '@/lib/placeholder-data';

interface ThreeLevelFilterProps {
  data: ThreeLevelFilterData;
  onSelectionChange: (selections: FilterSelections) => void;
}

export interface FilterSelections {
  brand: {
    region: string[];
    manufacturer: string[];
  };
  package: {
    type: string[];
    size: string[];
    pins: string[];
  };
  parameters: {
    application: Record<string, string[]>;
    topology: Record<string, string[]>;
    electrical: Record<string, string[]>;
    special: Record<string, string[]>;
    protection: Record<string, string[]>;
  };
}

type FilterLevel = 'main' | 'brand' | 'package' | 'parameters';
type BrandSubLevel = 'region' | 'manufacturer';
type PackageSubLevel = 'type' | 'size' | 'pins';
type ParametersSubLevel = 'application' | 'topology' | 'electrical' | 'special' | 'protection';

export default function ThreeLevelFilter({ data, onSelectionChange }: ThreeLevelFilterProps) {
  const [currentLevel, setCurrentLevel] = useState<FilterLevel>('main');
  const [brandSubLevel, setBrandSubLevel] = useState<BrandSubLevel | null>(null);
  const [packageSubLevel, setPackageSubLevel] = useState<PackageSubLevel | null>(null);
  const [parametersSubLevel, setParametersSubLevel] = useState<ParametersSubLevel | null>(null);
  const [parameterDetailLevel, setParameterDetailLevel] = useState<string | null>(null);

  const [selections, setSelections] = useState<FilterSelections>({
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

  // 主分类配置
  const mainCategories = [
    {
      id: 'brand' as FilterLevel,
      name: '品牌',
      icon: '🏢',
      color: 'blue',
      count: selections.brand.region.length + selections.brand.manufacturer.length
    },
    {
      id: 'package' as FilterLevel,
      name: '封装',
      icon: '📦',
      color: 'purple',
      count: selections.package.type.length + selections.package.size.length + selections.package.pins.length
    },
    {
      id: 'parameters' as FilterLevel,
      name: '参数',
      icon: '📊',
      color: 'red',
      count: Object.values(selections.parameters).reduce((total, category) =>
        total + Object.values(category).reduce((sum, arr) => sum + arr.length, 0), 0)
    }
  ];

  // 品牌子分类
  const brandSubCategories = [
    { id: 'region' as BrandSubLevel, name: '按地域', icon: '🌍' },
    { id: 'manufacturer' as BrandSubLevel, name: '按厂商', icon: '🏭' }
  ];

  // 封装子分类
  const packageSubCategories = [
    { id: 'type' as PackageSubLevel, name: '封装类型', icon: '📏' },
    { id: 'size' as PackageSubLevel, name: '封装尺寸', icon: '📐' },
    { id: 'pins' as PackageSubLevel, name: '引脚数', icon: '📌' }
  ];

  // 参数子分类
  const parametersSubCategories = [
    { id: 'application' as ParametersSubLevel, name: '应用场景', icon: '🎯' },
    { id: 'topology' as ParametersSubLevel, name: '拓扑架构', icon: '⚡' },
    { id: 'electrical' as ParametersSubLevel, name: '电气参数', icon: '📈' },
    { id: 'special' as ParametersSubLevel, name: '特殊功能', icon: '⭐' },
    { id: 'protection' as ParametersSubLevel, name: '保护功能', icon: '🛡️' }
  ];

  const handleToggleSelection = (category: string, subcategory: string, value: string) => {
    const newSelections = { ...selections };

    if (category === 'brand') {
      const brandKey = subcategory as keyof typeof selections.brand;
      const currentArray = newSelections.brand[brandKey];
      if (currentArray.includes(value)) {
        newSelections.brand[brandKey] = currentArray.filter(item => item !== value);
      } else {
        newSelections.brand[brandKey] = [...currentArray, value];
      }
    } else if (category === 'package') {
      const packageKey = subcategory as keyof typeof selections.package;
      const currentArray = newSelections.package[packageKey];
      if (currentArray.includes(value)) {
        newSelections.package[packageKey] = currentArray.filter(item => item !== value);
      } else {
        newSelections.package[packageKey] = [...currentArray, value];
      }
    } else if (category === 'parameters') {
      const paramKey = subcategory as keyof typeof selections.parameters;
      if (!newSelections.parameters[paramKey][parameterDetailLevel!]) {
        newSelections.parameters[paramKey][parameterDetailLevel!] = [];
      }
      const currentArray = newSelections.parameters[paramKey][parameterDetailLevel!];
      if (currentArray.includes(value)) {
        newSelections.parameters[paramKey][parameterDetailLevel!] = currentArray.filter(item => item !== value);
      } else {
        newSelections.parameters[paramKey][parameterDetailLevel!] = [...currentArray, value];
      }
    }

    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  const goBack = () => {
    if (parameterDetailLevel) {
      setParameterDetailLevel(null);
    } else if (brandSubLevel) {
      setBrandSubLevel(null);
      setCurrentLevel('main');
    } else if (packageSubLevel) {
      setPackageSubLevel(null);
      setCurrentLevel('main');
    } else if (parametersSubLevel) {
      setParametersSubLevel(null);
      setCurrentLevel('main');
    } else {
      setCurrentLevel('main');
    }
  };

  const renderMainLevel = () => (
    <div className="p-3">
      <div className="grid grid-cols-3 gap-2">
        {mainCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            onClick={() => setCurrentLevel(category.id)}
            className={`h-16 flex flex-col items-center justify-center space-y-1 border-2 hover:border-${category.color}-400 bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 dark:from-${category.color}-950/30 dark:to-${category.color}-900/20`}
          >
            <div className="text-xl">{category.icon}</div>
            <div className="text-xs font-medium">{category.name}</div>
            {category.count > 0 && (
              <Badge variant="secondary" className="text-xs px-1 py-0">
                已选{category.count}项
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderBrandLevel = () => (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <Button variant="ghost" size="sm" onClick={goBack} className="mr-2 p-1">
          <ArrowLeft className="h-3.5 w-3.5" />
        </Button>
        <h3 className="text-base font-semibold">🏢 品牌</h3>
      </div>

      {!brandSubLevel ? (
        <div className="grid grid-cols-2 gap-2">
          {brandSubCategories.map((sub) => (
            <Button
              key={sub.id}
              variant="outline"
              onClick={() => setBrandSubLevel(sub.id)}
              className="h-14 flex flex-col items-center justify-center space-y-1"
            >
              <div className="text-lg">{sub.icon}</div>
              <div className="text-xs">{sub.name}</div>
            </Button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="sm" onClick={() => setBrandSubLevel(null)} className="mr-2 p-1">
              <ArrowLeft className="h-3.5 w-3.5" />
            </Button>
            <h4 className="text-sm font-medium">
              {brandSubCategories.find(s => s.id === brandSubLevel)?.name}
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {data.brand[brandSubLevel].options.map((option) => {
              const isSelected = selections.brand[brandSubLevel].includes(option);
              return (
                <Button
                  key={option}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleSelection('brand', brandSubLevel, option)}
                  className={`justify-between text-xs py-1.5 ${isSelected ? 'bg-blue-600 text-white' : ''}`}
                >
                  <span className="text-xs truncate">{option}</span>
                  {isSelected && <Check className="h-2.5 w-2.5" />}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderPackageLevel = () => (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">📦 封装</h3>
      </div>

      {!packageSubLevel ? (
        <div className="grid grid-cols-3 gap-3">
          {packageSubCategories.map((sub) => (
            <Button
              key={sub.id}
              variant="outline"
              onClick={() => setPackageSubLevel(sub.id)}
              className="h-16 flex flex-col items-center justify-center space-y-1"
            >
              <div className="text-xl">{sub.icon}</div>
              <div className="text-sm">{sub.name}</div>
            </Button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-3">
            <Button variant="ghost" size="sm" onClick={() => setPackageSubLevel(null)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h4 className="font-medium">
              {packageSubCategories.find(s => s.id === packageSubLevel)?.name}
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.package[packageSubLevel].options.map((option) => {
              const isSelected = selections.package[packageSubLevel].includes(option);
              return (
                <Button
                  key={option}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleSelection('package', packageSubLevel, option)}
                  className={`justify-between ${isSelected ? 'bg-purple-600 text-white' : ''}`}
                >
                  <span className="text-xs">{option}</span>
                  {isSelected && <Check className="h-3 w-3" />}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderParametersLevel = () => (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">📊 参数</h3>
      </div>

      {!parametersSubLevel ? (
        <div className="grid grid-cols-2 gap-3">
          {parametersSubCategories.map((sub) => (
            <Button
              key={sub.id}
              variant="outline"
              onClick={() => setParametersSubLevel(sub.id)}
              className="h-16 flex flex-col items-center justify-center space-y-1"
            >
              <div className="text-xl">{sub.icon}</div>
              <div className="text-sm">{sub.name}</div>
            </Button>
          ))}
        </div>
      ) : !parameterDetailLevel ? (
        <div>
          <div className="flex items-center mb-3">
            <Button variant="ghost" size="sm" onClick={() => setParametersSubLevel(null)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h4 className="font-medium">
              {parametersSubCategories.find(s => s.id === parametersSubLevel)?.name}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(data.parameters[parametersSubLevel].subcategories).map(([key, config]) => (
              <Button
                key={key}
                variant="outline"
                onClick={() => setParameterDetailLevel(key)}
                className="h-12 justify-start"
              >
                <span className="text-sm">{config.name}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-3">
            <Button variant="ghost" size="sm" onClick={() => setParameterDetailLevel(null)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h4 className="font-medium">
              {data.parameters[parametersSubLevel].subcategories[parameterDetailLevel]?.name}
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
            {data.parameters[parametersSubLevel].subcategories[parameterDetailLevel]?.options.map((option) => {
              const isSelected = selections.parameters[parametersSubLevel][parameterDetailLevel]?.includes(option) || false;
              return (
                <Button
                  key={option}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleSelection('parameters', parametersSubLevel, option)}
                  className={`justify-between text-left ${isSelected ? 'bg-red-600 text-white' : ''}`}
                >
                  <span className="text-xs">{option}</span>
                  {isSelected && <Check className="h-3 w-3" />}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // 渲染当前级别
  if (currentLevel === 'main') {
    return renderMainLevel();
  } else if (currentLevel === 'brand') {
    return renderBrandLevel();
  } else if (currentLevel === 'package') {
    return renderPackageLevel();
  } else if (currentLevel === 'parameters') {
    return renderParametersLevel();
  }

  return <div>未知级别</div>;
}
