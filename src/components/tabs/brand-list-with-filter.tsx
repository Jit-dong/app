"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// mock 品牌数据
const allBrands = [
  {
    name: "ADI(亚德诺)",
    logo: "/brands/ST.png",
    country: "美国",
    desc: "全球领先的高性能模拟技术公司，专注于信号处理与电源管理。",
    fields: ["工业应用", "汽车电子", "5G与通信网络", "医疗"],
    type: "IDM",
    category: ["信号链", "电源管理"]
  },
  {
    name: "TI(德州仪器)",
    logo: "/brands/TI.png",
    country: "美国",
    desc: "全球著名半导体公司，模拟与嵌入式处理器领域的领导者。",
    fields: ["工业应用", "消费电子", "5G与通信网络", "汽车电子"],
    type: "IDM",
    category: ["电源管理", "微控制器"]
  },
  {
    name: "Renesas(瑞萨)",
    logo: "/brands/Intersil.png",
    country: "日本",
    desc: "日本知名半导体厂商，专注于汽车与工业解决方案。",
    fields: ["汽车电子", "工业应用", "5G与通信网络"],
    type: "IDM",
    category: ["微控制器", "功率器件"]
  },
  {
    name: "MOLEX(莫仕)",
    logo: "/brands/MAX.png",
    country: "美国",
    desc: "全球领先的连接器制造商，广泛应用于汽车、医疗等领域。",
    fields: ["汽车电子", "医疗"],
    type: "IDH",
    category: ["连接器"]
  },
  {
    name: "NXP(恩智浦)",
    logo: "/brands/NXP.png",
    country: "欧洲",
    desc: "全球领先的汽车电子与安全连接解决方案供应商。",
    fields: ["智慧安全", "汽车电子", "智能家居", "工业应用"],
    type: "IDM",
    category: ["微控制器", "射频"]
  },
  {
    name: "VISHAY(威世)",
    logo: "/brands/VISHAY.png",
    country: "美国",
    desc: "全球最大的分立半导体和无源元件制造商之一。",
    fields: ["工业应用", "电源", "照明"],
    type: "虚拟IDM",
    category: ["功率器件", "传感器"]
  },
  {
    name: "JRC(日本无线)",
    logo: "/brands/JRC.png",
    country: "日本",
    desc: "日本知名模拟IC和射频IC供应商。",
    fields: ["消费电子", "工业应用"],
    type: "IDM",
    category: ["信号链"]
  },
  {
    name: "Toshiba(东芝)",
    logo: "/brands/Toshiba.png",
    country: "日本",
    desc: "全球知名的综合性半导体制造商，产品涵盖存储、功率器件等。",
    fields: ["工业应用", "汽车电子", "能源"],
    type: "IDM",
    category: ["功率器件", "存储器"]
  },
  {
    name: "Infineon(英飞凌)",
    logo: "/brands/ Infineon.png",
    country: "欧洲",
    desc: "欧洲领先的半导体公司，专注于汽车、工业和安全应用。",
    fields: ["汽车电子", "工业应用", "能源"],
    type: "IDM",
    category: ["功率器件", "微控制器"]
  },
  {
    name: "Fujitsu(富士通)",
    logo: "/brands/ Fujitsu.png",
    country: "日本",
    desc: "日本著名IT与半导体企业，存储器和嵌入式解决方案供应商。",
    fields: ["工业应用", "医疗"],
    type: "IDH",
    category: ["存储器"]
  },
];

const countryOptions = [
  "美国", "欧洲", "日本", "韩国", "中国-台湾", "中国-香港", "新加坡", "中国-大陆", "其他"
];
const fieldOptions = [
  "智能家电", "5G与通信网络", "计算机", "消费电子", "工业应用", "安防", "汽车电子", "照明", "轨道交通", "医疗", "电源", "能源", "航空航天"
];
const categoryOptions = [
  "电源管理", "信号链", "存储器", "微控制器", "功率器件", "射频", "传感器", "光电器件", "电机驱动", "显示驱动", "氮化镓", "碳化硅", "连接器"
];
const typeOptions = ["IDM", "IDH", "虚拟IDM"];

const tabOptions = ["推荐", "国内", "国外"];

