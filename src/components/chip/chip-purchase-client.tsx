'use client';

import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  FileText,
  ChevronDown,
  Filter,
  Search,
  Package,
  Truck,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Heart,
  Eye,
  ShoppingCart,
  Info
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProcessedChip extends Chip {
  displayManufacturer: string;
  displayCategory: string;
  displayDescription: string;
}

interface ChipPurchaseClientProps {
  chip: ProcessedChip;
}

// 模拟订购信息数据
const mockPurchaseData = [
  {
    id: 'TPS563201DCT',
    model: 'TPS563201DCT',
    package: 'SOT23-6',
    workTemp: '-40°C至125°',
    lifecycle: '量产',
    rohs: '2',
    suppliers: [
      {
        name: '立创商城',
        price: '¥3.2015',
        stock: '3201',
        delivery: '现货',
        moq: '1',
        rating: 4.8
      },
      {
        name: '得捷电子',
        price: '¥3.4520',
        stock: '1500',
        delivery: '1-2天',
        moq: '10',
        rating: 4.7
      }
    ]
  },
  {
    id: 'TPS563201DDCT',
    model: 'TPS563201DDCT',
    package: 'SOT23-6',
    workTemp: '-40°C至125°',
    lifecycle: '量产',
    rohs: '2',
    suppliers: [
      {
        name: '立创商城',
        price: '¥3.4015',
        stock: '2156',
        delivery: '现货',
        moq: '1',
        rating: 4.8
      }
    ]
  }
];

export default function ChipPurchaseClient({ chip }: ChipPurchaseClientProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('全部');
  const [selectedPackage, setSelectedPackage] = useState('全部');
  const [selectedTemp, setSelectedTemp] = useState('全部');
  const [selectedRohs, setSelectedRohs] = useState('全部');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share && currentUrl) {
      try {
        await navigator.share({
          title: `芯片订购: ${chip.model}`,
          text: `查看 ${chip.model} (${chip.manufacturer}) 的订购信息。`,
          url: currentUrl,
        });
      } catch (error) {
        console.error('分享失败:', error);
        toast({
          title: "分享失败",
          description: "无法完成分享操作。",
          variant: "destructive",
        });
      }
    } else if (currentUrl) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: "分享链接已复制",
          description: "链接已复制到剪贴板。",
        });
      } catch (error) {
        console.error('复制失败:', error);
        toast({
          title: "复制失败",
          description: "无法复制链接到剪贴板。",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 页面顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between py-3 px-4">
          <Link href="/search?q=tps563201" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label="返回">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">订购信息</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="收藏">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="分享" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* 搜索栏 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="tps563201"
              value="tps563201"
              className="flex-1 border-0 bg-gray-50 dark:bg-gray-700"
              readOnly
            />
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              搜索
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            搜索结果：共 <span className="font-medium text-blue-600">4</span> 个型号
          </p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">筛选条件</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {/* 品牌筛选 - 基于查询结果 */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="品牌" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">品牌</SelectItem>
                <SelectItem value="TI(德州仪器)">TI(德州仪器)</SelectItem>
                <SelectItem value="STMicroelectronics">STMicroelectronics</SelectItem>
                <SelectItem value="Analog Devices">Analog Devices</SelectItem>
              </SelectContent>
            </Select>

            {/* 分类筛选 - 基于查询结果 */}
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">分类</SelectItem>
                <SelectItem value="开关稳压器-DC/DC转换器">开关稳压器-DC/DC转换器</SelectItem>
                <SelectItem value="微控制器">微控制器</SelectItem>
                <SelectItem value="运算放大器">运算放大器</SelectItem>
              </SelectContent>
            </Select>

            {/* 设计资源筛选 */}
            <Select value={selectedTemp} onValueChange={setSelectedTemp}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="设计资源" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">设计资源</SelectItem>
                <SelectItem value="参考设计">参考设计</SelectItem>
                <SelectItem value="应用指南">应用指南</SelectItem>
                <SelectItem value="技术文章">技术文章</SelectItem>
              </SelectContent>
            </Select>

            {/* 排序方式 */}
            <Select value={selectedRohs} onValueChange={setSelectedRohs}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">排序方式</SelectItem>
                <SelectItem value="相关性由强到弱">相关性由强到弱</SelectItem>
                <SelectItem value="信息更新时间">信息更新时间</SelectItem>
              </SelectContent>
            </Select>

            {/* 更多筛选 */}
            <Select>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="更多" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="工作温度">工作温度</SelectItem>
                <SelectItem value="环保等级">环保等级</SelectItem>
                <SelectItem value="封装类型">封装类型</SelectItem>
                <SelectItem value="供应商">供应商</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 产品列表 */}
        <div className="space-y-4">
          {mockPurchaseData.map((product) => (
            <Card key={product.id} className="bg-white dark:bg-gray-800 shadow-sm">
              <CardContent className="p-4">
                {/* 产品标题 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {product.model}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400">量产</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      品牌：{chip.displayManufacturer}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      描述：{chip.displayDescription}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* 参考设计 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">参考设计</h4>
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        {product.id}EVM-715
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      品牌：{chip.displayManufacturer}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      描述：{product.package} SWIFT 降压转换器评估模块
                    </p>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* 技术文档 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">技术文档</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Keeping DC/DC solutions (super) simple for cost-sensitive applications
                  </p>
                </div>

                <Separator className="my-3" />

                {/* 应用指南 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">应用指南</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Keeping DC/DC solutions (super) simple for cost-sensitive applications
                  </p>
                </div>

                <Separator className="my-3" />

                {/* 行业资讯 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">行业资讯</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Keeping DC/DC solutions (super) simple for cost-sensitive applications
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
