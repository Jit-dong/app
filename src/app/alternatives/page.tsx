"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 md:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg mb-4">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            查找替代
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            输入芯片型号，快速找到合适的替代方案
          </p>
        </div>

        {/* 使用说明 */}
        <div className="mb-8">
          {!showInstructions ? (
            /* 折叠状态 */
            <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-blue-700/30 p-4">
              <button
                onClick={toggleInstructions}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    💡 首次使用？点击查看使用说明
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </button>
            </div>
          ) : (
            /* 展开状态 */
            <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-blue-700/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  📖 查替代功能使用说明
                </h3>
                <button
                  onClick={toggleInstructions}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-blue-700 dark:text-blue-300">
                {/* 型号输入建议 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🔍 型号输入建议：
                  </h4>
                  <ul className="space-y-1 ml-4 text-sm">
                    <li>• 请输入完整的产品订购型号获得精确结果</li>
                    <li className="ml-4 text-blue-600 dark:text-blue-400">示例：TPS563201DDCR（推荐）</li>
                    <li>• 输入产品系列号将显示该系列所有型号</li>
                    <li className="ml-4 text-blue-600 dark:text-blue-400">示例：TPS563201</li>
                    <li>• 支持模糊匹配，但可能影响结果准确性</li>
                  </ul>
                </div>

                {/* 查替代说明 */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    🔄 查替代功能说明：
                  </h4>
                  <div className="space-y-2 ml-4 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">📦</span>
                      <div>
                        <span className="font-semibold">查询父型号（如：TPS563201）</span>
                        <p className="text-xs mt-1">显示该芯片的基本信息和所有可订购的子型号变体</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 font-bold">🎯</span>
                      <div>
                        <span className="font-semibold">查询子型号（如：TPS563201DDCR）</span>
                        <p className="text-xs mt-1">显示该具体型号的详细信息和订购详情</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">🔍</span>
                      <div>
                        <span className="font-semibold">筛选功能</span>
                        <p className="text-xs mt-1">可按封装、管脚数、工作温度等条件筛选子型号</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">📋</span>
                      <div>
                        <span className="font-semibold">显示内容</span>
                        <p className="text-xs mt-1">仅显示产品信息和订购详情，不包含参考设计、技术文档等</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 不再显示选项 */}
                <div className="flex items-center gap-2 pt-2 border-t border-blue-200/50 dark:border-blue-700/30">
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

        {/* 搜索区域 */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8 mb-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                输入芯片型号
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                支持完整型号或系列号查询
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="例如：TPS563201DDCR 或 TPS563201"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!search.trim()}
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="h-5 w-5 mr-3" />
                查替代
              </Button>
            </div>
          </div>
        </div>

        {/* 功能特点 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              精确查找
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              支持父型号和子型号查询，精确匹配芯片系列和具体型号
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              系列展示
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              完整展示芯片系列的所有子型号和订购选项
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              筛选对比
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              按封装、管脚、温度等参数筛选，快速找到合适的型号
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
