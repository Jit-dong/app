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
                type="search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-base font-semibold border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-600 dark:placeholder:text-gray-300 placeholder:font-medium text-gray-900 dark:text-gray-100"
                aria-label="搜索查询"
              />
            </div>

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
  );
}
