'use client';

import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Share2, FileText, Phone, ChevronRight, Square, Download, Mail, Info } from 'lucide-react';
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
    <div className="space-y-6 pb-10">
      {/* 页面顶部导航栏 */}
      <div className="flex items-center justify-between py-3 border-b sticky top-0 bg-background z-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <Link href="/" passHref legacyBehavior>
          <Button variant="ghost" size="icon" aria-label="返回">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">芯片详情</h1>
        <Button variant="ghost" size="icon" aria-label="分享" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* 主要信息区 */}
      <div className="space-y-4">
        {/* 芯片型号与基础信息 */}
        <section className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{chip.model}</h2>
            {chip.series && <Badge variant="secondary">系列</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">品牌：{chip.displayManufacturer}</p>
          <p className="text-sm text-muted-foreground">分类：{chip.displayCategory}</p>
          <p className="text-sm">{chip.displayDescription}</p>
        </section>

        <Separator />

        {/* 数据手册操作区 */}
        <section className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            <div>
              <p className="font-medium">数据手册</p>
              <p className="text-xs text-muted-foreground">1.31MB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => chip.datasheetUrl && chip.datasheetUrl !== '#' ? window.open(chip.datasheetUrl, '_blank') : toast({title: "无可用数据手册", variant: "destructive"})}>打开</Button>
            <Button variant="outline" size="sm" onClick={() => toast({title: "下载功能开发中"})}>下载</Button>
            <Button variant="outline" size="sm" onClick={() => toast({title: "邮件功能开发中"})}>邮件</Button>
          </div>
        </section>

        <Separator />

        {/* 供应商信息区 */}
        <section className="space-y-3 py-2">
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <p className="text-sm text-muted-foreground">制造商：{chip.manufacturer}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">代理商：艾睿中国等3家</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <Link href="#" className="flex items-center justify-between text-sm hover:bg-muted/30 p-1 rounded-md">
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>021-23073288</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">共3个</Badge>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="#" className="flex items-center justify-between text-sm hover:bg-muted/30 p-1 rounded-md">
              <div className="flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>021-23073288</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">共3个</Badge>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </section>

        <Separator />

        {/* 相关跳转链接区 */}
        <section className="space-y-0.5 py-1">
          {[
            { href: '#', label: '系列型号', badgeText: '2' , linkTo: `/series/${chip.model}`},
            // { href: `/alternatives/${chip.id}`, label: '替代料', badgeText: '99' }, // Removed
            { href: '#', label: '参考设计', linkTo: `/reference-designs/${chip.model}` }
          ].map(item => (
            <Link href={item.linkTo || item.href} key={item.label} passHref legacyBehavior>
              <a className="flex items-center justify-between py-2.5 px-1.5 hover:bg-muted/30 rounded-md">
                <span className="text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.badgeText && (
                    <span className="bg-red-500 text-white text-[10px] font-bold leading-none rounded-full h-4 min-w-[16px] px-1.5 inline-flex items-center justify-center">
                      {item.badgeText}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </a>
            </Link>
          ))}
        </section>
        
        <Separator />

        {/* 详细信息切换标签区 */}
        <Tabs defaultValue="features" className="w-full pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">特性</TabsTrigger>
            <TabsTrigger value="applications">典型应用</TabsTrigger>
            <TabsTrigger value="parameters">关键参数</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">特性</h3>
                <Square className="h-4 w-4 text-muted-foreground" /> {/* Optional checkbox */}
              </div>
              <ul className="space-y-1.5 text-sm list-disc pl-5 text-muted-foreground">
                {featuresList.map((feature, index) => (
                  <li key={index}>
                    {feature.text}
                    {feature.subItems && feature.subItems.length > 0 && (
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        {feature.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>{subItem}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">典型应用</h3>
              <p className="text-sm text-muted-foreground">此部分内容正在准备中。</p>
              {chip.applications && chip.applications.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {chip.applications.map((app, i) => <li key={i}>{app}</li>)}
                </ul>
              )}
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="mt-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">关键参数</h3>
               {chip.parameters && Object.keys(chip.parameters).length > 0 ? (
                <ul className="space-y-1.5 text-sm">
                  {Object.entries(chip.parameters).map(([key, value]) => (
                    <li key={key} className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value !== undefined ? String(value) : '-'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                 <p className="text-sm text-muted-foreground">此部分内容正在准备中或无可用参数。</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
