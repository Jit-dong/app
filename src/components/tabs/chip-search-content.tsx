
"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/shared/search-bar";
import FilterPanel, { type ChipFilters } from "@/components/shared/filter-panel";
import ChipListItem from "@/components/shared/chip-list-item"; // Import new component
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, SearchX } from "lucide-react";

export default function ChipSearchContent() {
  const [searchResults, setSearchResults] = useState<Chip[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState<ChipFilters>({});
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // For demo purposes, ensure TPS5430 items are shown initially if query is empty
      const initialResults = searchChips("", {});
      // Prioritize TPS5430 items for demo if present
      const tpsDemoItems = initialResults.filter(c => c.model === 'TPS5430');
      const otherItems = initialResults.filter(c => c.model !== 'TPS5430');
      setSearchResults([...tpsDemoItems, ...otherItems]);
      setIsLoading(false);
    }, 500);
  }, []);

  const performSearch = (query: string, filters: ChipFilters) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(searchChips(query, filters));
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    performSearch(query, currentFilters);
  };

  const handleApplyFilters = (filters: ChipFilters) => {
    setCurrentFilters(filters);
    performSearch(currentQuery, filters);
    setSheetOpen(false); 
  };
  
  const handleClearFilters = () => {
    const emptyFilters = {};
    setCurrentFilters(emptyFilters);
    performSearch(currentQuery, emptyFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <SearchBar onSearch={handleSearch} className="flex-grow" />
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" /> 更多筛选
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-md sm:max-w-sm p-0">
            <FilterPanel 
              onApplyFilters={handleApplyFilters} 
              onClearFilters={handleClearFilters}
              initialFilters={currentFilters}
              setSheetOpen={setSheetOpen}
            />
          </SheetContent>
        </Sheet>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label="正在搜索芯片..." />
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4"> {/* Changed from grid to space-y for list items */}
          {searchResults.map((chip, index) => (
            // Conditionally show "替代料: 99+" only for the first demo item for TPS5430 as per request
            <ChipListItem 
              key={chip.id} 
              chip={chip} 
              showAlternativeCount={chip.model === 'TPS5430' && chip.id === 'TPS5430-1'} 
            />
          ))}
        </div>
      ) : (
        <Alert variant="default" className="shadow-md">
          <SearchX className="h-5 w-5" />
          <AlertTitle>未找到芯片</AlertTitle>
          <AlertDescription>
            没有芯片符合您的搜索条件。请尝试不同的关键词或调整您的筛选器。
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
