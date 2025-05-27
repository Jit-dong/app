"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, TrendingUp, History } from "lucide-react";
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
    // Add more brands as needed
  ];

  // Filtered brands based on search term
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  // Recommended brands (with image URLs)
  const recommendedBrands = [
    { code: 'ADI', name: 'Analog Devices', imageUrl: '/brands/ADI.png' },
    { code: 'TI', name: 'Texas Instruments', imageUrl: '/brands/TI.png' },
    { code: 'RNS', name: 'Renesas Electronics', imageUrl: '/brands/Renesas.png' },
    { code: 'NXP', name: 'NXP Semiconductors', imageUrl: '/brands/NXP.png' },
    { code: 'STM', name: 'STMicroelectronics', imageUrl: '/brands/ST.png' },
    { code: 'MPS', name: 'Monolithic Power Systems', imageUrl: '/brands/MPS.png' },
    // Add more recommended brands with image URLs and ensure corresponding image files exist
  ];

  const handleSearch = () => {
    if (!selectedBrand && !modelKeyword) {
      console.log("请选择品牌或输入型号关键词");
      // TODO: Show a user-friendly message (e.g., using a toast notification)
      return;
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
        { id: '1', model: 'STM32F407VGT6', manufacturer: 'STMicroelectronics', description: 'High-performance ARM Cortex-M4 MCU', datasheetUrl: '#', imageUrl: '#' },
        { id: '2', model: 'TPS5430DDA', manufacturer: 'Texas Instruments', description: '4A Step-Down Converter', datasheetUrl: '#', imageUrl: '#' },
        { id: '3', model: 'ESP32-WROOM-32', manufacturer: 'Espressif', description: 'Wi-Fi & Bluetooth MCU Module', datasheetUrl: '#', imageUrl: '#' },
        { id: '4', model: 'LM358', manufacturer: 'Texas Instruments', description: 'Dual Operational Amplifier', datasheetUrl: '#', imageUrl: '#' },
        { id: '5', model: 'AMS1117-3.3', manufacturer: 'Advanced Monolithic Systems', description: '1A Low Dropout Voltage Regulator', datasheetUrl: '#', imageUrl: '#' },
      ];

      // Simple mock filtering based on keyword and selected brand (for demo)
      const results = mockResults.filter(chip => {
          const keywordMatch = chip.model.toLowerCase().includes(modelKeyword.toLowerCase()) ||
                               chip.description.toLowerCase().includes(modelKeyword.toLowerCase()) ||
                               chip.manufacturer.toLowerCase().includes(modelKeyword.toLowerCase());
          const brandMatch = selectedBrand ? chip.manufacturer === selectedBrand.name : true; // If no brand selected, match all
          return keywordMatch && brandMatch;
      });

      setSearchResults(results); // Set search results
      setIsLoading(false); // End loading

    }, 1000); // Simulate network delay of 1 second
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

  return (
    <div className="cross-search-page space-y-8 p-4 md:p-6 lg:p-8 max-w-screen-xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">交叉搜索</h1>

      {/* Search Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700 mx-auto max-w-lg">
        {/* Horizontal layout for inputs and button */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Brand Selection (Searchable Dropdown) */}
          <div className="space-y-2 flex-1" ref={dropdownRef}> {/* Attach ref here */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">选择品牌</label>
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="搜索或选择芯片品牌..."
                value={brandSearchTerm}
                onChange={(e) => {
                  setBrandSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedBrand(null); // Clear selected brand on input change
                }}
                onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
              />
              {/* Optional: Add a clear button for the input */}
              {/* <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">X</button> */}

              {/* Dropdown List */}
              {isDropdownOpen && brandSearchTerm && filteredBrands.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm mt-1 border border-gray-200 dark:border-gray-700">
                  {filteredBrands.map((brand) => (
                    <li
                      key={brand.code}
                      onClick={() => handleSelectBrand(brand)}
                      className="text-gray-900 dark:text-gray-100 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-white"
                    >
                      {brand.name}
                    </li>
                  ))}
                </ul>
              )}
              {isDropdownOpen && brandSearchTerm && filteredBrands.length === 0 && (
                <div className="absolute z-10 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-2 px-3 text-sm text-gray-500 dark:text-gray-400 mt-1 border border-gray-200 dark:border-gray-700">
                  未找到匹配品牌
                </div>
              )}

            </div>
          </div>

          {/* Model Input Field */}
          <div className="space-y-2 flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">型号关键词</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="请输入其他品牌的型号..."
                value={modelKeyword}
                onChange={e => setModelKeyword(e.target.value)}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-2 md:pt-0"> {/* Adjust padding based on screen size */}
            <Button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-2.5 rounded-lg shadow-md transition-colors text-base font-semibold w-full md:w-auto"
            >
              搜索
            </Button>
          </div>
        </div>

        {/* Recent Searches / Keyword Suggestions Section (Placeholder) - Moved here */}
        <div className="recent-searches-area space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <History className="h-5 w-5 text-green-500" /> 最近搜索 / 关键词
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {/* TODO: Implement actual recent searches or keyword suggestions */}
            <p>点击品牌推荐或输入关键词进行搜索，您的历史记录将显示在此。</p>
          </div>
        </div>

      </div>

      {/* Brand Recommendations Section */}
      {!hasSearched && (
        <div className="brand-recommendations-area bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 space-y-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-orange-500" /> 品牌推荐
          </h3>
          {/* Use grid for a more structured layout */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
            {recommendedBrands.map(brand => (
              // Conditionally render button only if image URL exists
              brand.imageUrl ? (
                <button
                  key={brand.code}
                  onClick={() => handleSelectBrand(brand)} // Use handleSelectBrand directly
                  className="group cursor-pointer flex flex-col items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors text-center h-28 md:h-32 justify-between" // Adjusted padding, height, and added justify-between
                >
                  {/* Brand Image (Logo) Container */}
                  <div className="relative w-full h-12 md:h-16 flex items-center justify-center"> {/* Container for image, removed mb */}
                    <Image
                      src={brand.imageUrl}
                      alt={`${brand.name} Logo`}
                      fill
                      objectFit="contain"
                      className="transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.style.display = 'none';
                         const parent = target.parentElement;
                         if (parent) {
                            // Using a different approach for fallback to ensure centering
                            parent.innerHTML = `<span class="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-center w-full h-full">${brand.name}</span>`;
                         }
                      }}
                    />
                     {/* Fallback text container if image fails - kept for potential future use/debugging but hidden */}
                     <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden">{brand.name}</span>
                  </div>
                  {/* Brand Name */}
                  <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200 mt-2 truncate w-full">{brand.name}</span>
                </button>
              ) : null // Render nothing if no image URL
            ))}
          </div>
        </div>
      )}

      {/* Search Results Display Area */}
      {hasSearched && (
        <div className="search-results-area bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {isLoading ? (
            <div className="flex justify-center py-12">
              {/* TODO: Use a proper LoadingSpinner component */} 
              <p className="text-gray-500 dark:text-gray-400 text-lg">正在搜索...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">搜索结果</h3>
              {searchResults.map((chip) => (
                <ChipListItem key={chip.id} chip={chip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Search className="h-10 w-10 mx-auto mb-4" />
              <p className="text-lg">未找到匹配的芯片。</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
} 