"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { Search, Clock, TrendingUp, Zap, X, Tag, Building2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getSearchSuggestions,
  getRecentSearches,
  saveSearchHistory,
  type SearchSuggestion
} from "@/lib/search-suggestions";

interface EnhancedSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
  showSuggestions?: boolean;
}

export default function EnhancedSearchBar({
  onSearch,
  placeholder = "搜索芯片型号、制造商、特性...",
  initialQuery = "",
  className,
  showSuggestions = true,
}: EnhancedSearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 同步外部的 initialQuery 变化
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // 处理搜索建议
  useEffect(() => {
    if (!query.trim()) {
      // 没有输入时显示更多最近搜索和热门搜索
      const recentSearches = getRecentSearches();
      const popularSuggestions = getSearchSuggestions('', 6);
      setSuggestions([
        ...recentSearches.slice(0, 8), // 显示更多最近搜索
        ...popularSuggestions,
      ].slice(0, 12)); // 总共显示更多项目
    } else {
      // 有输入时进行智能匹配
      const matchedSuggestions = getSearchSuggestions(query, 10);
      setSuggestions(matchedSuggestions);
    }
  }, [query]);

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearchHistory(query.trim());
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    saveSearchHistory(suggestion.text);
    onSearch(suggestion.text);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'popular': return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'match': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'category': return <Tag className="h-4 w-4 text-green-500" />;
      case 'brand': return <Building2 className="h-4 w-4 text-purple-500" />;
      case 'series': return <Layers className="h-4 w-4 text-indigo-500" />;
      default: return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSuggestionLabel = (type: string) => {
    switch (type) {
      case 'recent': return '最近';
      case 'popular': return '热门';
      case 'match': return '匹配';
      case 'category': return '分类';
      case 'brand': return '品牌';
      case 'series': return '系列';
      default: return '';
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative w-full">
        {/* 现代化搜索容器 */}
        <div className="relative group">
          {/* 背景光晕效果 */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400/20 via-amber-400/20 to-yellow-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

          {/* 主搜索容器 */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* 搜索内容区 */}
            <div className="relative flex items-center p-1">
              {/* 搜索图标 */}
              <div className="flex items-center justify-center w-12 h-12">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* 搜索输入框 */}
              <div className="flex-1 px-2">
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder={placeholder}
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => showSuggestions && setIsOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-base border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 h-12"
                  aria-label="搜索查询"
                  autoComplete="off"
                />
              </div>

              {/* 清除按钮 */}
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="mr-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {/* 搜索按钮 */}
              <Button
                type="submit"
                className="mx-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg"
                aria-label="搜索"
              >
                <span className="text-sm font-semibold">搜索</span>
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* 搜索建议下拉框 */}
      {showSuggestions && isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-orange-200/50 dark:border-orange-800/30 rounded-2xl">
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {/* 分组显示建议 */}
              {(() => {
                const recentSuggestions = suggestions.filter(s => s.type === 'recent');
                const otherSuggestions = suggestions.filter(s => s.type !== 'recent');

                return (
                  <>
                    {/* 最近搜索 - 标签云形式 */}
                    {recentSuggestions.length > 0 && (
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">最近搜索</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            {recentSuggestions.length}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSuggestions.map((suggestion, index) => (
                            <button
                              key={suggestion.id}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 border font-medium",
                                index === highlightedIndex
                                  ? "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 shadow-sm"
                                  : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-orange-700 hover:shadow-sm"
                              )}
                            >
                              <span>{suggestion.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 其他建议 - 列表形式 */}
                    {otherSuggestions.length > 0 && (
                      <div className="py-2">
                        {otherSuggestions.map((suggestion, index) => (
                          <div
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0",
                              (index + recentSuggestions.length) === highlightedIndex
                                ? "bg-orange-50 dark:bg-orange-950/20"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            )}
                          >
                            {getSuggestionIcon(suggestion.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium truncate">
                                  {suggestion.text}
                                </span>
                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                  {getSuggestionLabel(suggestion.type)}
                                </Badge>
                              </div>
                              {suggestion.description && (
                                <div className="text-xs text-gray-500 mt-1 truncate">
                                  {suggestion.description}
                                </div>
                              )}
                              {suggestion.brand && suggestion.type !== 'brand' && (
                                <div className="text-xs text-gray-400 mt-0.5">
                                  品牌: {suggestion.brand}
                                </div>
                              )}
                              {suggestion.category && (
                                <div className="text-xs text-gray-400 mt-0.5">
                                  分类: {suggestion.category}
                                </div>
                              )}
                            </div>
                            {suggestion.count && (
                              <div className="text-xs text-gray-400 font-medium">
                                {suggestion.count}+
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
