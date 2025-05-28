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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="silkscreen-reverse-page max-w-6xl mx-auto px-4 py-8 md:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Silkscreen Reverse Lookup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Identify electronic components by their surface markings with our advanced search engine
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
                placeholder="Enter component marking (e.g., 5430, ALL, 358)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={handleSearch}
                disabled={!search.trim() || isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-3" />
                    Search Component
                  </>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
                <Button variant="outline" className="px-6 py-3 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
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
              Recent Searches
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
              Search Guidelines & Tips
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
                    What is it?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Identify electronic components by their surface markings (silkscreen, printing, marking codes).
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-gray-700/50">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    How to search?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Enter the marking directly. If no results, try removing suffixes (batch, date codes).
                  </p>
                </div>

                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 border border-white/50 dark:border-gray-700/50">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    No results?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Check input accuracy or try partial markings. Use our advanced tips below.
                  </p>
                </div>
              </div>

              {/* Advanced Search Tips */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 dark:border-gray-700/60">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  Advanced Search Techniques
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Remove suffixes when no results found</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Try searching each line separately for multi-line markings</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Ignore brand logos - focus on alphanumeric codes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                        <strong>ADI chips:</strong> Search both lines together
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                Search Results ({results.length})
              </h3>
            </div>

            <div className="grid gap-6">
              {results.map((item) => (
                <div key={item.id} className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 dark:border-gray-600/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-2xl border-2 border-white/50 dark:border-gray-500/50 flex items-center justify-center overflow-hidden shadow-lg">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.partNumber}
                            width={80}
                            height={80}
                            className="object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : (
                          <Cpu className="h-10 w-10 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                            {item.partNumber}
                          </h4>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-3 py-1">
                              Marking: {item.silkscreen}
                            </Badge>
                            <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 px-3 py-1">
                              {item.package}
                            </Badge>
                            <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 px-3 py-1">
                              {item.pins} pins
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.partNumber)}
                          className="p-3 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-xl transition-all duration-200"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              favorites.includes(item.partNumber)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Manufacturer:</span>
                          <br />
                          <span className="text-gray-600 dark:text-gray-400">{item.manufacturer}</span>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Category:</span>
                          <br />
                          <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                        </div>
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Description:</span>
                          <br />
                          <span className="text-gray-600 dark:text-gray-400">{item.description}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 rounded-xl px-6 py-2 shadow-lg">
                          <Package className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {item.datasheetUrl && (
                          <Button variant="outline" className="border-2 rounded-xl px-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <Download className="h-4 w-4 mr-2" />
                            Datasheet
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

        {/* No Results */}
        {search && !isLoading && results.length === 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 p-12 text-center">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                No Results Found
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                No matches found for marking "<span className="font-bold text-blue-600 dark:text-blue-400">{search}</span>".
                <br />
                Try modifying the input or check our search tips above.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSearch('')}
                  className="border-2 rounded-xl px-8 py-3 text-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}