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
  CheckCircle2
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="silkscreen-reverse-page max-w-6xl mx-auto px-4 py-8 md:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            丝印反查
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            通过芯片表面丝印快速识别电子元器件，智能搜索引擎助您精准查找
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 mb-8">
          <div className="space-y-6">
            {/* Main Search Input */}
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                className="w-full pl-16 pr-6 py-5 text-xl bg-gray-50/50 dark:bg-gray-700/50 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder:text-gray-400 text-gray-900 dark:text-gray-100 font-medium"
                placeholder="请输入芯片丝印（如 5430、ALL、358）"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={handleSearch}
                disabled={!search.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 font-semibold"
              >
                <Search className="h-5 w-5 mr-3" />
                开始识别
              </Button>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <Camera className="h-4 w-4 mr-2" />
                  拍照识别
                </Button>
                <Button variant="outline" className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <Upload className="h-4 w-4 mr-2" />
                  上传图片
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/30 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <History className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              搜索历史
            </h3>
            <div className="flex flex-wrap gap-3">
              {searchHistory.slice(0, 8).map((item, index) => (
                <button
                  key={index}
                  onClick={() => useHistorySearch(item)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Panel */}
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-950/30 dark:via-blue-950/30 dark:to-cyan-950/30 rounded-3xl border border-indigo-200/50 dark:border-indigo-800/30 shadow-lg mb-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-3xl transition-all duration-200"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-md">
                <Info className="h-6 w-6 text-white" />
              </div>
              使用指南与搜索技巧
            </h3>
            <div className="p-2 bg-white/50 dark:bg-gray-700/50 rounded-xl">
              {showInstructions ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </button>

          {showInstructions && (
            <div className="px-6 pb-6 space-y-6">
              {/* What is Silkscreen Lookup */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-gray-700/50">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    什么是丝印反查？
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    通过元器件表面的丝印（印字、标记代码）来识别电子元器件型号。
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-gray-700/50">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    如何搜索？
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    直接输入丝印标记。如果没有结果，尝试删除后缀（批次、日期代码）。
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-gray-700/50">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    找不到结果？
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    检查输入准确性或尝试部分标记。使用下方的高级搜索技巧。
                  </p>
                </div>
              </div>

              {/* Advanced Search Tips */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 dark:border-gray-700/60">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  高级搜索技巧
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">全部丝印搜不出时，可以删减后缀尝试</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">多行可以尝试每行分别搜索</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">字样为品牌logo标识，不作为搜索关键词，多行可以分开搜索</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                        <strong>ADI品牌</strong>此类型的芯片需要两行一起搜索
                      </span>
                    </div>
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