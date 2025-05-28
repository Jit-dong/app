
import type { Chip, AlternativeChip } from './types';
import type { ChipFilters } from '@/components/shared/filter-panel'; // Import ChipFilters

export const placeholderChips: Chip[] = [
  {
    id: 'TPS5430-1',
    model: 'TPS5430',
    manufacturer: '德州仪器-TI',
    series: true,
    category: '开关稳压器-DC/DC转换器',
    description: '5.5V 至 36V 输入 3A 500kHz 降压转换器',
    applications: ['大功率LED电源', 'DVD显示屏'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps5430.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOIC-8'],
    parameters: {
      'Input Voltage Min': 5.5,
      'Input Voltage Max': 36,
      'Output Current Max': 3,
      'Switching Frequency': '500 kHz',
      'Interface Types': 'N/A'
    },
    tags: ['DC-DC', '降压转换器', '电源管理'],
    rohsCompliant: true,
    lowPower: false,
  },
  {
    id: 'TPS5430-2',
    model: 'TPS5430',
    manufacturer: '德州仪器',
    series: false,
    category: '开关稳压器-DC/DC转换器',
    description: '5.5V 至 36V 输入 3A 500kHz 降压转换器',
    applications: ['大功率LED电源', 'DVD显示屏'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps5430.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOIC-8'],
     parameters: {
      'Input Voltage Min': 5.5,
      'Input Voltage Max': 36,
      'Output Current Max': 3,
      'Switching Frequency': '500 kHz',
      'Interface Types': 'N/A'
    },
    tags: ['DC-DC', '降压转换器', '电源管理'],
    rohsCompliant: true,
  },
    {
    id: 'TPS5430-3',
    model: 'TPS5430',
    manufacturer: '德州仪器',
    series: false,
    category: '开关稳压器-DC/DC转换器',
    description: '5.5V 至 36V 输入 3A 500kHz 降压转换器',
    applications: ['大功率LED电源', 'DVD显示屏'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps5430.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOIC-8'],
     parameters: {
      'Input Voltage Min': 5.5,
      'Input Voltage Max': 36,
      'Output Current Max': 3,
      'Switching Frequency': '500 kHz',
      'Interface Types': 'N/A'
    },
    tags: ['DC-DC', '降压转换器', '电源管理'],
    rohsCompliant: true,
  },
  {
    id: 'TPS5430-4',
    model: 'TPS5430',
    manufacturer: '德州仪器',
    series: false,
    category: '开关稳压器-DC/DC转换器',
    description: '5.5V 至 36V 输入 3A 500kHz 降压转换器',
    applications: ['大功率LED电源', 'DVD显示屏'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps5430.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOIC-8'],
    parameters: {
      'Input Voltage Min': 5.5,
      'Input Voltage Max': 36,
      'Output Current Max': 3,
      'Switching Frequency': '500 kHz',
      'Interface Types': 'N/A'
    },
    tags: ['DC-DC', '降压转换器', '电源管理'],
    rohsCompliant: true,
  },
  {
    id: 'TPS563201',
    model: 'TPS563201',
    manufacturer: '德州仪器-TI',
    series: true,
    category: '开关稳压器-DC/DC转换器',
    description: '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器',
    applications: ['工业自动化', '通信设备', '测试测量设备', '医疗设备', '汽车电子', 'POL应用'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps563201.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOT583'],
    parameters: {
      'Input Voltage Min': 4.2,
      'Input Voltage Max': 17,
      'Output Current Max': 3,
      'Switching Frequency': '2.1 MHz',
      'Accuracy': '1%',
      'Efficiency': '95%',
      'Operating Temperature Min': -40,
      'Operating Temperature Max': 125,
      'Interface Types': 'PG/SS'
    },
    tags: ['DC-DC', '降压转换器', '电源管理', '高精度', 'SOT583'],
    rohsCompliant: true,
    lowPower: false,
  },
  {
    id: 'STM32F407VGT6',
    model: 'STM32F407VGT6',
    description: '高性能 MCU，采用 ARM Cortex-M4 内核，1MB 闪存，192KB RAM，多种外设。',
    manufacturer: 'STMicroelectronics',
    datasheetUrl: 'https://www.st.com/resource/en/datasheet/stm32f407vg.pdf',
    imageUrl: 'https://picsum.photos/seed/stm32f407/300/200',
    lifecycleStatus: 'Active',
    packageTypes: ['LQFP100'],
    distributors: [
      { name: 'Digi-Key', url: '#' },
      { name: 'Mouser', url: '#' },
    ],
    parameters: {
      'Core': 'ARM Cortex-M4',
      'Frequency': '168 MHz',
      'Flash': '1 MB',
      'RAM': '192 KB',
      'Voltage Min': 1.8,
      'Voltage Max': 3.6,
      'Output Current Max': 0.1,
      'Interface Types': 'SPI, I2C, UART, USB'
    },
    tags: ['MCU', 'ARM', '高性能'],
    category: '微控制器 (MCU) > 32位 MCU',
    rohsCompliant: true,
    lowPower: false,
    automotiveGrade: true, // Keep for filter test
    applications: ['工业控制', '消费电子'],
  },
  {
    id: 'ESP32-WROOM-32E',
    model: 'ESP32-WROOM-32E',
    description: '强大的 Wi-Fi + 蓝牙 MCU 模块，Xtensa 双核处理器，4MB 闪存。',
    manufacturer: 'Espressif Systems',
    datasheetUrl: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32e_esp32-wroom-32ue_datasheet_en.pdf',
    imageUrl: 'https://picsum.photos/seed/esp32/300/200',
    lifecycleStatus: 'Active',
    packageTypes: ['Module'],
    distributors: [
      { name: 'Adafruit', url: '#' },
      { name: 'SparkFun', url: '#' },
    ],
    parameters: {
      'Core': 'Xtensa LX6',
      'Frequency': '240 MHz',
      'Flash': '4 MB',
      'Connectivity': 'Wi-Fi, Bluetooth',
      'RAM': '520 KB',
      'Voltage Min': 3.0,
      'Voltage Max': 3.6,
      'Output Current Max': 0.05,
      'Interface Types': 'Wi-Fi, Bluetooth, SPI, I2C'
    },
    tags: ['MCU', 'Wi-Fi', '蓝牙', '物联网', 'Low Power'],
    category: '微控制器 (MCU) > 32位 MCU',
    rohsCompliant: true,
    lowPower: true,
    internalOscillator: true,
    applications: ['智能家居', '可穿戴设备'],
  },
];

export const placeholderAlternativeChips: Record<string, AlternativeChip[]> = {
  'STM32F407VGT6': [
    {
      id: 'STM32F429ZGT6',
      model: 'STM32F429ZGT6',
      description: '更高性能的 MCU，采用 ARM Cortex-M4 内核，1MB 闪存，256KB RAM，LCD-TFT 控制器。',
      manufacturer: 'STMicroelectronics',
      datasheetUrl: '#',
      imageUrl: 'https://picsum.photos/seed/stm32f429/300/200',
      lifecycleStatus: 'Active',
      packageTypes: ['LQFP144'],
      alternativeLevel: 'Similar Functionality',
      keyDifferences: ['更大 RAM', 'LCD 控制器', '不同封装'],
      similarityScore: 0.85,
      parameters: { 'RAM': '256 KB' },
      category: '微控制器 (MCU) > 32位 MCU',
      applications: ['图形用户界面', '高端嵌入式系统'],
      automotiveGrade: false,
    },
  ],
  'ESP32-WROOM-32E': [
    {
      id: 'ESP32-S3-WROOM-1',
      model: 'ESP32-S3-WROOM-1',
      description: '具有 AI 加速功能的 Wi-Fi + 低功耗蓝牙 MCU 模块，Xtensa LX7 双核。',
      manufacturer: 'Espressif Systems',
      datasheetUrl: '#',
      imageUrl: 'https://picsum.photos/seed/esp32s3/300/200',
      lifecycleStatus: 'Active',
      packageTypes: ['Module'],
      alternativeLevel: 'Potential Alternative',
      keyDifferences: ['更新的内核 (LX7)', 'AI 加速'],
      similarityScore: 0.9,
      parameters: { 'Core': 'Xtensa LX7' },
      category: '微控制器 (MCU) > 32位 MCU',
      applications: ['AIoT设备', '边缘计算'],
      automotiveGrade: false,
    },
  ],
  'TPS5430-1': [ // Added alternatives for the new demo chip
    {
      id: 'TPS5450',
      model: 'TPS5450',
      description: '5.5V 至 36V 输入 5A 500kHz 降压转换器 (更高电流)',
      manufacturer: '德州仪器-TI',
      datasheetUrl: '#',
      lifecycleStatus: 'Active',
      packageTypes: ['HTSSOP-20'],
      alternativeLevel: 'Similar Functionality',
      keyDifferences: ['更高输出电流 (5A vs 3A)', '不同封装'],
      similarityScore: 0.8,
      category: '开关稳压器-DC/DC转换器',
      applications: ['工业电源', '服务器电源'],
      automotiveGrade: true,
    }
  ]
};

export function findChipById(id: string): Chip | undefined {
  const allChips = [...placeholderChips, ...Object.values(placeholderAlternativeChips).flat()];
  return allChips.find(chip => chip.id.toLowerCase() === id.toLowerCase());
}

export function findAlternativesByChipId(chipId: string): AlternativeChip[] {
  const foundChip = placeholderChips.find(chip => chip.id.toLowerCase() === chipId.toLowerCase());
  if (foundChip) {
    return placeholderAlternativeChips[foundChip.id] || [];
  }
  return [];
}

export function searchChips(query: string, filters: ChipFilters = {}): Chip[] {
  const lowerQuery = query.toLowerCase();

  return placeholderChips.filter(chip => {
    let matchesQuery = true;
    if (query) {
      matchesQuery = chip.model.toLowerCase().includes(lowerQuery) ||
                     chip.description.toLowerCase().includes(lowerQuery) ||
                     chip.manufacturer.toLowerCase().includes(lowerQuery) ||
                     (chip.tags && chip.tags.some(tag => tag.toLowerCase().includes(lowerQuery)));
    }

    if (!matchesQuery) return false;

    if (filters.category && filters.category !== "全部" && chip.category) {
      if (!chip.category.startsWith(filters.category.replace(/ \(全部\)$/, ''))) return false;
    }

    if (filters.manufacturer && filters.manufacturer.length > 0) {
      if (!filters.manufacturer.includes(chip.manufacturer)) return false;
    }

    if (filters.packageType && filters.packageType.length > 0) {
      if (!chip.packageTypes || !chip.packageTypes.some(pt => filters.packageType!.includes(pt))) return false;
    }

    if (filters.lifecycleStatus && filters.lifecycleStatus.length > 0) {
      if (!chip.lifecycleStatus || !filters.lifecycleStatus.includes(chip.lifecycleStatus)) return false;
    }

    const voltageMinParam = chip.parameters?.['Voltage Min'] ?? chip.parameters?.['Supply Voltage Min'] ?? chip.parameters?.['Input Voltage Min'];
    const voltageMaxParam = chip.parameters?.['Voltage Max'] ?? chip.parameters?.['Supply Voltage Max'] ?? chip.parameters?.['Input Voltage Max'];
    const voltageMin = typeof voltageMinParam === 'number' ? voltageMinParam : undefined;
    const voltageMax = typeof voltageMaxParam === 'number' ? voltageMaxParam : undefined;


    if (filters.operatingVoltageMin !== undefined && (voltageMax === undefined || voltageMax < filters.operatingVoltageMin)) {
      return false;
    }
    if (filters.operatingVoltageMax !== undefined && (voltageMin === undefined || voltageMin > filters.operatingVoltageMax)) {
      return false;
    }

    const chipOutputCurrentMaxParam = chip.parameters?.['Output Current Max'];
    const chipOutputCurrentMax = typeof chipOutputCurrentMaxParam === 'number' ? chipOutputCurrentMaxParam : undefined;

    if (filters.outputCurrentMin !== undefined && (chipOutputCurrentMax === undefined || chipOutputCurrentMax < filters.outputCurrentMin)) {
        return false;
    }
    if (filters.outputCurrentMax !== undefined && (chipOutputCurrentMax === undefined || chipOutputCurrentMax > filters.outputCurrentMax)) {
        return false;
    }

    if (filters.temperatureRange && chip.parameters?.['Temperature Range'] !== filters.temperatureRange) {
      // Placeholder for more complex range matching
    }

    if (filters.hasDatasheet && !chip.datasheetUrl) return false;
    if (filters.automotiveGrade && !chip.automotiveGrade) return false;
    if (filters.rohsCompliant && !chip.rohsCompliant) return false;
    if (filters.lowPower && !chip.lowPower && (!chip.tags || !chip.tags.includes('Low Power'))) return false;
    if (filters.internalOscillator && !chip.internalOscillator) return false;

    if (filters.interfaceTypes && filters.interfaceTypes.length > 0) {
        const chipInterfacesParam = chip.parameters?.['Interface Types'];
        const chipInterfaces = (typeof chipInterfacesParam === 'string' ? chipInterfacesParam : "").toLowerCase().split(/, | /);
        if (!filters.interfaceTypes.some(fi => chipInterfaces.includes(fi.toLowerCase()))) return false;
    }

    return true;
  });
  // Not slicing results for now, let the UI handle pagination or virtual scrolling if needed.
  // .slice(0, 20);
}
