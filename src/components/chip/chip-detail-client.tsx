'use client';

import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Share2,
  FileText,
  Phone,
  ChevronRight,
  Square,
  Download,
  Mail,
  Info,
  Cpu,
  Zap,
  Package,
  BookOpen,
  FileImage,
  Users,
  Settings,
  Code,
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Layers,
  Shield,
  Award,
  Target,
  Briefcase,
  Database,
  GitBranch,
  BarChart3,
  Wrench
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';

interface ProcessedChip extends Chip {
  displayManufacturer: string;
  displayCategory: string;
  displayDescription: string;
}

interface ChipDetailClientProps {
  chip: ProcessedChip;
  featuresList: { text: string; subItems?: string[] }[];
}

export default function ChipDetailClient({ chip, featuresList }: ChipDetailClientProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Ensure window object is available before accessing location
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);


  const handleShare = async () => {
    if (navigator.share && currentUrl) {
      try {
        await navigator.share({
          title: `芯片: ${chip.model}`,
          text: `查看 ${chip.model} (${chip.manufacturer}) 的详细信息。`,
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
    } else {
       toast({
        title: "无法分享",
        description: "当前页面链接不可用。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20">
      {/* 页面顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label="返回" className="hover:bg-blue-50 dark:hover:bg-blue-950/50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">芯片详情</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="收藏" className="hover:bg-red-50 dark:hover:bg-red-950/50">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="分享" onClick={handleShare} className="hover:bg-blue-50 dark:hover:bg-blue-950/50">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">{/* 芯片基本信息卡片 */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* 芯片图标 */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Cpu className="h-10 w-10 text-white" />
              </div>

              {/* 基本信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {chip.model}
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {chip.displayManufacturer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Award className="h-3 w-3 mr-1" />
                      {chip.lifecycleStatus || 'Active'}
                    </Badge>
                    {chip.series && (
                      <Badge variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
                        系列
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {chip.displayDescription}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Package className="h-4 w-4" />
                  <span>分类：{chip.displayCategory}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能模块网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 基本信息 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Info className="h-5 w-5 text-white" />
                </div>
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 产品描述、厂商、生命周期</p>
                <p>• 封装信息、规格书</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-1" />
                  规格书
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  下载
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 产品详情 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                产品详情
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 特性、说明、典型应用</p>
                <p>• 典型应用电路图、封装引脚图、功能框图</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-1" />
                查看详情
              </Button>
            </CardContent>
          </Card>

          {/* 功能参数 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                功能参数
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 拓扑架构、参数指标、保护功能、辅助功能</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <BarChart3 className="h-4 w-4 mr-1" />
                参数对比
              </Button>
            </CardContent>
          </Card>

          {/* 相似产品 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <GitBranch className="h-5 w-5 text-white" />
                </div>
                相似产品
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 完全兼容、p2p兼容、功能相似、封装相同</p>
                <p>• 国产品牌、国外品牌、相同品牌</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Layers className="h-4 w-4 mr-1" />
                查看替代
              </Button>
            </CardContent>
          </Card>

          {/* 技术文章 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <FileImage className="h-5 w-5 text-white" />
                </div>
                技术文章
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 应用指南、产品介绍、测试报告等</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="h-4 w-4 mr-1" />
                技术资料
              </Button>
            </CardContent>
          </Card>

          {/* 参考设计 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Code className="h-5 w-5 text-white" />
                </div>
                参考设计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 参考设计名称、介绍、SCH、PCB、BOM、测试报告等</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Wrench className="h-4 w-4 mr-1" />
                设计资源
              </Button>
            </CardContent>
          </Card>

          {/* 设计开发 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Target className="h-5 w-5 text-white" />
                </div>
                设计开发
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• CAD符号、封装、仿真模型</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Database className="h-4 w-4 mr-1" />
                开发工具
              </Button>
            </CardContent>
          </Card>

          {/* 产品订购 */}
          <Card className="border-0 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                产品订购
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>• 器件网络号、生命周期、工作温度、应用等级、环保等级、湿敏等级</p>
                <p>• 采购渠道、价格、库存、交期</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Briefcase className="h-4 w-4 mr-1" />
                  询价
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  购买
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细信息切换标签区 */}
        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <TabsTrigger value="features" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
                  <Zap className="h-4 w-4 mr-2" />
                  特性
                </TabsTrigger>
                <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
                  <Target className="h-4 w-4 mr-2" />
                  典型应用
                </TabsTrigger>
                <TabsTrigger value="parameters" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  关键参数
                </TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">产品特性</h3>
                  </div>

                  <div className="grid gap-3">
                    {featuresList.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">
                            {feature.text}
                          </p>
                          {feature.subItems && feature.subItems.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {feature.subItems.map((subItem, subIndex) => (
                                <div key={subIndex} className="flex items-start gap-2 ml-4">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{subItem}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">典型应用</h3>
                  </div>

                  {/* 典型应用电路图 */}
                  {chip.model === 'TPS563201' && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30 shadow-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <FileImage className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">典型应用电路</h4>
                      </div>
                      <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md">
                          <Image
                            src="/brands/dxyy.png"
                            alt="TPS563201典型应用电路图"
                            width={400}
                            height={300}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center font-medium">
                        TPS563201 典型应用电路图
                      </p>
                    </div>
                  )}

                  {/* 应用领域列表 */}
                  {chip.applications && chip.applications.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">应用领域</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {chip.applications.map((app, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800 rounded-xl hover:shadow-md transition-all duration-200 group">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!chip.applications || chip.applications.length === 0) && chip.model !== 'TPS563201' && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">此部分内容正在准备中</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="parameters" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">关键参数</h3>
                  </div>

                  {chip.parameters && Object.keys(chip.parameters).length > 0 ? (
                    <div className="grid gap-3">
                      {Object.entries(chip.parameters).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800 rounded-xl hover:shadow-md transition-all duration-200">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{key}</span>
                          </div>
                          <span className="text-gray-900 dark:text-gray-100 font-semibold bg-white dark:bg-gray-700 px-3 py-1 rounded-lg shadow-sm">
                            {value !== undefined ? String(value) : '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">此部分内容正在准备中或无可用参数</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
