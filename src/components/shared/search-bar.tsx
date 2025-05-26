"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Brain } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  aiEnhanced?: boolean;
  onAiToggle?: () => void;
  showAiTooltip?: boolean;
  onAiTooltipChange?: (show: boolean) => void;
}

export default function SearchBar({
  onSearch,
  placeholder = "搜索芯片型号、制造商、特性...",
  initialQuery = "",
  className,
  aiEnhanced = false,
  onAiToggle,
  showAiTooltip = false,
  onAiTooltipChange,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // 同步外部的 initialQuery 变化
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // 首次访问时显示AI提示
  useEffect(() => {
    if (isFirstVisit && onAiTooltipChange) {
      const timer = setTimeout(() => {
        onAiTooltipChange(true);
        setTimeout(() => onAiTooltipChange(false), 3000);
        setIsFirstVisit(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, onAiTooltipChange]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleAiClick = () => {
    if (onAiToggle) {
      onAiToggle();
    }
  };

  const dynamicPlaceholder = aiEnhanced
    ? "用自然语言描述您的需求..."
    : placeholder;

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      {/* 艺术品级搜索容器 */}
      <div className="relative group">
        {/* 背景光晕效果 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

        {/* 主搜索容器 */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-orange-200/50 dark:border-orange-800/30 shadow-xl backdrop-blur-sm overflow-hidden">
          {/* 内部渐变装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 via-amber-50/20 to-yellow-50/30 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-yellow-950/20"></div>

          {/* 搜索内容区 */}
          <div className="relative flex items-center p-2">
            {/* 搜索图标装饰 */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-900/50 ml-2">
              <Search className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>

            {/* 搜索输入框 */}
            <div className="flex-1 mx-3">
              <Input
                type="search"
                placeholder={dynamicPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`
                  w-full text-base font-semibold border-0 bg-transparent focus:ring-0 focus:outline-none
                  placeholder:text-gray-600 dark:placeholder:text-gray-300 placeholder:font-medium
                  ${aiEnhanced
                    ? 'text-purple-800 dark:text-purple-200 placeholder:text-purple-500 dark:placeholder:text-purple-400'
                    : 'text-gray-900 dark:text-gray-100'
                  }
                `}
                aria-label="搜索查询"
              />
            </div>

            {/* 分隔线 */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-orange-300/50 to-transparent dark:via-orange-700/50"></div>

            {/* 搜索按钮 */}
            <Button
              type="submit"
              className={`
                mx-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg
                ${aiEnhanced
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 hover:from-purple-600 hover:via-purple-700 hover:to-blue-700 text-white shadow-purple-500/25'
                  : 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white shadow-orange-500/25'
                }
              `}
              aria-label="搜索"
            >
              <span className="text-sm font-bold">搜索</span>
            </Button>

            {/* AI按钮 - 独立位置 */}
            {onAiToggle && (
              <div className="relative">
                <Button
                  type="button"
                  onClick={handleAiClick}
                  className={`
                    px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 relative shadow-lg mr-2
                    ${aiEnhanced
                      ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 text-white shadow-purple-500/25 hover:from-purple-600 hover:via-purple-700 hover:to-blue-700'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-purple-600 dark:text-purple-400 hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-950/50 dark:hover:to-purple-900/50 border border-purple-200/50 dark:border-purple-800/30'
                    }
                  `}
                  title={aiEnhanced ? "AI增强已启用" : "启用AI增强搜索"}
                >
                  {aiEnhanced ? (
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Brain className="h-4 w-4" />
                  )}
                  {aiEnhanced && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse border-2 border-white dark:border-gray-900"></span>
                  )}
                </Button>

                {/* AI Tooltip */}
                {showAiTooltip && (
                  <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-3 rounded-xl whitespace-nowrap shadow-2xl border border-purple-400/30">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span className="font-medium">试试AI智能搜索，结果更精准！</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 底部装饰线 */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-60"></div>
        </div>
      </div>
    </form>
  );
}
