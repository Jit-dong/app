"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function AlternativesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // 检查是否显示使用说明
  useEffect(() => {
    const hideInstructions = localStorage.getItem('alternatives-hide-instructions');
    if (!hideInstructions) {
      // 首次访问，默认不显示说明（折叠状态）
      setShowInstructions(false);
    }
  }, []);

  // 执行搜索 - 跳转到结果页面
  const handleSearch = () => {
    if (!search.trim()) return;

    // 跳转到结果页面
    const params = new URLSearchParams();
    params.set('q', search);
    router.push(`/alternatives/results?${params.toString()}`);
  };

  // 处理回车搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 切换使用说明显示状态
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  // 处理"不再显示"选项
  const handleDontShowAgain = () => {
    const newValue = !dontShowAgain;
    setDontShowAgain(newValue);

    if (newValue) {
      localStorage.setItem('alternatives-hide-instructions', 'true');
    } else {
      localStorage.removeItem('alternatives-hide-instructions');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-3 py-6 md:px-6 lg:px-8">
        {/* 返回按钮 - 移动端优化 */}
        <div className="mb-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/20 p-2 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">返回</span>
          </Button>
        </div>

        {/* 页面标题 - 移动端优化 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg mb-3">
            <Search className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            查找替代
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            输入芯片型号，快速找到合适的替代方案
          </p>
        </div>

        {/* 使用说明 - 移动端优化 */}
        <div className="mb-5">
          {!showInstructions ? (
            /* 折叠状态 */
            <div className="bg-gradient-to-r from-orange-50/80 to-yellow-50/80 dark:bg-orange-900/20 backdrop-blur-sm rounded-xl border border-orange-200/50 dark:border-orange-700/30 p-3">
              <button
                onClick={toggleInstructions}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-orange-700 dark:text-orange-300 font-medium text-sm">
                    💡 首次使用？点击查看使用说明
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </button>
            </div>
          ) : (
            /* 展开状态 */
            <div className="bg-gradient-to-r from-orange-50/80 to-yellow-50/80 dark:bg-orange-900/20 backdrop-blur-sm rounded-xl border border-orange-200/50 dark:border-orange-700/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-orange-800 dark:text-orange-200 flex items-center gap-2">
                  📖 查替代功能使用说明
                </h3>
                <button
                  onClick={toggleInstructions}
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-orange-700 dark:text-orange-300">
                {/* 型号输入建议 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🔍 型号输入建议：
                  </h4>
                  <ul className="space-y-1 ml-4 text-xs">
                    <li>• 请输入完整的产品订购型号获得精确结果</li>
                    <li className="ml-4 text-orange-600 dark:text-orange-400">示例：TPS563201DDCR（推荐）</li>
                    <li>• 输入产品系列号将显示该系列所有型号</li>
                    <li className="ml-4 text-orange-600 dark:text-orange-400">示例：TPS563201</li>
                    <li>• 支持模糊匹配，但可能影响结果准确性</li>
                  </ul>
                </div>

                {/* 查替代说明 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🔄 查替代功能说明：
                  </h4>
                  <div className="space-y-2 ml-4 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">📦</span>
                      <div>
                        <span className="font-semibold">查询父型号（如：TPS563201）</span>
                        <p className="text-xs mt-1">显示该芯片的基本信息和所有可订购的子型号变体</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">🎯</span>
                      <div>
                        <span className="font-semibold">查询子型号（如：TPS563201DDCR）</span>
                        <p className="text-xs mt-1">显示该具体型号的详细信息和替代料推荐</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 替代等级说明 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🏆 替代等级说明：
                  </h4>
                  <div className="space-y-2 ml-4 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">🥇</span>
                      <div>
                        <span className="font-semibold text-green-600 dark:text-green-400">完全替代（BOM2BOM）</span>
                        <p className="text-xs mt-1">封装、管脚、电气特性完全相同，可直接替换</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">🥈</span>
                      <div>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">管脚相同（P2P）</span>
                        <p className="text-xs mt-1">管脚定义相同，封装可能不同，需确认电气参数</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">🥉</span>
                      <div>
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">功能相近</span>
                        <p className="text-xs mt-1">功能类似但参数可能不同，需要重新设计验证</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600 dark:text-gray-400 font-bold">📦</span>
                      <div>
                        <span className="font-semibold text-gray-600 dark:text-gray-400">封装相同</span>
                        <p className="text-xs mt-1">仅封装尺寸相同，功能可能完全不同</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 结果分类说明 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🌍 结果分类说明：
                  </h4>
                  <div className="space-y-2 ml-4 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 font-bold">🇨🇳</span>
                      <div>
                        <span className="font-semibold">国内品牌</span>
                        <p className="text-xs mt-1">中国大陆品牌的替代料选择</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">🌍</span>
                      <div>
                        <span className="font-semibold">国外品牌</span>
                        <p className="text-xs mt-1">海外品牌的替代料选择</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">🏢</span>
                      <div>
                        <span className="font-semibold">相同品牌</span>
                        <p className="text-xs mt-1">同一品牌内的其他型号选择</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 不再显示选项 */}
                <div className="flex items-center gap-2 pt-2 border-t border-orange-200/50 dark:border-orange-700/30">
                  <input
                    type="checkbox"
                    id="dontShowAgain"
                    checked={dontShowAgain}
                    onChange={handleDontShowAgain}
                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="dontShowAgain" className="text-sm cursor-pointer">
                    ☑️ 不再显示此说明
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 搜索区域 - 移动端优化 */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-200/30 dark:border-gray-700/30 p-5 mb-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1">
                输入芯片型号
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                支持完整型号或系列号查询
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="例如：TPS563201DDCR 或 TPS5"
                  className="w-full px-4 py-3 text-base border-2 border-orange-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-3 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!search.trim()}
                className="px-6 py-3 text-base bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Search className="h-4 w-4 mr-2" />
                查替代
              </Button>
            </div>
          </div>
        </div>

        {/* 功能特点 - 移动端优化 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
              精确查找
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              支持父型号和子型号查询，精确匹配芯片系列和具体型号
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-3">
              <Search className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
              系列展示
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              完整展示芯片系列的所有子型号和订购选项
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30 dark:border-gray-700/30">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-3">
              <Info className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
              筛选对比
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              按封装、管脚、温度等参数筛选，快速找到合适的型号
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
