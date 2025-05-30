"use client";

import React, { useState } from 'react';
import SearchBar from "@/components/shared/search-bar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX, RefreshCw } from "lucide-react";
import LoadingSpinner from "@/components/shared/loading-spinner";
import type { Chip } from "@/lib/types";
import { searchChips } from "@/lib/placeholder-data";

export default function AlternativeSearchPage() {
  const [searchResults, setSearchResults] = useState<Chip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setCurrentQuery(query);

    // 模拟搜索延迟
    setTimeout(() => {
      // 这里应该调用实际的替代芯片搜索API
      const results = searchChips(query);
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* 搜索栏 */}
      <div className="flex justify-center">
        <SearchBar
          onSearch={handleSearch}
          className="w-full max-w-2xl"
          placeholder="输入芯片型号查找替代品"
          initialQuery={currentQuery}
        />
      </div>

      {/* 搜索结果 */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner label="正在查找替代芯片..." />
        </div>
      ) : !hasSearched ? (
        // 初始状态
        <div className="py-8">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 搜索提示 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                替代芯片搜索提示
              </h4>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p>• 输入完整型号：如 "STM32F407VGT6"</p>
                <p>• 支持模糊搜索：如 "STM32F407"</p>
                <p>• 支持参数搜索：如 "32位 ARM Cortex-M4"</p>
              </div>
            </div>

            {/* 热门替代搜索 */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                🔥 热门替代搜索
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {['STM32F407', 'ESP32', 'TPS5430', 'LM358', 'AMS1117', 'ATmega328P'].map((term) => (
                  <button
                    key={term}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 border border-gray-200 dark:border-gray-700 rounded-md transition-all duration-200 hover:shadow-sm truncate text-center"
                    onClick={() => handleSearch(term)}
                    title={term}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : searchResults.length > 0 ? (
        // 搜索结果
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((chip) => (
              <div key={chip.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={`/brands/image_cp/${chip.model}.png`}
                      alt={chip.model}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <RefreshCw className="hidden h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{chip.model}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{chip.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{chip.manufacturer}</span>
                      <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        兼容性: 95%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 无结果提示
        <Alert variant="default" className="shadow-md">
          <SearchX className="h-5 w-5" />
          <AlertTitle>未找到替代芯片</AlertTitle>
          <AlertDescription>
            没有找到与"{currentQuery}"相关的替代芯片。请尝试使用其他关键词或检查拼写。
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 