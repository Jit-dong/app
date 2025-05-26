"use client";

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/category-data';
import { productCategories } from '@/lib/category-data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  Search, 
  CheckCircle2, 
  LayoutGrid, 
  Sparkles, 
  Cpu, 
  Zap, 
  Wifi, 
  Battery, 
  Microchip, 
  Monitor, 
  Smartphone, 
  Car,
  ArrowLeft,
  Home
} from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

// 为不同分类定义图标映射
const categoryIcons: Record<string, any> = {
  '处理器': Cpu,
  '电源管理': Zap,
  '通信接口': Wifi,
  '存储器': Monitor,
  '传感器': Battery,
  '模拟器件': Microchip,
  '显示驱动': Monitor,
  '汽车电子': Car,
  '消费电子': Smartphone,
  '工业控制': LayoutGrid,
  '默认': Microchip
};

// 获取分类图标
const getCategoryIcon = (categoryName: string) => {
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (categoryName.includes(key)) {
      return icon;
    }
  }
  return categoryIcons['默认'];
};

export default function CategoryQueryContentNew() {
  const [selectedL1, setSelectedL1] = useState<Category | null>(null);
  const [selectedL2, setSelectedL2] = useState<Category | null>(null);
  const [selectedL3, setSelectedL3] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(productCategories);
  const [currentLevel, setCurrentLevel] = useState<'L1' | 'L2' | 'L3'>('L1');
  
  const { toast } = useToast();

  // 搜索过滤逻辑
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(productCategories);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filterCategories = (categories: Category[]): Category[] => {
      return categories.filter(cat => 
        cat.name.toLowerCase().includes(lowerSearchTerm)
      );
    };

    const filtered = filterCategories(productCategories);
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const handleL1Select = (category: Category) => {
    setSelectedL1(category);
    setSelectedL2(null);
    setSelectedL3(null);
    setCurrentLevel('L2');
  };

  const handleL2Select = (category: Category) => {
    setSelectedL2(category);
    setSelectedL3(null);
    setCurrentLevel('L3');
  };

  const handleL3Select = (category: Category) => {
    setSelectedL3(category);
  };

  const handleBack = () => {
    if (currentLevel === 'L3') {
      setSelectedL3(null);
      setCurrentLevel('L2');
    } else if (currentLevel === 'L2') {
      setSelectedL2(null);
      setSelectedL1(null);
      setCurrentLevel('L1');
    }
  };

  const handleReset = () => {
    setSelectedL1(null);
    setSelectedL2(null);
    setSelectedL3(null);
    setCurrentLevel('L1');
    setSearchTerm('');
  };

  const handleConfirm = () => {
    let message = "未选择分类";
    if (selectedL3) {
      message = `已选择: ${selectedL1?.name} > ${selectedL2?.name} > ${selectedL3.name}`;
    } else if (selectedL2) {
      message = `已选择: ${selectedL1?.name} > ${selectedL2.name}`;
    } else if (selectedL1) {
      message = `已选择: ${selectedL1.name}`;
    }
    toast({
      title: '分类选择结果',
      description: message,
    });
  };

  // 获取当前显示的分类列表
  const getCurrentCategories = () => {
    if (currentLevel === 'L1') {
      return filteredCategories;
    } else if (currentLevel === 'L2' && selectedL1) {
      return selectedL1.subCategories || [];
    } else if (currentLevel === 'L3' && selectedL2) {
      return selectedL2.subCategories || [];
    }
    return [];
  };

  const currentCategories = getCurrentCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/10 relative overflow-hidden">
      {/* 动态背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-indigo-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* 流动粒子效果 */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* 顶部标题区域 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            产品分类导航
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            探索芯片世界的精密分类体系
          </p>
        </div>

        {/* 搜索栏 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="搜索分类名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl rounded-2xl focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* 面包屑导航 */}
        {(selectedL1 || selectedL2 || selectedL3) && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-full shadow-lg border border-white/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Home className="h-4 w-4 text-gray-400" />
              {selectedL1 && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-blue-600">{selectedL1.name}</span>
                </>
              )}
              {selectedL2 && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-indigo-600">{selectedL2.name}</span>
                </>
              )}
              {selectedL3 && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-purple-600">{selectedL3.name}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* 分类卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentCategories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name);
            const isSelected = 
              (currentLevel === 'L1' && selectedL1?.id === category.id) ||
              (currentLevel === 'L2' && selectedL2?.id === category.id) ||
              (currentLevel === 'L3' && selectedL3?.id === category.id);

            return (
              <div
                key={category.id}
                onClick={() => {
                  if (currentLevel === 'L1') handleL1Select(category);
                  else if (currentLevel === 'L2') handleL2Select(category);
                  else if (currentLevel === 'L3') handleL3Select(category);
                }}
                className={cn(
                  "group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2",
                  "animate-in fade-in slide-in-from-bottom-4",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "relative p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500",
                  "bg-gradient-to-br from-white/80 via-white/60 to-white/40",
                  "dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40",
                  "border-white/20 dark:border-gray-700/20",
                  "shadow-xl hover:shadow-2xl",
                  "group-hover:border-blue-300/40 dark:group-hover:border-blue-600/40",
                  isSelected && "ring-2 ring-blue-500/30 border-blue-400/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-blue-950/80 dark:to-indigo-950/60"
                )}>
                  {/* 发光效果 */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/5 via-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* 图标区域 */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
                      "bg-gradient-to-br from-blue-500/10 to-indigo-500/10",
                      "group-hover:from-blue-500/20 group-hover:to-indigo-500/20",
                      "group-hover:scale-110 group-hover:rotate-3",
                      isSelected && "from-blue-500/30 to-indigo-500/30 scale-110"
                    )}>
                      <IconComponent className={cn(
                        "h-8 w-8 transition-all duration-500",
                        "text-blue-600 dark:text-blue-400",
                        "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
                        isSelected && "text-blue-700 dark:text-blue-300"
                      )} />
                    </div>
                    
                    {/* 分类名称 */}
                    <div>
                      <h3 className={cn(
                        "font-semibold text-lg transition-colors duration-300",
                        "text-gray-800 dark:text-gray-200",
                        "group-hover:text-blue-700 dark:group-hover:text-blue-300",
                        isSelected && "text-blue-800 dark:text-blue-200"
                      )}>
                        {category.name}
                      </h3>
                      {category.subCategories && category.subCategories.length > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {category.subCategories.length} 个子分类
                        </p>
                      )}
                    </div>

                    {/* 选中指示器 */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-20 left-0 right-0 z-50 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-xl border-gray-200/50 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                重置选择
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedL3 ? '三级分类已选择' : selectedL2 ? '二级分类已选择' : selectedL1 ? '一级分类已选择' : '请选择分类'}
                </p>
              </div>
              
              <Button
                onClick={handleConfirm}
                disabled={!selectedL1}
                className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                确认选择
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
