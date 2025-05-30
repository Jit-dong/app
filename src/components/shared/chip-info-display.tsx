import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Cpu, FileText, Download, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { Chip } from '@/lib/types';

interface ProcessedChip extends Chip {
  displayManufacturer: string;
  displayCategory: string;
  displayDescription: string;
}

interface ChipInfoDisplayProps {
  chip: ProcessedChip;
  showDatasheetButtons?: boolean;
  compact?: boolean;
}

export default function ChipInfoDisplay({ 
  chip, 
  showDatasheetButtons = false,
  compact = false 
}: ChipInfoDisplayProps) {
  const { toast } = useToast();

  // 封装类型数据
  const packageTypes = [
    { package: 'SOT-23-6', code: 'DDC' },
    { package: 'HSOIC-8', code: 'DDA' }
  ];

  // 数据手册处理函数
  const handleDatasheetOpen = () => {
    if (chip.datasheetUrl) {
      window.open(chip.datasheetUrl, '_blank');
      toast({
        title: "数据手册打开",
        description: `正在新窗口中打开 ${chip.model} 数据手册...`,
      });
    } else {
      toast({
        title: "数据手册不可用",
        description: "该芯片的数据手册暂时无法访问。",
        variant: "destructive",
      });
    }
  };

  const handleDatasheetDownload = () => {
    if (chip.datasheetUrl) {
      const link = document.createElement('a');
      link.href = chip.datasheetUrl;
      link.download = `${chip.model}_datasheet.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "数据手册下载",
        description: `${chip.model} 数据手册下载已开始...`,
      });
    } else {
      toast({
        title: "数据手册不可用",
        description: "该芯片的数据手册暂时无法下载。",
        variant: "destructive",
      });
    }
  };

  const handleDatasheetEmail = () => {
    if (chip.datasheetUrl) {
      const subject = `${chip.model} 数据手册`;
      const body = `您好，\n\n请查看 ${chip.model} 的数据手册：\n${chip.datasheetUrl}\n\n芯片信息：\n- 型号：${chip.model}\n- 制造商：${chip.manufacturer}\n- 描述：${chip.displayDescription}\n\n此邮件由芯片查询系统自动生成。`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      toast({
        title: "邮件客户端已打开",
        description: `已为您准备好 ${chip.model} 数据手册的邮件内容。`,
      });
    } else {
      toast({
        title: "数据手册不可用",
        description: "该芯片的数据手册暂时无法通过邮件分享。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="card-enhanced bg-white dark:bg-gray-800 p-4">
      <div className="flex items-start gap-4 mb-4">
        {/* 产品图片 */}
        {chip.imageUrl && (
          <div className="flex-shrink-0">
            <div className={`${compact ? 'w-16 h-16' : 'w-20 h-20'} bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mb-2`}>
              <Image
                src={chip.imageUrl}
                alt={chip.model}
                width={compact ? 64 : 80}
                height={compact ? 64 : 80}
                className="object-contain"
                onError={(e) => {
                  // 如果图片加载失败，显示默认图标
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Cpu className={`${compact ? 'h-6 w-6' : 'h-8 w-8'} text-gray-400`} />
            </div>
            {/* 品牌标识 */}
            <div className="text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                德州仪器-TI
              </div>
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 dark:text-gray-100`}>
                  {chip.model}
                </h1>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full border border-green-200 dark:border-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">量产</span>
                </div>
              </div>
              <p className={`text-gray-700 dark:text-gray-300 ${compact ? 'text-sm' : 'text-sm'} leading-relaxed mb-3`}>
                {chip.displayDescription}
              </p>
              <div className={`space-y-2 ${compact ? 'text-sm' : 'text-sm'} text-gray-600 dark:text-gray-400`}>
                {/* 封装信息 - 毛玻璃橘黄色卡片 */}
                <div className="flex items-center gap-2">
                  <span>封装:</span>
                  <div className="flex flex-wrap gap-2">
                    {packageTypes.map((pkg, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-orange-500/10 dark:bg-orange-400/10 backdrop-blur-sm border border-orange-200/50 dark:border-orange-400/30 rounded-full text-orange-700 dark:text-orange-300 font-medium text-xs shadow-sm"
                      >
                        {pkg.package}{pkg.code && ` (${pkg.code})`}
                      </div>
                    ))}
                  </div>
                </div>
                <div>分类: <span className="font-medium text-gray-900 dark:text-gray-100">电源管理芯片\直流直流变换器\降压型稳压器</span></div>
              </div>
            </div>

            {/* 数据手册按钮组 - 右上角垂直排列 */}
            {showDatasheetButtons && (
              <div className="flex flex-col gap-2 flex-shrink-0 ml-4">
                {/* 打开按钮 - 蓝色主题 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5 px-3 py-2 h-auto min-w-[68px] backdrop-blur-sm"
                  onClick={handleDatasheetOpen}
                  title="在新窗口打开数据手册"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span className="text-xs ml-1.5 font-medium">打开</span>
                </Button>

                {/* 下载按钮 - 绿色主题 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-200/50 dark:hover:shadow-green-900/30 hover:-translate-y-0.5 px-3 py-2 h-auto min-w-[68px] backdrop-blur-sm"
                  onClick={handleDatasheetDownload}
                  title="下载数据手册PDF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="text-xs ml-1.5 font-medium">下载</span>
                </Button>

                {/* 邮件按钮 - 橙色主题 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30 hover:-translate-y-0.5 px-3 py-2 h-auto min-w-[68px] backdrop-blur-sm"
                  onClick={handleDatasheetEmail}
                  title="通过邮件分享数据手册"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="text-xs ml-1.5 font-medium">邮件</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
