'use client';

import type { Chip, OrderDetail } from '@/lib/types';
import { findOrderDetailsByChipId } from '@/lib/placeholder-data';
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

export default function ChipPurchaseClient({ chip }: ChipPurchaseClientProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  // 获取该芯片的所有订购详情
  const orderDetails = findOrderDetailsByChipId(chip.id);
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
            搜索结果：共 <span className="font-medium text-blue-600">{orderDetails.length}</span> 个型号
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
          {orderDetails.map((orderDetail) => (
            <Card key={orderDetail.id} className="bg-white dark:bg-gray-800 shadow-sm">
              <CardContent className="p-4">
                {/* 产品标题 */}
                <div className="flex items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {orderDetail.model}
                      </h3>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 dark:text-green-400">{orderDetail.lifecycle}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      品牌：{chip.displayManufacturer}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      描述：{chip.displayDescription}
                    </p>
                  </div>
                </div>

                {/* 订购详情 - 紧凑格式 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30 mb-4">
                  <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    订购详情
                    <span className="font-bold text-blue-600 dark:text-blue-400">{orderDetail.model}</span>
                  </h5>
                  <div className="space-y-2 text-xs">
                    {/* 第一行：封装、管脚、工作温度 */}
                    <div className="bg-white dark:bg-gray-800/50 rounded px-3 py-2 border border-white/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">封装:</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.package}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">管脚:</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.pins}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">工作温度:</span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.workTemp}</span>
                        </div>
                      </div>
                    </div>

                    {/* 第二行：包装数量、承运商、状态 */}
                    <div className="bg-white dark:bg-gray-800/50 rounded px-3 py-2 border border-white/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-6">
                        {orderDetail.packagingQuantity ? (
                          <>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500 dark:text-gray-400 font-medium">包装数量:</span>
                              <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.packagingQuantity}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-500 dark:text-gray-400 font-medium">承运商:</span>
                              <span className="font-bold text-gray-900 dark:text-gray-100">{orderDetail.carrier}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">包装:</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">2500/T&R</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">状态:</span>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="font-bold text-green-600 dark:text-green-400">{orderDetail.lifecycle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* 供应商信息 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">供应商信息</h4>
                  <div className="space-y-2">
                    {orderDetail.suppliers.map((supplier, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-gray-100">{supplier.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{supplier.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span>库存: {supplier.stock}</span>
                            <span>交货: {supplier.delivery}</span>
                            <span>MOQ: {supplier.moq}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{supplier.price}</div>
                          <Button size="sm" className="mt-1">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            购买
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
