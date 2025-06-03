"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Camera,
  Info,
  Upload,
  History,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function SilkscreenReversePage({ onBack }: { onBack?: () => void }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('silkscreen-search-history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 执行搜索 - 跳转到结果页面
  const handleSearch = () => {
    if (!search.trim()) return;

    // 保存搜索历史
    const newHistory = [search, ...searchHistory.filter(h => h !== search)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('silkscreen-search-history', JSON.stringify(newHistory));

    // 跳转到结果页面
    const params = new URLSearchParams();
    params.set('q', search);
    router.push(`/silkscreen/results?${params.toString()}`);
  };

  // 处理回车搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 使用历史搜索
  const useHistorySearch = (historyItem: string) => {
    setSearch(historyItem);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-3 py-6 md:px-6 lg:px-8">
        {/* 返回按钮 - 移动端优化 */}
        <div className="mb-4">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/20 p-2 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回首页</span>
          </Button>
        </div>

        {/* 页面标题 - 移动端优化 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg mb-4">
            <Search className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3 leading-tight">
            丝印反查
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            通过芯片表面丝印快速识别电子元器件，智能搜索引擎助您精准查找
          </p>
        </div>

        {/* 搜索区域 - 移动端优化 */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-orange-200/60 dark:border-gray-700/50 p-5 mb-6 shadow-xl shadow-orange-100/50 dark:shadow-gray-900/20">
          <div className="space-y-4">
            {/* 搜索输入框 */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 text-base bg-gray-50/50 dark:bg-gray-700/50 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-xl outline-none focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
                placeholder="请输入芯片丝印（如 5430、ALL、358）"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* 操作按钮 - 移动端优化 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSearch}
                disabled={!search.trim()}
                className="flex-1 sm:flex-none bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 text-base rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 font-medium"
              >
                <Search className="h-4 w-4 mr-2" />
                开始识别
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200">
                  <Camera className="h-4 w-4 mr-2" />
                  拍照
                </Button>
                <Button variant="outline" className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200">
                  <Upload className="h-4 w-4 mr-2" />
                  上传
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索历史 - 移动端优化 */}
        {searchHistory.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50 dark:border-gray-700/50 p-4 mb-6">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <History className="h-3 w-3 text-purple-600 dark:text-purple-400" />
              </div>
              搜索历史
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.slice(0, 8).map((item, index) => (
                <button
                  key={index}
                  onClick={() => useHistorySearch(item)}
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800 dark:hover:to-purple-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 使用指南 - 移动端优化 */}
        <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950/30 dark:via-yellow-950/30 dark:to-amber-950/30 rounded-2xl border border-orange-200/50 dark:border-orange-800/30 shadow-lg mb-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-2xl transition-all duration-200"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-md flex items-center justify-center">
                <Info className="h-4 w-4 text-white" />
              </div>
              使用指南与搜索技巧
            </h3>
            <div className="w-6 h-6 bg-white/50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center">
              {showInstructions ? (
                <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </button>

          {showInstructions && (
            <div className="px-4 pb-4 space-y-4">
              {/* 基本说明 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    什么是丝印反查？
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    通过元器件表面的丝印（印字、标记代码）来识别电子元器件型号。
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    如何搜索？
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    直接输入丝印标记。如果没有结果，尝试删除后缀（批次、日期代码）。
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    找不到结果？
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    检查输入准确性或尝试部分标记。使用下方的高级搜索技巧。
                  </p>
                </div>
              </div>

              {/* 高级搜索技巧 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200/50 dark:border-gray-700/50">
                <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  高级搜索技巧
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                    <span className="text-gray-700 dark:text-gray-300">全部丝印搜不出时，可以删减后缀尝试</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                    <span className="text-gray-700 dark:text-gray-300">多行可以尝试每行分别搜索</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                    <span className="text-gray-700 dark:text-gray-300">字样为品牌logo标识，不作为搜索关键词</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-1.5"></div>
                    <span className="text-orange-600 dark:text-orange-400 font-medium">
                      <strong>ADI品牌</strong>此类型的芯片需要两行一起搜索
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}