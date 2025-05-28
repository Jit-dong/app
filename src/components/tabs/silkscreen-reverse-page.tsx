"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Camera,
  Info,
  CheckCircle2,
  Upload,
  History,
  Star,
  Package,
  Cpu,
  Download,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import { searchSilkscreen, type SilkscreenData } from "@/lib/placeholder-data";
import Image from "next/image";

export default function SilkscreenReversePage({ onBack }: { onBack?: () => void }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SilkscreenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('silkscreen-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
    const favs = localStorage.getItem('silkscreen-favorites');
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  // 执行搜索
  const handleSearch = async () => {
    if (!search.trim()) return;

    setIsLoading(true);

    // 模拟搜索延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    const searchResults = searchSilkscreen(search);
    setResults(searchResults);
    setIsLoading(false);

    // 保存搜索历史
    const newHistory = [search, ...searchHistory.filter(h => h !== search)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('silkscreen-search-history', JSON.stringify(newHistory));
  };

  // 处理回车搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 添加到收藏
  const toggleFavorite = (partNumber: string) => {
    const newFavorites = favorites.includes(partNumber)
      ? favorites.filter(f => f !== partNumber)
      : [...favorites, partNumber];
    setFavorites(newFavorites);
    localStorage.setItem('silkscreen-favorites', JSON.stringify(newFavorites));
  };

  // 使用历史搜索
  const useHistorySearch = (historyItem: string) => {
    setSearch(historyItem);
  };

  return (
    <div className="silkscreen-reverse-page space-y-6 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">

      {/* 页面标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          丝印反查
        </h1>
        <p className="text-gray-600 dark:text-gray-400">通过芯片丝印快速查找订购型号</p>
      </div>

      {/* 搜索输入区域 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {/* 主搜索框 */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                placeholder="请输入芯片丝印（如 5430、ALL、358）"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!search.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  识别中
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  开始识别
                </>
              )}
            </Button>
          </div>

          {/* 附加功能按钮 */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-sm">
              <Camera className="h-4 w-4 mr-2" />
              拍照识别
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Upload className="h-4 w-4 mr-2" />
              上传图片
            </Button>
          </div>
        </div>
      </div>

      {/* 搜索历史 */}
      {searchHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <History className="h-4 w-4" />
            搜索历史
          </h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(0, 8).map((item, index) => (
              <button
                key={index}
                onClick={() => useHistorySearch(item)}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 使用说明（可折叠） */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            丝印反查功能说明
          </h3>
          {showInstructions ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {showInstructions && (
          <div className="px-4 pb-4 space-y-3">
            <div className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
              <p>✓ <strong>输入芯片表面丝印</strong>（支持模糊或部分内容），系统将帮助您查找对应的订购型号</p>
              <p>✓ <strong>支持查找信息</strong>：订购型号、封装与品牌、产品分类和描述</p>
              <p>✓ <strong>智能匹配</strong>：支持精确匹配和模糊搜索，自动排序最相关结果</p>
            </div>

            {/* 示例 */}
            <div className="mt-4 p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">输入示例：</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <code className="bg-green-50 dark:bg-green-900/20 px-1 rounded">5430</code>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <code className="bg-green-50 dark:bg-green-900/20 px-1 rounded">ALL</code>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <code className="bg-green-50 dark:bg-green-900/20 px-1 rounded">358</code>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <code className="bg-green-50 dark:bg-green-900/20 px-1 rounded">3201</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 搜索结果区域 */}
      {results.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              识别结果 ({results.length})
            </h3>
          </div>

          <div className="space-y-4">
            {results.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* 产品图片 */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg border flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.partNumber}
                          width={64}
                          height={64}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <Cpu className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* 产品信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {item.partNumber}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            丝印: {item.silkscreen}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.package}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.pins}脚
                          </Badge>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(item.partNumber)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            favorites.includes(item.partNumber)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div>制造商: {item.manufacturer}</div>
                      <div>分类: {item.category}</div>
                      <div>描述: {item.description}</div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Package className="h-3 w-3 mr-1" />
                        查看详情
                      </Button>
                      {item.datasheetUrl && (
                        <Button size="sm" variant="outline" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          数据手册
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 无结果提示 */}
      {search && !isLoading && results.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              未找到匹配结果
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              未匹配到丝印 "<span className="font-medium text-blue-600 dark:text-blue-400">{search}</span>" 的结果。
              <br />
              请尝试修改丝印内容或检查输入是否正确。
            </p>
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={() => setSearch('')}>
                重新搜索
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}