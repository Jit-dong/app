
"use client";

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/category-data';
import { productCategories } from '@/lib/category-data';
import CategoryColumn from '@/components/category-query/category-column';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, RotateCcw, Search, CheckCircle2, LayoutGrid, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import AiChipAssistantModal from '@/components/category-query/ai-chip-assistant-modal';
import { AdBannerHorizontal } from '@/components/shared/ad-banner';

export default function CategoryQueryContent() {
  const [selectedL1, setSelectedL1] = useState<Category | null>(null);
  const [selectedL2, setSelectedL2] = useState<Category | null>(null);
  const [selectedL3, setSelectedL3] = useState<Category | null>(null);

  const [l2Categories, setL2Categories] = useState<Category[]>([]);
  const [l3Categories, setL3Categories] = useState<Category[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredL1Categories, setFilteredL1Categories] = useState<Category[]>(productCategories);
  const [isAiAssistantModalOpen, setIsAiAssistantModalOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (!searchTerm) {
      setFilteredL1Categories(productCategories);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    const filterCategories = (categories: Category[]): Category[] => {
      return categories.map(cat => {
        const matchedSubCategories = cat.subCategories ? filterCategories(cat.subCategories) : [];
        if (cat.name.toLowerCase().includes(lowerSearchTerm) || matchedSubCategories.length > 0) {
          return { ...cat, subCategories: matchedSubCategories.length > 0 ? matchedSubCategories : (cat.name.toLowerCase().includes(lowerSearchTerm) ? cat.subCategories : []) };
        }
        return null;
      }).filter(Boolean) as Category[];
    };

    const filtered = filterCategories(productCategories);
    setFilteredL1Categories(filtered);

  }, [searchTerm]);


  const handleSelectL1 = (category: Category) => {
    setSelectedL1(category);
    setSelectedL2(null);
    setSelectedL3(null);
    setL2Categories(category.subCategories || []);
    setL3Categories([]);
  };

  const handleSelectL2 = (category: Category) => {
    setSelectedL2(category);
    setSelectedL3(null);
    setL3Categories(category.subCategories || []);
  };

  const handleSelectL3 = (category: Category) => {
    setSelectedL3(category);
  };

  const handleBreadcrumbClick = (level: 0 | 1 | 2) => {
    if (level === 0) {
      handleReset();
    } else if (level === 1 && selectedL1) {
      setSelectedL2(null);
      setSelectedL3(null);
      setL3Categories([]);
    } else if (level === 2 && selectedL2) {
       setSelectedL3(null);
    }
  };

  const handleReset = () => {
    setSelectedL1(null);
    setSelectedL2(null);
    setSelectedL3(null);
    setL2Categories([]);
    setL3Categories([]);
    setSearchTerm('');
  };

  const handleApply = () => {
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

  const getButtonText = () => {
    let count = 0;
    if (selectedL3) return `查看产品 (${count})`;
    if (selectedL2) return `查看产品 (${count})`;
    if (selectedL1) return `查看产品 (${count})`;
    return "确定";
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg h-[calc(100vh_-_280px)] md:h-[calc(100vh_-_260px)] flex flex-col">
        <CardHeader className="py-3 px-4 border-b flex flex-row justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-accent" />
            产品分类查询
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsAiAssistantModalOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
            AI 智能客服
          </Button>
        </CardHeader>

        <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
          <div className="p-3 border-b space-y-2 bg-muted/30">
              <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                      type="search"
                      placeholder="搜索分类名称..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 text-sm h-9"
                  />
              </div>
              <div className="text-xs text-muted-foreground flex items-center flex-wrap min-h-[20px]">
                  <button onClick={() => handleBreadcrumbClick(0)} className="hover:underline hover:text-accent">产品分类</button>
                  {selectedL1 && <ChevronRight size={14} className="mx-0.5" />}
                  {selectedL1 && <button onClick={() => handleBreadcrumbClick(1)} className={cn("hover:underline hover:text-accent", selectedL2 ? "" : "text-primary font-medium")}>{selectedL1.name}</button>}
                  {selectedL2 && <ChevronRight size={14} className="mx-0.5" />}
                  {selectedL2 && <button onClick={() => handleBreadcrumbClick(2)} className={cn("hover:underline hover:text-accent", selectedL3 ? "" : "text-primary font-medium")}>{selectedL2.name}</button>}
                  {selectedL3 && <ChevronRight size={14} className="mx-0.5" />}
                  {selectedL3 && <span className="text-primary font-medium">{selectedL3.name}</span>}
              </div>
          </div>

          <div className="flex-grow flex min-h-0">
            <CategoryColumn
              title="一级分类"
              categories={filteredL1Categories}
              selectedCategoryName={selectedL1?.name}
              onSelectCategory={handleSelectL1}
              level={1}
            />
            <CategoryColumn
              title="二级分类"
              categories={l2Categories}
              selectedCategoryName={selectedL2?.name}
              onSelectCategory={handleSelectL2}
              level={2}
              isLoading={false}
            />
            <CategoryColumn
              title="三级分类"
              categories={l3Categories}
              selectedCategoryName={selectedL3?.name}
              onSelectCategory={handleSelectL3}
              level={3}
              isLoading={false}
            />
          </div>

          <div className="p-3 border-t flex justify-between items-center bg-muted/30">
            <Button variant="outline" onClick={handleReset} size="sm">
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              重置选择
            </Button>
            <Button onClick={handleApply} size="sm" disabled={!selectedL1}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {getButtonText()}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 热门品牌区域 */}
      <Card className="shadow-md">
        <CardHeader className="py-3 px-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              热门品牌
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              更多 <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {/* 品牌卡片横向滚动列表 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { name: 'STMicroelectronics', logo: '🔷', products: '1200+', hot: true },
              { name: 'Texas Instruments', logo: '🔶', products: '980+', hot: false },
              { name: 'Espressif', logo: '🟢', products: '45+', hot: true },
              { name: 'Microchip', logo: '🔴', products: '750+', hot: false },
              { name: 'Analog Devices', logo: '🟡', products: '650+', hot: false },
              { name: 'Infineon', logo: '🟣', products: '420+', hot: false },
            ].map((brand, index) => (
              <div
                key={brand.name}
                className="flex-shrink-0 w-16 h-16 p-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-200">{brand.logo}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 广告位 - 在热门品牌下方 */}
      <div className="px-1">
        <AdBannerHorizontal
          className="w-full"
          closable
          onClose={() => console.log('广告被关闭')}
        />
      </div>

      <AiChipAssistantModal
        isOpen={isAiAssistantModalOpen}
        onOpenChange={setIsAiAssistantModalOpen}
      />
    </div>
  );
}

