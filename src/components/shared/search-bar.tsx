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
      <div className="relative flex items-center">
        {/* 搜索输入框 */}
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder={dynamicPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`
              w-full text-base md:text-sm pr-28 pl-4 py-3
              border-2 rounded-xl transition-all duration-300
              ${aiEnhanced
                ? 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/20 focus:border-purple-500 dark:focus:border-purple-400'
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
              }
            `}
            aria-label="搜索查询"
          />

          {/* AI图标 - 集成在搜索框内，向右偏移 */}
          {onAiToggle && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleAiClick}
                  className={`
                    p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-md
                    ${aiEnhanced
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/90 dark:bg-gray-800/90 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/30'
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
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </button>

                {/* AI Tooltip */}
                {showAiTooltip && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      试试AI智能搜索，结果更精准！
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 搜索按钮 */}
        <Button
          type="submit"
          className={`
            ml-2 px-4 py-3 rounded-xl transition-all duration-300
            ${aiEnhanced
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              : 'bg-blue-500 hover:bg-blue-600'
            }
          `}
          aria-label="搜索"
        >
          <Search className="h-4 w-4 mr-0 sm:mr-2" />
          <span className="hidden sm:inline">搜索</span>
        </Button>
      </div>
    </form>
  );
}
