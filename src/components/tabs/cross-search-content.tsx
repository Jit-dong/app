"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react"; // Assuming icons for search and dropdown

export default function CrossSearchContent() {
  const [selectedBrand, setSelectedBrand] = useState<{ code: string, name: string } | null>(null);
  const [modelKeyword, setModelKeyword] = useState("");

  // Placeholder for brand data - in a real app, this would come from an API
  const brands = [
    { code: 'STM', name: 'STMicroelectronics' },
    { code: 'TI', name: 'Texas Instruments' },
    { code: 'ESP', name: 'Espressif' },
    { code: 'ADI', name: 'Analog Devices' },
    { code: 'NXP', name: 'NXP Semiconductors' },
  ];

  const handleSearch = () => {
    if (!selectedBrand && !modelKeyword) {
      // Handle case where both are empty, maybe show a message
      console.log("请选择品牌或输入型号关键词");
      return;
    }
    console.log("Searching for:", { brandCode: selectedBrand?.code, keyword: modelKeyword });
    // TODO: Implement actual API call here
    // fetch('/api/chips/search', { method: 'POST', body: JSON.stringify({ brandCode: selectedBrand?.code, keyword: modelKeyword }) });
  };

  return (
    <div className="cross-search-page space-y-6 p-4 md:p-6 lg:p-8 max-w-screen-md mx-auto"> {/* 增加页面内边距、间距，限制最大宽度并居中 */}

      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">交叉搜索</h1> {/* 页面标题 */}

      {/* 搜索输入区域 - 包含品牌选择和型号输入 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4 border border-gray-200 dark:border-gray-700"> {/* 搜索区域卡片化 */}

        {/* 品牌选择器 (Placeholder) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">选择品牌</label>
          {/* Replace with actual searchable dropdown component */}
          <div className="relative">
            <button className="flex items-center justify-between w-full px-4 py-2.5 text-left bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <span>{selectedBrand ? selectedBrand.name : '请选择芯片品牌'}</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
            {/* Dropdown options would appear here when button is clicked */}
            {/* For now, a simple selection example */}
            {/* 
              <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {brands.map((brand) => (
                  <li key={brand.code} onClick={() => setSelectedBrand(brand)} className="text-gray-900 dark:text-gray-100 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white">
                    {brand.name}
                  </li>
                ))}
              </ul>
            */}
          </div>
           {/* Simple select for now, replace with searchable dropdown later */}
           <select 
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              onChange={(e) => {
                const brandCode = e.target.value;
                const brand = brands.find(b => b.code === brandCode);
                setSelectedBrand(brand || null);
              }}
              value={selectedBrand?.code || ''}
           >
              <option value="">请选择芯片品牌</option>
              {brands.map(brand => (
                <option key={brand.code} value={brand.code}>{brand.name}</option>
              ))}
           </select>
        </div>

        {/* 型号输入框 */}
        <div className="space-y-2">
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">型号关键词</label>
           <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="请输入型号关键词..."
                value={modelKeyword}
                onChange={e => setModelKeyword(e.target.value)}
              />
           </div>
        </div>

        {/* 搜索按钮 */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg shadow-sm transition-colors text-base font-semibold"
          >
            搜索
          </Button>
        </div>

      </div>

      {/* TODO: Add search results display area below */} 

    </div>
  );
} 