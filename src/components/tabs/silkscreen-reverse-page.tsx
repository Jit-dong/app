"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Camera, Info, CheckCircle2, XCircle, HelpCircle, FileText } from "lucide-react";

export default function SilkscreenReversePage({ onBack }: { onBack?: () => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="silkscreen-reverse-page space-y-6 p-4 md:p-6 lg:p-8 max-w-screen-md mx-auto">

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">丝印反查</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center space-x-4 border border-gray-200 dark:border-gray-700">
        <div className="flex-grow">
           <div className="relative flex items-center w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                className="flex-1 pl-10 pr-4 py-2 text-lg bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-gray-200 font-semibold"
                placeholder="输入丝印代码/印字/Marking..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-sm transition-colors">
          搜索
        </Button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30 space-y-3">
         <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
           <HelpCircle className="h-5 w-5 text-blue-500" />
           使用说明
         </h3>
         <div className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
           <p>• <strong>什么是丝印反查？</strong> 通过元器件表面的丝印（印字、Marking）来查找其型号。</p>
           <p>• <strong>如何搜索：</strong> 直接输入芯片表面的丝印代码。如果搜不到，可尝试去除末尾的字母（如批次、日期信息），它们通常不是关键字。</p>
           <p>• <strong>找不到怎么办？</strong> 检查丝印输入是否正确，或尝试输入部分丝印。</p>
         </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 space-y-3">
         <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
           <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
           输入示例
         </h3>
         <div className="text-sm space-y-2">
           <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
             <CheckCircle2 className="h-5 w-5" /> 正确：<code>ALL</code>
           </div>
           <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
             <XCircle className="h-5 w-5" /> 错误：<code>IALL</code>
           </div>
           <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
             <XCircle className="h-5 w-5" /> 错误：<code>IALLH</code>
           </div>
         </div>
      </div>

    </div>
  );
} 