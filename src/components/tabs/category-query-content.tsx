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
import { useRouter } from 'next/navigation';


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
  const router = useRouter();

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
      const params = new URLSearchParams();
      params.set('category', `${selectedL1?.name}/${selectedL2?.name}/${selectedL3.name}`);
      params.set('mode', 'datasheet');
      router.push(`/search?${params.toString()}`);
    } else if (selectedL2) {
      message = `已选择: ${selectedL1?.name} > ${selectedL2.name}`;
      const params = new URLSearchParams();
      params.set('category', `${selectedL1?.name}/${selectedL2.name}`);
      params.set('mode', 'datasheet');
      router.push(`/search?${params.toString()}`);
    } else if (selectedL1) {
      message = `已选择: ${selectedL1.name}`;
      const params = new URLSearchParams();
      params.set('category', selectedL1.name);
      params.set('mode', 'datasheet');
      router.push(`/search?${params.toString()}`);
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
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-blue-950/30 h-[calc(100vh_-_200px)] md:h-[calc(100vh_-_180px)] flex flex-col">
        <CardHeader className="py-4 px-6 border-b border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/20 flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold flex items-center gap-3 text-gray-800 dark:text-gray-100">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              产品分类查询
            </span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAiAssistantModalOpen(true)}
            className="border-2 border-purple-200 hover:border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200 font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI 智能客服
          </Button>
        </CardHeader>

        <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200/60 dark:border-gray-700/60 space-y-3 bg-gradient-to-r from-gray-50/80 to-blue-50/40 dark:from-gray-800/50 dark:to-blue-950/20">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <Input
                      type="search"
                      placeholder="搜索分类名称..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 text-sm h-10 border-2 border-blue-200/60 dark:border-blue-800/60 bg-white/80 dark:bg-gray-900/80 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 dark:focus:ring-blue-800/50 rounded-xl font-medium text-gray-700 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm"
                  />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center flex-wrap min-h-[24px] font-medium">
                  <button
                    onClick={() => handleBreadcrumbClick(0)}
                    className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-1 py-0.5 rounded"
                  >
                    产品分类
                  </button>
                  {selectedL1 && <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-500" />}
                  {selectedL1 && (
                    <button
                      onClick={() => handleBreadcrumbClick(1)}
                      className={cn(
                        "hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-1 py-0.5 rounded",
                        selectedL2 ? "text-gray-600 dark:text-gray-300" : "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/30"
                      )}
                    >
                      {selectedL1.name}
                    </button>
                  )}
                  {selectedL2 && <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-500" />}
                  {selectedL2 && (
                    <button
                      onClick={() => handleBreadcrumbClick(2)}
                      className={cn(
                        "hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-1 py-0.5 rounded",
                        selectedL3 ? "text-gray-600 dark:text-gray-300" : "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/30"
                      )}
                    >
                      {selectedL2.name}
                    </button>
                  )}
                  {selectedL3 && <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-500" />}
                  {selectedL3 && (
                    <span className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/30 px-1 py-0.5 rounded">
                      {selectedL3.name}
                    </span>
                  )}
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

          <div className="p-4 border-t border-gray-200/60 dark:border-gray-700/60 flex justify-between items-center bg-gradient-to-r from-gray-50/80 to-blue-50/40 dark:from-gray-800/50 dark:to-blue-950/20">
            <Button
              variant="outline"
              onClick={handleReset}
              size="sm"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              重置选择
            </Button>
            <Button
              onClick={handleApply}
              size="sm"
              disabled={!selectedL1}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold shadow-lg hover:shadow-xl disabled:shadow-sm transition-all duration-200 border-0"
            >
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