export default function BrandListWithFilter() {
  const [activeTab, setActiveTab] = useState("推荐");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(6);
  const [brandSearch, setBrandSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // 筛选逻辑
  let filtered = allBrands.filter(b => {
    if (activeTab === "国内") {
      if (!(b.country.includes("中国") || b.country === "新加坡")) return false;
    } else if (activeTab === "国外") {
      if (b.country.includes("中国") || b.country === "新加坡") return false;
    }
    if (selectedCountry && b.country !== selectedCountry) return false;
    if (selectedType && b.type !== selectedType) return false;
    if (selectedFields.length && !selectedFields.every(f => b.fields.includes(f))) return false;
    if (selectedCategory.length && !selectedCategory.every(c => b.category.includes(c))) return false;
    if (brandSearch && !b.name.toLowerCase().includes(brandSearch.trim().toLowerCase())) return false;
    return true;
  });

  // 顶部主搜索框提交
  const handleMainSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setBrandSearch(searchInput);
    setShowCount(6);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* 顶部主搜索框 */}
      <form onSubmit={handleMainSearch} className="flex items-center justify-center mb-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl flex items-center bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-3 relative" style={{boxShadow:'0 4px 24px 0 rgba(255,180,60,0.08),0 1.5px 8px 0 rgba(255,140,0,0.08)'}}>
            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8"/><path d="m20 20-4.5-4.5"/></svg>
            </span>
            <input
              type="text"
              className="flex-1 pl-12 pr-4 py-2 text-lg bg-transparent outline-none placeholder:text-gray-400 text-gray-800 font-semibold"
              placeholder="查品牌 - 查看品牌的产品系列和热门型号"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleMainSearch(); }}
            />
            <button
              type="submit"
              className="ml-4 px-7 py-2 rounded-2xl text-base font-bold text-white shadow-md"
              style={{background: 'linear-gradient(90deg, #ffb347 0%, #ff7b00 100%)', boxShadow:'0 2px 12px 0 rgba(255,180,60,0.18)'}}
            >
              搜索
            </button>
          </div>
        </div>
      </form>
      {/* Tab栏 */}
      <div className="flex gap-6 border-b mb-6 px-2">
        {tabOptions.map(tab => (
          <button
            key={tab}
            className={`pb-2 text-lg font-bold transition-colors duration-200 border-b-2 ${activeTab === tab ? 'border-orange-400 text-orange-600' : 'border-transparent text-gray-400 hover:text-orange-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* 筛选区 */}
      <div className="flex flex-wrap gap-3 mb-6 px-2">
        <select
          className="border rounded-xl px-3 py-2 text-sm bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          value={selectedCountry || ''}
          onChange={e => setSelectedCountry(e.target.value || null)}
        >
          <option value="">国家地域</option>
          {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="border rounded-xl px-3 py-2 text-sm bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          value={selectedType || ''}
          onChange={e => setSelectedType(e.target.value || null)}
        >
          <option value="">企业类型</option>
          {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="flex flex-wrap gap-1 items-center">
          {fieldOptions.map(f => (
            <span
              key={f}
              className={`px-3 py-1 rounded-full text-xs cursor-pointer border font-medium transition-all duration-200 ${selectedFields.includes(f) ? 'bg-orange-100 text-orange-700 border-orange-400 shadow' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-orange-50 hover:text-orange-600'}`}
              onClick={() => setSelectedFields(selectedFields.includes(f) ? selectedFields.filter(x => x !== f) : [...selectedFields, f])}
            >
              {f}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          {categoryOptions.map(c => (
            <span
              key={c}
              className={`px-3 py-1 rounded-full text-xs cursor-pointer border font-medium transition-all duration-200 ${selectedCategory.includes(c) ? 'bg-orange-100 text-orange-700 border-orange-400 shadow' : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-orange-50 hover:text-orange-600'}`}
              onClick={() => setSelectedCategory(selectedCategory.includes(c) ? selectedCategory.filter(x => x !== c) : [...selectedCategory, c])}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      {/* 品牌列表 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md">
        {filtered.length === 0 && <div className="text-center text-gray-400 py-12 text-lg">暂无符合条件的品牌</div>}
        {filtered.slice(0, showCount).map((b, idx) => (
          <div key={b.name} className="flex items-center gap-6 border-b last:border-b-0 py-6 px-4 group transition-all duration-200 hover:bg-orange-50/30 hover:shadow-lg rounded-xl">
            <Image src={b.logo} alt={b.name} width={64} height={64} className="rounded-xl bg-white border p-2 object-contain shadow group-hover:scale-105 transition-transform duration-200" />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1 truncate">{b.name}</div>
              <div className="text-gray-500 text-sm mb-2 truncate">{b.desc}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-gray-100 text-gray-500 rounded px-2 py-0.5 text-xs font-medium shadow-sm">{b.country}</span>
                <span className="bg-gray-100 text-gray-500 rounded px-2 py-0.5 text-xs font-medium shadow-sm">{b.type}</span>
                {b.fields.map(f => <span key={f} className="bg-orange-50 text-orange-600 rounded px-2 py-0.5 text-xs font-medium shadow-sm">{f}</span>)}
                {b.category.map(c => <span key={c} className="bg-blue-50 text-blue-600 rounded px-2 py-0.5 text-xs font-medium shadow-sm">{c}</span>)}
              </div>
            </div>
          </div>
        ))}
        {filtered.length > showCount && (
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="rounded-xl border-orange-200 text-orange-600 font-bold px-8 py-2 shadow" onClick={() => setShowCount(showCount + 6)}>加载更多</Button>
          </div>
        )}
      </div>
    </div>
  );
} 