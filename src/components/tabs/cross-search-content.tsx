"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, History, Star, Filter, X } from "lucide-react";
import ChipListItem from "@/components/shared/chip-list-item";
import type { Chip } from "@/lib/types";
import Image from "next/image";

export default function CrossSearchContent() {
  const [selectedBrand, setSelectedBrand] = useState<{ code: string, name: string } | null>(null);
  const [modelKeyword, setModelKeyword] = useState("");
  const [brandSearchTerm, setBrandSearchTerm] = useState(""); // State for the brand input
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside
  const [searchResults, setSearchResults] = useState<Chip[]>([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [hasSearched, setHasSearched] = useState(false); // State to track if search has been performed
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "STM32F407", "TPS5430", "ESP32", "LM358", "AMS1117", "ATmega328P",
    "LM2596", "NE555", "74HC595", "Arduino", "Raspberry Pi", "STM32F103"
  ]); // Recent searches - 更多项目
  const [showAllBrands, setShowAllBrands] = useState(false); // State to show more brands

  // Placeholder for brand data - in a real app, this would come from an API
  const brands = [
    { code: 'STM', name: 'STMicroelectronics' },
    { code: 'TI', name: 'Texas Instruments' },
    { code: 'ESP', name: 'Espressif' },
    { code: 'ADI', name: 'Analog Devices' },
    { code: 'NXP', name: 'NXP Semiconductors' },
    { code: 'INF', name: 'Infineon Technologies' },
    { code: 'RNS', name: 'Renesas Electronics' },
    { code: 'MPS', name: 'Monolithic Power Systems' },
    { code: 'TXC', name: 'TXC Corporation' },
    { code: 'CYP', name: 'Cypress Semiconductor' },
    { code: 'MAX', name: 'Maxim Integrated' },
    { code: 'LTC', name: 'Linear Technology' },
    // Add more brands as needed
  ];

  // Filtered brands based on search term
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  // 推荐品牌 (使用public目录中的实际图片)
  const recommendedBrands = [
    { code: 'TI', name: 'Texas Instruments', imageUrl: '/brands/TI.png', category: '模拟芯片' },
    { code: 'STM', name: 'STMicroelectronics', imageUrl: '/brands/ST.png', category: '微控制器' },
    { code: 'NXP', name: 'NXP Semiconductors', imageUrl: '/brands/NXP.png', category: '汽车电子' },
    { code: 'MAX', name: 'Maxim Integrated', imageUrl: '/brands/MAX.png', category: '模拟芯片' },
    { code: 'MICROCHIP', name: 'Microchip Technology', imageUrl: '/brands/MICROCHIP.png', category: '微控制器' },
    { code: 'INF', name: 'Infineon Technologies', imageUrl: '/brands/ Infineon.png', category: '功率器件' },
    { code: 'VISHAY', name: 'Vishay Intertechnology', imageUrl: '/brands/VISHAY.png', category: '分立器件' },
    { code: 'TOSHIBA', name: 'Toshiba', imageUrl: '/brands/Toshiba.png', category: '功率器件' },
    { code: 'FUJITSU', name: 'Fujitsu', imageUrl: '/brands/ Fujitsu.png', category: '存储器件' },
    { code: 'INTERSIL', name: 'Intersil', imageUrl: '/brands/Intersil.png', category: '电源管理' },
    { code: 'JRC', name: 'Japan Radio Company', imageUrl: '/brands/JRC.png', category: '射频器件' },
    { code: 'NTE', name: 'NTE Electronics', imageUrl: '/brands/NTE.png', category: '通用器件' },
  ];

  const handleSearch = () => {
    if (!selectedBrand && !modelKeyword) {
      console.log("Please select a brand or enter model keywords");
      // TODO: Show a user-friendly message (e.g., using a toast notification)
      return;
    }

    // Add to recent searches
    if (modelKeyword) {
      addToRecentSearches(modelKeyword);
    }

    setIsLoading(true);
    setHasSearched(true);
    setSearchResults([]); // Clear previous results

    console.log("Searching for:", { brandCode: selectedBrand?.code, keyword: modelKeyword });

    // Simulate API call with a delay
    setTimeout(() => {
      // TODO: Replace with actual API call to /api/chips/search
      // Example fetch call:
      // fetch('/api/chips/search', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ brandCode: selectedBrand?.code, keyword: modelKeyword }),
      // })
      // .then(res => res.json())
      // .then(data => { setSearchResults(data); setIsLoading(false); })
      // .catch(error => { console.error('Search error:', error); setIsLoading(false); });

      // Mock results for demonstration
      const mockResults: Chip[] = [
        { id: '1', model: 'STM32F407VGT6', manufacturer: 'STMicroelectronics', description: 'High-performance ARM Cortex-M4 MCU with 1MB Flash', datasheetUrl: '#', imageUrl: '#' },
        { id: '2', model: 'TPS5430DDA', manufacturer: 'Texas Instruments', description: '4A Step-Down Converter with 5.5V to 36V Input', datasheetUrl: '#', imageUrl: '#' },
        { id: '3', model: 'ESP32-WROOM-32', manufacturer: 'Espressif', description: 'Wi-Fi & Bluetooth MCU Module with 4MB Flash', datasheetUrl: '#', imageUrl: '#' },
        { id: '4', model: 'LM358', manufacturer: 'Texas Instruments', description: 'Dual Operational Amplifier with Wide Supply Range', datasheetUrl: '#', imageUrl: '#' },
        { id: '5', model: 'AMS1117-3.3', manufacturer: 'Advanced Monolithic Systems', description: '1A Low Dropout Voltage Regulator 3.3V Output', datasheetUrl: '#', imageUrl: '#' },
        { id: '6', model: 'NE555', manufacturer: 'Texas Instruments', description: 'Precision Timer IC for Timing Applications', datasheetUrl: '#', imageUrl: '#' },
      ];

      // Enhanced mock filtering based on keyword and selected brand
      const results = mockResults.filter(chip => {
          const keywordMatch = !modelKeyword ||
                               chip.model.toLowerCase().includes(modelKeyword.toLowerCase()) ||
                               chip.description.toLowerCase().includes(modelKeyword.toLowerCase()) ||
                               chip.manufacturer.toLowerCase().includes(modelKeyword.toLowerCase());
          const brandMatch = !selectedBrand || chip.manufacturer.toLowerCase().includes(selectedBrand.name.toLowerCase());
          return keywordMatch && brandMatch;
      });

      setSearchResults(results); // Set search results
      setIsLoading(false); // End loading

    }, 1500); // Simulate network delay of 1.5 seconds
  };

  // Handle selecting a brand from the dropdown or recommendations
  const handleSelectBrand = (brand: { code: string, name: string }) => {
    setSelectedBrand(brand);
    setBrandSearchTerm(brand.name); // Set input value to selected brand name
    setIsDropdownOpen(false); // Close dropdown
    // Consider triggering search automatically here if desired
    // handleSearch();
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Clear search function
  const clearSearch = () => {
    setSelectedBrand(null);
    setModelKeyword("");
    setBrandSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
  };

  // Add to recent searches
  const addToRecentSearches = (term: string) => {
    if (term && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]); // Keep only 5 recent searches
    }
  };

  return (
    <div className="cross-search-page space-y-6 p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">

      <div className="text-center space-y-3 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          交叉搜索
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg px-4">
          查找不同品牌的等效芯片，快速找到替代方案
        </p>
      </div>

      {/* Search Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Brand Selection (Searchable Dropdown) */}
          <div className="space-y-2 sm:space-y-3" ref={dropdownRef}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              选择品牌
            </label>
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-4 pr-12 py-3 sm:py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
                placeholder="搜索或选择芯片品牌..."
                value={brandSearchTerm}
                onChange={(e) => {
                  setBrandSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedBrand(null);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              {brandSearchTerm && (
                <button
                  onClick={() => {
                    setBrandSearchTerm("");
                    setSelectedBrand(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Dropdown List */}
              {isDropdownOpen && brandSearchTerm && filteredBrands.length > 0 && (
                <ul className="absolute z-20 w-full bg-white dark:bg-gray-800 shadow-xl max-h-48 sm:max-h-60 rounded-lg sm:rounded-xl py-2 text-sm sm:text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none mt-1 sm:mt-2 border border-gray-200 dark:border-gray-700">
                  {filteredBrands.map((brand) => (
                    <li
                      key={brand.code}
                      onClick={() => handleSelectBrand(brand)}
                      className="text-gray-900 dark:text-gray-100 cursor-pointer select-none relative py-2 sm:py-3 px-3 sm:px-4 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors rounded-lg mx-1 sm:mx-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm sm:text-base truncate">{brand.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded ml-2 flex-shrink-0">{brand.code}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {isDropdownOpen && brandSearchTerm && filteredBrands.length === 0 && (
                <div className="absolute z-20 w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg sm:rounded-xl py-3 sm:py-4 px-3 sm:px-4 text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 border border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <Search className="h-6 sm:h-8 w-6 sm:w-8 mx-auto mb-2 text-gray-300" />
                    <p>未找到匹配的品牌</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Model Input Field */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Search className="h-4 w-4" />
              型号关键词
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              </span>
              <input
                type="text"
                className="block w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-200"
                placeholder="请输入型号或关键词..."
                value={modelKeyword}
                onChange={e => {
                  setModelKeyword(e.target.value);
                  addToRecentSearches(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-2">
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg transition-all duration-200 text-sm sm:text-base font-semibold flex-1 sm:flex-none transform hover:scale-105"
              >
                搜索
              </Button>
              {(selectedBrand || modelKeyword || hasSearched) && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <X className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <div className="recent-searches-area space-y-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <History className="h-4 w-4 text-blue-500" /> 最近搜索
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setModelKeyword(search);
                    handleSearch();
                  }}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors truncate text-center border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                  title={search}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Recommendations Section */}
      {!hasSearched && (
        <div className="brand-recommendations-area bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                <Star className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-white" />
              </div>
              品牌推荐
            </h3>
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm flex items-center gap-1 transition-colors"
            >
              {showAllBrands ? '收起' : '查看全部'}
              <ChevronDown className={`h-3 sm:h-4 w-3 sm:w-4 transition-transform ${showAllBrands ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Brand Grid - Mobile optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {(showAllBrands ? recommendedBrands : recommendedBrands.slice(0, 6)).map(brand => (
              <button
                key={brand.code}
                onClick={() => handleSelectBrand(brand)}
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                    {brand.category}
                  </span>
                </div>

                {/* Brand Logo Container */}
                <div className="relative w-full h-10 sm:h-12 md:h-16 mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.imageUrl}
                      alt={`${brand.name} Logo`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110 filter group-hover:brightness-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement?.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                              <span class="text-white font-bold text-sm sm:text-base md:text-lg">${brand.code}</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Brand Info */}
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm leading-tight line-clamp-2 text-center">
                    {brand.name}
                  </h4>
                  <div className="flex items-center justify-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-mono">
                      {brand.code}
                    </span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {/* Additional Features */}
          <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">热门分类:</span>
              {['微控制器', '模拟芯片', '功率器件', '电源管理'].map(category => (
                <button
                  key={category}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  onClick={() => {
                    const categoryBrands = recommendedBrands.filter(b => b.category === category);
                    if (categoryBrands.length > 0) {
                      handleSelectBrand(categoryBrands[0]);
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results Display Area */}
      {hasSearched && (
        <div className="search-results-area bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16">
              <div className="relative">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                <div className="absolute inset-0 w-12 sm:w-16 h-12 sm:h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mt-4 sm:mt-6 font-medium text-center">正在搜索交叉引用...</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 text-center">查找不同品牌的等效芯片</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                    <Search className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-white" />
                  </div>
                  <span className="hidden sm:inline">搜索结果</span>
                  <span className="sm:hidden">结果</span>
                  <span className="text-xs sm:text-sm font-normal bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 sm:px-3 py-1 rounded-full">
                    {searchResults.length}个
                  </span>
                </h3>
                <button
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1"
                >
                  <X className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {searchResults.map((chip) => (
                  <div key={chip.id} className="transform transition-all duration-200 hover:scale-[1.01] sm:hover:scale-[1.02]">
                    <ChipListItem chip={chip} />
                  </div>
                ))}
              </div>

              {/* Search Tips */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm sm:text-base">搜索提示:</h4>
                <ul className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• 尝试不同的品牌组合以获得更好的交叉引用结果</li>
                  <li>• 使用部分型号进行更广泛的搜索</li>
                  <li>• 查看数据手册链接获取详细规格</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 sm:h-10 w-8 sm:w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <X className="h-3 sm:h-4 w-3 sm:w-4 text-red-500" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">未找到结果</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
                未能找到符合您搜索条件的芯片。请尝试调整搜索词或选择不同的品牌。
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-4">
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base"
                >
                  清除搜索
                </Button>
                <Button
                  onClick={() => setHasSearched(false)}
                  className="px-4 sm:px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                >
                  浏览品牌
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}