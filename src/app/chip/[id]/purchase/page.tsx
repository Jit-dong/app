import { findChipById, placeholderChips } from '@/lib/placeholder-data';
import type { Chip } from '@/lib/types';
import { notFound } from 'next/navigation';
import ChipPurchaseClient from '@/components/chip/chip-purchase-client';

interface ChipPurchasePageProps {
  params: { id: string };
}

// Generate static params for all available chips
export async function generateStaticParams() {
  return placeholderChips.map((chip) => ({
    id: chip.id,
  }));
}

export default async function ChipPurchasePage({ params }: ChipPurchasePageProps) {
  const { id } = await params;
  const chip: Chip | undefined = findChipById(id);

  if (!chip) {
    notFound();
  }

  // Data transformations specific to different chips
  const isTPS5430 = chip.model === 'TPS5430';
  const isTPS563201 = chip.model === 'TPS563201';

  const displayManufacturer = (isTPS5430 || isTPS563201) ? 'TI(德州仪器)' : chip.manufacturer;
  const displayCategory = (isTPS5430 || isTPS563201) ? 'Buck(降压)开关稳压器' : chip.category;
  const displayDescription = isTPS5430
    ? '采用 Eco-mode 的 4.5V 至 17V 输入电压、3A、500kHz 降压转换器'
    : isTPS563201
    ? '3A SWIFT 降压转换器评估模块'
    : chip.description;

  // Prepare chip data with any server-side transformations
  const processedChip = {
    ...chip,
    displayManufacturer,
    displayCategory,
    displayDescription,
  };

  return <ChipPurchaseClient chip={processedChip} />;
}
