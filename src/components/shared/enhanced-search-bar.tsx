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
      // 没有输入时显示最近搜索和热门搜索
      const recentSearches = getRecentSearches();
      const popularSuggestions = getSearchSuggestions('', 8);
      setSuggestions([
        ...recentSearches.slice(0, 3),
        ...popularSuggestions,
      ].slice(0, 8));
    } else {
      // 有输入时进行智能匹配
      const matchedSuggestions = getSearchSuggestions(query, 8);
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
              {/* 搜索输入框 */}
              <div className="flex-1 mx-4">
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder={placeholder}
                  value={query}
                  onChange={handleInputChange}
                  onFocus={() => showSuggestions && setIsOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-base font-semibold border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 placeholder:font-medium text-gray-900 dark:text-gray-100"
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
                  className="mr-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {/* 分隔线 */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-orange-300/50 to-transparent dark:via-orange-700/50"></div>

              {/* 搜索按钮 */}
              <Button
                type="submit"
                className="mx-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:via-orange-700 hover:to-amber-700 text-white shadow-orange-500/25"
                aria-label="搜索"
              >
                <span className="text-sm font-bold">搜索</span>
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* 搜索建议下拉框 */}
      {showSuggestions && isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-orange-200/50 dark:border-orange-800/30">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0",
                    index === highlightedIndex
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
                      <Badge variant="secondary" className="text-xs">
                        {getSuggestionLabel(suggestion.type)}
                      </Badge>
                    </div>
                    {suggestion.description && (
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {suggestion.description}
                      </div>
                    )}
                    {suggestion.brand && suggestion.type !== 'brand' && (
                      <div className="text-xs text-gray-400 mt-1">
                        品牌: {suggestion.brand}
                      </div>
                    )}
                    {suggestion.category && (
                      <div className="text-xs text-gray-400 mt-1">
                        分类: {suggestion.category}
                      </div>
                    )}
                  </div>
                  {suggestion.count && (
                    <div className="text-xs text-gray-400 flex flex-col items-end">
                      <span>{suggestion.count}+</span>
                      <span className="text-xs">搜索</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
