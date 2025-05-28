     "use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useEffect, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "搜索芯片型号、制造商、特性...",
  initialQuery = "",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  // 同步外部的 initialQuery 变化
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
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
                type="search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-base border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 h-12"
                aria-label="搜索查询"
              />
            </div>

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
  );
}
