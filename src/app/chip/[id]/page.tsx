
import { findChipById, placeholderChips } from '@/lib/placeholder-data';
import type { Chip } from '@/lib/types';
import { notFound } from 'next/navigation';
import ChipDetailClient from '@/components/chip/chip-detail-client';

interface ChipDetailPageProps {
  params: { id: string };
}

// Generate static params for all available chips
export async function generateStaticParams() {
  return placeholderChips.map((chip) => ({
    id: chip.id,
  }));
}

export default async function ChipDetailPage({ params }: ChipDetailPageProps) {
  const { id } = await params;
  const chip: Chip | undefined = findChipById(id);

  if (!chip) {
    notFound();
  }

  // Data transformations specific to different chips
  const isTPS5430 = chip.model === 'TPS5430';
  const isTPS563201 = chip.model === 'TPS563201';

  const displayManufacturer = (isTPS5430 || isTPS563201) ? '德州仪器-TI' : chip.manufacturer;
  const displayCategory = (isTPS5430 || isTPS563201) ? '开关稳压器-DC/DC转换器' : chip.category;
  const displayDescription = isTPS5430
    ? '5.5V 至 36V 输入、2A、500kHz 降压转换器'
    : isTPS563201
    ? '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器'
    : chip.description;

  const featuresList = isTPS563201 ? [
    { text: "1% 输出电压精度" },
    { text: "PG (Power Good) 信号" },
    { text: "SS (Soft Start) 功能" },
    { text: "PFM/强制PWM模式" },
    { text: "SOT583小封装" },
    { text: "宽输入电压范围：4.2V至17V" },
    { text: "高效率转换：高达95%" },
    { text: "过流保护" },
    { text: "2.1MHz开关频率" },
    { text: "3A输出电流" },
    { text: "–40℃至125℃工作温度范围" },
    { text: "同步降压拓扑" }
  ] : [
    { text: "宽输入电压范围：", subItems: ["-TPS5430: 5.5伏至36伏", "-TPS5431: 5.5伏至23伏"] },
    { text: "高达3-A连续 (4-A峰值) 输出电流" },
    { text: "通过110-mΩ集成MOSFET开关实现高达95%的高效率" },
    { text: "宽输出电压范围：可调至1.22 V，初始精度为1.5%" },
    { text: "内部补偿使外部零件数量最小化" },
    { text: "固定500 kHz开关频率，适用于小型滤波器" },
    { text: "通过输入电压前馈改善线路调节和瞬态响应" },
    { text: "系统受过电流限制、过压保护和热关机保护" },
    { text: "–40℃至125℃工作接合温度范围" },
    { text: "提供小型热增强型8针SO电源板™ 封装" },
    { text: "使用带有Webench®Power Designer的TPS5430创建自定义设计" }
  ];

  // Prepare chip data with any server-side transformations
  const processedChip = {
    ...chip,
    displayManufacturer,
    displayCategory,
    displayDescription,
  };

  return <ChipDetailClient chip={processedChip} featuresList={featuresList} />;
}
