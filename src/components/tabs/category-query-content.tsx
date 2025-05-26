
"use client";

import { useState, useEffect } from 'react';
import type { Category } from '@/lib/category-data';
import { productCategories } from '@/lib/category-data';
import CategoryColumn from '@/components/category-query/category-column';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, RotateCcw, Search, CheckCircle2, LayoutGrid, Sparkles } from 'lucide-react';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import AiChipAssistantModal from '@/components/category-query/ai-chip-assistant-modal';


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
      <Card className="shadow-lg h-[calc(100vh_-_200px)] md:h-[calc(100vh_-_180px)] flex flex-col">
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

      <AiChipAssistantModal
        isOpen={isAiAssistantModalOpen}
        onOpenChange={setIsAiAssistantModalOpen}
      />
    </div>
  );
}

