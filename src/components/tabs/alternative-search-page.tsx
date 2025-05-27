"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, ListChecks, FileText, Globe, Layers, Package, BookOpen, RefreshCw } from "lucide-react";
import Image from "next/image";

const mockData = [
  {
    original: {
      model: "NVD5117PLT4G",
      brand: "onsemi (安森美)",
      logo: "/brands/ST.png",
      img: "/brands/chip1.png",
      datasheet: true,
      category: "MOSFET",
      lifecycle: "量产",
      package: "DPAK-3"
    },
    alternative: {
      model: "MCU50P06Y",
      brand: "MCC (美微科)",
      logo: "/brands/MAX.png",
      img: "/brands/chip2.png",
      datasheet: true,
      category: "MOSFET",
      lifecycle: "量产",
      package: "DPAK"
    }
  }
];

const steps = [
  "确定搜索型号",
  "一级筛选（国内、国外、同品牌）",
  "二级筛选（等级、封装、生命周期）",
  "参数对比（勾选对比参数）"
];

export default function AlternativeSearchPage({ onBack }: { onBack?: () => void }) {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between py-4 px-2">
        {/* <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button> */}
        <div className="text-lg font-bold text-gray-800">查替代料</div>
        <Button variant="outline" className="rounded-xl px-4 py-1 text-sm font-semibold border-orange-200 text-orange-600">批量查询</Button>
      </div>

      {/* 主搜索框 */}
      <form className="flex items-center justify-center mb-6" onSubmit={e => { e.preventDefault(); }}>
        <div className="w-full max-w-xl flex items-center bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-3 relative" style={{boxShadow:'0 4px 24px 0 rgba(255,180,60,0.08),0 1.5px 8px 0 rgba(255,140,0,0.08)'}}>
          <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            className="flex-1 pl-12 pr-4 py-2 text-lg bg-transparent outline-none placeholder:text-gray-400 text-gray-800 font-semibold"
            placeholder="原型号"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 px-7 py-2 rounded-2xl text-base font-bold text-white shadow-md"
            style={{background: 'linear-gradient(90deg, #ffb347 0%, #ff7b00 100%)', boxShadow:'0 2px 12px 0 rgba(255,180,60,0.18)'}}
          >
            搜索
          </button>
        </div>
      </form>

      {/* 步骤说明 */}
      <div className="flex flex-col gap-4 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-base shadow-sm">{i+1}</div>
            <div className="text-gray-700 text-base font-medium leading-7">{s}</div>
          </div>
        ))}
      </div>

      {/* 对比表格 */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-800">替代料（共 1 个）</span>
          <Button variant="outline" size="sm" className="rounded px-2 py-1 text-xs ml-2">切换中文</Button>
          <Button variant="outline" size="sm" className="rounded px-2 py-1 text-xs ml-2">隐藏相同</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th></th>
                <th className="px-4">原型号</th>
                <th className="px-4 text-green-600">pin to pin</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, idx) => (
                <tr key={idx} className="bg-white rounded-xl shadow border">
                  <td className="align-top pt-6">
                    <input type="checkbox" checked readOnly className="accent-orange-500" />
                  </td>
                  <td className="bg-gray-50 rounded-xl p-3 align-top min-w-[140px]">
                    <div className="font-bold text-base text-gray-800 mb-1">{row.original.model}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <Image src={row.original.logo} alt="logo" width={20} height={20} className="rounded bg-white border" />
                      <span className="text-xs text-gray-500">{row.original.brand}</span>
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      <Image src={row.original.img} alt="chip" width={36} height={24} className="object-contain" />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <FileText className="h-4 w-4 text-orange-400" />
                      <span className="text-xs text-blue-600 cursor-pointer">数据手册</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      <span className="bg-blue-50 text-blue-600 rounded px-2 py-0.5 text-xs font-medium">{row.original.category}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">{row.original.lifecycle}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{row.original.package}</span>
                    </div>
                  </td>
                  <td className="bg-green-50 rounded-xl p-3 align-top min-w-[140px]">
                    <div className="font-bold text-base text-gray-800 mb-1">{row.alternative.model}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <Image src={row.alternative.logo} alt="logo" width={20} height={20} className="rounded bg-white border" />
                      <span className="text-xs text-gray-500">{row.alternative.brand}</span>
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      <Image src={row.alternative.img} alt="chip" width={36} height={24} className="object-contain" />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <FileText className="h-4 w-4 text-orange-400" />
                      <span className="text-xs text-blue-600 cursor-pointer">数据手册</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      <span className="bg-blue-50 text-blue-600 rounded px-2 py-0.5 text-xs font-medium">{row.alternative.category}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600">{row.alternative.lifecycle}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{row.alternative.package}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 