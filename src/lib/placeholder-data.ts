
import type { Chip, AlternativeChip, ReferenceDesign, TechnicalDocument, ApplicationGuide, IndustryNews, OrderDetail, AlternativePart } from './types';
import type { ChipFilters } from '@/components/shared/filter-panel'; // Import ChipFilters

export const placeholderChips: Chip[] = [
  {
    id: 'TPS5430-1',
    model: 'TPS5430',
    manufacturer: '德州仪器-TI',
    series: true,
    category: '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器',
    description: '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器',
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
    status: '量产',
    package: 'SOIC-8',
    price: '¥12.50'
  },
  {
    id: 'TPS5430-2',
    model: 'TPS5430',
    manufacturer: '德州仪器-TI',
    series: false,
    category: '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器',
    description: '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器',
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
    status: '量产',
    package: 'SOIC-8',
    price: '¥11.80'
  },
    {
    id: 'TPS5430-3',
    model: 'TPS5430',
    manufacturer: '德州仪器-TI',
    series: false,
    category: '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器',
    description: '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器',
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
    manufacturer: '德州仪器-TI',
    series: false,
    category: '开关稳压器-DC/DC转换器',
    description: '采用 SOT583 封装且具有 1% 精度、PG/SS 和 PFM/强制 PWM 的 4.2V 至 17V、3A 同步降压转换器',
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
    category: '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器',
    description: '4.5V 至 17V 输入、3A 输出、Eco 模式下的同步降压转换器',
    applications: ['数字电视 (DTV) 电源', '高清蓝光™播放器', '网络家庭终端', '数字机顶盒 (STB)', '安防监控'],
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tps563201.pdf',
    automotiveGrade: true,
    lifecycleStatus: 'Active',
    packageTypes: ['SOT-23 (DDC)', 'HSOIC (DDA)'],
    parameters: {
      'Input Voltage Min': 4.5,
      'Input Voltage Max': 17,
      'Output Voltage Min': 0.76,
      'Output Voltage Max': 7,
      'Output Current Max': 3,
      'Switching Frequency': '580 kHz',
      'Control Mode': 'D-CAP2™',
      'Shutdown Current': '< 10µA',
      'Operating Temperature Min': -40,
      'Operating Temperature Max': 125,
      'Topology': 'Buck',
      'Efficiency': '95%',
      'Duty Cycle Max': '80%'
    },
    tags: ['DC-DC', '降压转换器', '电源管理', 'D-CAP2', 'Eco-mode', 'SOT-23'],
    rohsCompliant: true,
    lowPower: false,
    imageUrl: '/brands/image_cp/TPS563201.png',
    applicationImageUrl: '/brands/image_cp/TPS563201_.png',
    technicalArticles: [
      {
        id: 1,
        title: '采用 SOT-23 封装的 TPS56320x 4.5V 至 17V 输入、3A 同步降压稳压器数据表 (Rev. B)',
        type: '数据表',
        date: '2024年9月3日',
        author: 'Texas Instruments',
        pdfUrl: 'https://www.ti.com/lit/ds/symlink/tps563201.pdf',
        htmlUrl: 'https://www.ti.com/product/TPS563201'
      },
      {
        id: 2,
        title: '中档 VIN 的 3A DC/DC 降压转换器选择指南',
        type: '应用说明',
        date: '2023年8月3日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 3,
        title: '如何实现 SOT-563 封装与 SOT-236 封装之间的协同布局 (Rev. A)',
        type: '应用说明',
        date: '2023年7月10日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 4,
        title: 'TPS563201 降压转换器评估模块用户指南 (Rev. A)',
        type: 'EVM 用户指南',
        date: '2021年7月8日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 5,
        title: '降压转换器快速参考指南 (Rev. B)',
        type: '选择指南',
        date: '2021年4月8日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: null
      },
      {
        id: 6,
        title: '了解和管理降压调节器输出纹波',
        type: '技术文章',
        date: '2020年6月18日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 7,
        title: '可扩展性的优势：从 Peter Parker 到 pin-strapping',
        type: '技术文章',
        date: '2020年4月30日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 8,
        title: '具有不同类型电容器的 D-CAP2TM 转换器的稳定性',
        type: '应用说明',
        date: '2019年12月1日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: null
      },
      {
        id: 9,
        title: '减少 DC/DC 开关调节器 MLCC 数量的选项',
        type: '技术文章',
        date: '2019年9月17日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: '#'
      },
      {
        id: 10,
        title: 'SOT23 封装热考虑',
        type: '应用说明',
        date: '2018年3月2日',
        author: 'Texas Instruments',
        pdfUrl: '#',
        htmlUrl: null
      }
    ]
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
      category: '电源管理/开关稳压器/DC-DC转换器/Buck(降压)开关稳压器',
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
      // 基础匹配：芯片型号、描述、制造商、标签
      const basicMatch = chip.model.toLowerCase().includes(lowerQuery) ||
                        chip.description.toLowerCase().includes(lowerQuery) ||
                        chip.manufacturer.toLowerCase().includes(lowerQuery) ||
                        (chip.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ?? false);

      // 订购详情匹配：通过订购型号匹配到芯片
      // 检查是否是精确的订购型号搜索
      const exactOrderDetail = placeholderOrderDetails.find(orderDetail =>
        orderDetail.model.toLowerCase() === lowerQuery
      );

      let orderDetailMatch = false;
      if (exactOrderDetail) {
        // 如果是精确的订购型号搜索，只匹配对应的芯片
        orderDetailMatch = exactOrderDetail.chipId === chip.model;
      } else {
        // 否则进行模糊匹配
        orderDetailMatch = placeholderOrderDetails.some(orderDetail =>
          orderDetail.chipId === chip.model &&
          orderDetail.model.toLowerCase().includes(lowerQuery)
        );
      }

      matchesQuery = basicMatch || orderDetailMatch;
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

// 参考设计模拟数据
export const placeholderReferenceDesigns: ReferenceDesign[] = [
  {
    id: 'ref-1',
    title: 'TPS5430EVM-715 评估模块',
    description: '3A SWIFT 降压转换器评估模块，包含完整的设计文件和测试报告',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430EVM-715.pdf',
    imageUrl: '/reference-designs/TPS5430EVM.jpg',
    category: '电源管理',
    tags: ['降压转换器', '评估板', 'SWIFT'],
    downloadCount: 1250,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'ref-2',
    title: 'TPS5430 汽车LED驱动参考设计',
    description: '基于TPS5430的汽车LED前大灯驱动电路完整设计方案',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430-LED-Driver.pdf',
    imageUrl: '/reference-designs/TPS5430-LED.jpg',
    category: '汽车电子',
    tags: ['LED驱动', '汽车电子', '前大灯'],
    downloadCount: 980,
    lastUpdated: '2024-02-10'
  },
  {
    id: 'ref-3',
    title: 'TPS5430 工业电源模块设计',
    description: '适用于工业控制系统的TPS5430电源模块参考设计',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430-Industrial.pdf',
    imageUrl: '/reference-designs/TPS5430-Industrial.jpg',
    category: '工业控制',
    tags: ['工业电源', '模块化', '可靠性'],
    downloadCount: 756,
    lastUpdated: '2024-01-25'
  },
  {
    id: 'ref-4',
    title: 'TPS563201EVM-715',
    description: '3A SWIFT降压转换器评估模块',
    chipModel: 'TPS563201',
    manufacturer: 'TI（德州仪器）',
    documentUrl: '/docs/TPS563201EVM-715.pdf',
    imageUrl: '/reference-designs/TPS563201EVM-715.jpg',
    category: '电源管理',
    tags: ['同步降压', '评估板', 'SWIFT'],
    downloadCount: 1420,
    lastUpdated: '2024-03-01'
  },
  {
    id: 'ref-5',
    title: 'TPS563201 POL电源参考设计',
    description: '基于TPS563201的点负载(POL)电源解决方案',
    chipModel: 'TPS563201',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS563201-POL.pdf',
    imageUrl: '/reference-designs/TPS563201-POL.jpg',
    category: '服务器电源',
    tags: ['POL应用', '高密度', '服务器'],
    downloadCount: 634,
    lastUpdated: '2024-02-20'
  },
  {
    id: 'ref-6',
    title: 'STM32F407 开发板参考设计',
    description: 'ARM Cortex-M4高性能微控制器开发板完整设计方案',
    chipModel: 'STM32F407',
    manufacturer: 'STMicroelectronics',
    documentUrl: '/docs/STM32F407-RefDesign.pdf',
    imageUrl: '/reference-designs/STM32F407.jpg',
    category: '微控制器',
    tags: ['ARM', 'Cortex-M4', '开发板'],
    downloadCount: 2100,
    lastUpdated: '2024-02-20'
  },
  {
    id: 'ref-7',
    title: 'ESP32 物联网网关参考设计',
    description: '基于ESP32的完整物联网网关解决方案',
    chipModel: 'ESP32',
    manufacturer: 'Espressif',
    documentUrl: '/docs/ESP32-IoT-Gateway.pdf',
    imageUrl: '/reference-designs/ESP32-Gateway.jpg',
    category: '物联网',
    tags: ['WiFi', '蓝牙', '网关', '物联网'],
    downloadCount: 890,
    lastUpdated: '2024-03-10'
  }
];

// 技术文档模拟数据
export const placeholderTechnicalDocuments: TechnicalDocument[] = [
  {
    id: 'doc-1',
    title: 'TPS5430 数据手册',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'datasheet',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430-datasheet.pdf',
    category: '数据手册',
    tags: ['降压转换器', '电源管理'],
    pageCount: 42,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'doc-2',
    title: 'TPS5430 应用笔记 - PCB布局指南',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'application_note',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430-pcb-layout.pdf',
    category: '应用笔记',
    tags: ['PCB设计', '热管理', '布局'],
    pageCount: 18,
    lastUpdated: '2024-02-05'
  },
  {
    id: 'doc-3',
    title: 'TPS5430 故障排除指南',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'user_guide',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS5430-troubleshooting.pdf',
    category: '用户指南',
    tags: ['故障排除', '调试', '问题解决'],
    pageCount: 24,
    lastUpdated: '2024-01-20'
  },
  {
    id: 'doc-4',
    title: 'TPS563201 数据手册',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'datasheet',
    chipModel: 'TPS563201',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS563201-datasheet.pdf',
    category: '数据手册',
    tags: ['同步降压', '高效率', 'SOT583'],
    pageCount: 38,
    lastUpdated: '2024-03-01'
  },
  {
    id: 'doc-5',
    title: 'TPS563201 设计计算器使用指南',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'user_guide',
    chipModel: 'TPS563201',
    manufacturer: '德州仪器-TI',
    documentUrl: '/docs/TPS563201-calculator.pdf',
    category: '设计工具',
    tags: ['设计计算器', '快速设计', '工具'],
    pageCount: 12,
    lastUpdated: '2024-02-28'
  },
  {
    id: 'doc-6',
    title: 'STM32F407 编程手册',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'programming_guide',
    chipModel: 'STM32F407',
    manufacturer: 'STMicroelectronics',
    documentUrl: '/docs/STM32F407-programming.pdf',
    category: '编程指南',
    tags: ['ARM', 'Cortex-M4', '编程'],
    pageCount: 156,
    lastUpdated: '2024-02-15'
  },
  {
    id: 'doc-7',
    title: 'ESP32 技术参考手册',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    type: 'user_guide',
    chipModel: 'ESP32',
    manufacturer: 'Espressif',
    documentUrl: '/docs/ESP32-technical-reference.pdf',
    category: '技术参考',
    tags: ['WiFi', '蓝牙', '物联网'],
    pageCount: 677,
    lastUpdated: '2024-01-25'
  }
];

// 应用指南模拟数据
export const placeholderApplicationGuides: ApplicationGuide[] = [
  {
    id: 'app-1',
    title: '汽车LED大灯驱动电源设计',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    applicationField: '汽车电子',
    documentUrl: '/docs/automotive-led-driver.pdf',
    imageUrl: '/applications/automotive-led.jpg',
    difficulty: 'intermediate',
    tags: ['汽车电子', 'LED驱动', '电源设计'],
    lastUpdated: '2024-01-20'
  },
  {
    id: 'app-2',
    title: 'TPS5430工业电源模块设计',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    applicationField: '工业控制',
    documentUrl: '/docs/tps5430-industrial-power.pdf',
    imageUrl: '/applications/industrial-power.jpg',
    difficulty: 'intermediate',
    tags: ['工业电源', '可靠性设计', '模块化'],
    lastUpdated: '2024-02-10'
  },
  {
    id: 'app-3',
    title: 'TPS5430通信设备电源设计',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'TPS5430',
    manufacturer: '德州仪器-TI',
    applicationField: '通信设备',
    documentUrl: '/docs/tps5430-telecom-power.pdf',
    imageUrl: '/applications/telecom-power.jpg',
    difficulty: 'advanced',
    tags: ['通信设备', 'EMI优化', '电源管理'],
    lastUpdated: '2024-01-30'
  },
  {
    id: 'app-4',
    title: 'TPS563201 POL应用设计指南',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'TPS563201',
    manufacturer: '德州仪器-TI',
    applicationField: '服务器电源',
    documentUrl: '/docs/tps563201-pol-design.pdf',
    imageUrl: '/applications/pol-design.jpg',
    difficulty: 'intermediate',
    tags: ['POL应用', '服务器电源', '高密度'],
    lastUpdated: '2024-03-05'
  },
  {
    id: 'app-5',
    title: 'TPS563201医疗设备电源方案',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'TPS563201',
    manufacturer: '德州仪器-TI',
    applicationField: '医疗设备',
    documentUrl: '/docs/tps563201-medical-power.pdf',
    imageUrl: '/applications/medical-power.jpg',
    difficulty: 'advanced',
    tags: ['医疗设备', '安全标准', '低噪声'],
    lastUpdated: '2024-02-20'
  },
  {
    id: 'app-6',
    title: 'STM32F407工业控制系统开发',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'STM32F407',
    manufacturer: 'STMicroelectronics',
    applicationField: '工业控制',
    documentUrl: '/docs/stm32-industrial-control.pdf',
    imageUrl: '/applications/industrial-control.jpg',
    difficulty: 'advanced',
    tags: ['工业控制', '自动化', 'ARM'],
    lastUpdated: '2024-02-25'
  },
  {
    id: 'app-7',
    title: 'ESP32智能家居网关开发',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    chipModel: 'ESP32',
    manufacturer: 'Espressif',
    applicationField: '智能家居',
    documentUrl: '/docs/esp32-smart-home.pdf',
    imageUrl: '/applications/smart-home.jpg',
    difficulty: 'beginner',
    tags: ['智能家居', 'WiFi', '物联网'],
    lastUpdated: '2024-03-05'
  }
];

// 行业资讯模拟数据
export const placeholderIndustryNews: IndustryNews[] = [
  {
    id: 'news-1',
    title: '2024年电源管理芯片市场趋势分析',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '随着新能源汽车和5G技术的快速发展，电源管理芯片市场迎来新的增长机遇...',
    author: '芯智研究院',
    publishDate: '2024-03-15',
    category: '市场分析',
    tags: ['电源管理', '市场趋势', '新能源'],
    imageUrl: '/news/power-management-2024.jpg',
    sourceUrl: 'https://example.com/news/power-management-2024',
    readTime: 8
  },
  {
    id: 'news-2',
    title: 'TI发布新一代SWIFT降压转换器系列',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '德州仪器宣布推出新一代SWIFT降压转换器系列，在保持TPS5430优秀特性的基础上...',
    author: '电源技术网',
    publishDate: '2024-03-10',
    category: '产品发布',
    tags: ['TI', 'SWIFT', '降压转换器', 'TPS5430'],
    imageUrl: '/news/ti-swift-new.jpg',
    sourceUrl: 'https://example.com/news/ti-swift-new',
    readTime: 6
  },
  {
    id: 'news-3',
    title: '汽车电子电源管理技术发展趋势',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '随着电动汽车和智能驾驶技术的发展，汽车电子对电源管理提出了更高要求...',
    author: '汽车电子周刊',
    publishDate: '2024-03-05',
    category: '技术趋势',
    tags: ['汽车电子', '电源管理', '电动汽车'],
    imageUrl: '/news/automotive-power-trend.jpg',
    sourceUrl: 'https://example.com/news/automotive-power-trend',
    readTime: 7
  },
  {
    id: 'news-4',
    title: 'SOT583封装在高密度电源设计中的应用',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '随着电子设备小型化趋势，SOT583等超小型封装在电源管理芯片中的应用越来越广泛...',
    author: '封装技术杂志',
    publishDate: '2024-02-28',
    category: '技术分析',
    tags: ['SOT583', '小型化', '高密度设计', 'TPS563201'],
    imageUrl: '/news/sot583-application.jpg',
    sourceUrl: 'https://example.com/news/sot583-application',
    readTime: 5
  },
  {
    id: 'news-5',
    title: 'ARM Cortex-M系列微控制器新品发布',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: 'ARM公司今日正式发布了新一代Cortex-M系列微控制器架构...',
    author: '半导体观察',
    publishDate: '2024-03-12',
    category: '产品发布',
    tags: ['ARM', 'Cortex-M', '微控制器'],
    imageUrl: '/news/arm-cortex-m-new.jpg',
    sourceUrl: 'https://example.com/news/arm-cortex-m-new',
    readTime: 5
  },
  {
    id: 'news-6',
    title: '工业4.0推动电源管理芯片创新',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '工业4.0时代的到来，对工业设备的电源管理提出了更高的可靠性和智能化要求...',
    author: '工业电子资讯',
    publishDate: '2024-02-25',
    category: '行业动态',
    tags: ['工业4.0', '智能制造', '电源管理'],
    imageUrl: '/news/industry40-power.jpg',
    sourceUrl: 'https://example.com/news/industry40-power',
    readTime: 6
  },
  {
    id: 'news-7',
    title: '物联网芯片安全标准更新',
    description: 'Keeping DC/DC solutions (super) simple for cost-sensitive applications',
    content: '为了应对日益严峻的网络安全威胁，国际物联网安全联盟发布了...',
    author: '安全技术周刊',
    publishDate: '2024-03-08',
    category: '技术标准',
    tags: ['物联网', '安全', '标准'],
    imageUrl: '/news/iot-security-standards.jpg',
    sourceUrl: 'https://example.com/news/iot-security-standards',
    readTime: 6
  }
];

// 搜索函数
export function searchReferenceDesigns(query: string): ReferenceDesign[] {
  if (!query.trim()) return placeholderReferenceDesigns;

  const lowerQuery = query.toLowerCase();
  return placeholderReferenceDesigns.filter(design => {
    // 基础匹配
    const basicMatch = design.title.toLowerCase().includes(lowerQuery) ||
                      design.description.toLowerCase().includes(lowerQuery) ||
                      design.chipModel?.toLowerCase().includes(lowerQuery) ||
                      design.manufacturer?.toLowerCase().includes(lowerQuery) ||
                      design.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

    // 订购详情匹配：通过订购型号匹配到芯片，再匹配参考设计
    // 检查是否是精确的订购型号搜索
    const exactOrderDetail = placeholderOrderDetails.find(orderDetail =>
      orderDetail.model.toLowerCase() === lowerQuery
    );

    let orderDetailMatch = false;
    if (exactOrderDetail) {
      // 如果是精确的订购型号搜索，只匹配对应的芯片
      orderDetailMatch = design.chipModel?.toLowerCase() === exactOrderDetail.chipId.toLowerCase();
    } else {
      // 否则进行模糊匹配
      orderDetailMatch = placeholderOrderDetails.some(orderDetail =>
        orderDetail.model.toLowerCase().includes(lowerQuery) &&
        design.chipModel?.toLowerCase() === orderDetail.chipId.toLowerCase()
      );
    }

    return basicMatch || orderDetailMatch;
  });
}

export function searchTechnicalDocuments(query: string): TechnicalDocument[] {
  if (!query.trim()) return placeholderTechnicalDocuments;

  const lowerQuery = query.toLowerCase();
  return placeholderTechnicalDocuments.filter(doc => {
    // 基础匹配
    const basicMatch = doc.title.toLowerCase().includes(lowerQuery) ||
                      doc.description.toLowerCase().includes(lowerQuery) ||
                      doc.chipModel?.toLowerCase().includes(lowerQuery) ||
                      doc.manufacturer?.toLowerCase().includes(lowerQuery) ||
                      doc.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

    // 订购详情匹配：通过订购型号匹配到芯片，再匹配技术文档
    // 检查是否是精确的订购型号搜索
    const exactOrderDetail = placeholderOrderDetails.find(orderDetail =>
      orderDetail.model.toLowerCase() === lowerQuery
    );

    let orderDetailMatch = false;
    if (exactOrderDetail) {
      // 如果是精确的订购型号搜索，只匹配对应的芯片
      orderDetailMatch = doc.chipModel?.toLowerCase() === exactOrderDetail.chipId.toLowerCase();
    } else {
      // 否则进行模糊匹配
      orderDetailMatch = placeholderOrderDetails.some(orderDetail =>
        orderDetail.model.toLowerCase().includes(lowerQuery) &&
        doc.chipModel?.toLowerCase() === orderDetail.chipId.toLowerCase()
      );
    }

    return basicMatch || orderDetailMatch;
  });
}

export function searchApplicationGuides(query: string): ApplicationGuide[] {
  if (!query.trim()) return placeholderApplicationGuides;

  const lowerQuery = query.toLowerCase();
  return placeholderApplicationGuides.filter(guide => {
    // 基础匹配
    const basicMatch = guide.title.toLowerCase().includes(lowerQuery) ||
                      guide.description.toLowerCase().includes(lowerQuery) ||
                      guide.chipModel?.toLowerCase().includes(lowerQuery) ||
                      guide.manufacturer?.toLowerCase().includes(lowerQuery) ||
                      guide.applicationField.toLowerCase().includes(lowerQuery) ||
                      guide.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

    // 订购详情匹配：通过订购型号匹配到芯片，再匹配应用指南
    // 检查是否是精确的订购型号搜索
    const exactOrderDetail = placeholderOrderDetails.find(orderDetail =>
      orderDetail.model.toLowerCase() === lowerQuery
    );

    let orderDetailMatch = false;
    if (exactOrderDetail) {
      // 如果是精确的订购型号搜索，只匹配对应的芯片
      orderDetailMatch = guide.chipModel?.toLowerCase() === exactOrderDetail.chipId.toLowerCase();
    } else {
      // 否则进行模糊匹配
      orderDetailMatch = placeholderOrderDetails.some(orderDetail =>
        orderDetail.model.toLowerCase().includes(lowerQuery) &&
        guide.chipModel?.toLowerCase() === orderDetail.chipId.toLowerCase()
      );
    }

    return basicMatch || orderDetailMatch;
  });
}

export function searchIndustryNews(query: string): IndustryNews[] {
  if (!query.trim()) return placeholderIndustryNews;

  const lowerQuery = query.toLowerCase();
  return placeholderIndustryNews.filter(news => {
    // 基础匹配
    const basicMatch = news.title.toLowerCase().includes(lowerQuery) ||
                      news.description.toLowerCase().includes(lowerQuery) ||
                      news.content?.toLowerCase().includes(lowerQuery) ||
                      news.category.toLowerCase().includes(lowerQuery) ||
                      news.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

    // 订购详情匹配：通过订购型号匹配到芯片，再匹配相关新闻
    const orderDetailMatch = placeholderOrderDetails.some(orderDetail => {
      if (orderDetail.model.toLowerCase().includes(lowerQuery)) {
        // 检查新闻标签或内容中是否包含对应的芯片型号
        return news.tags?.some(tag => tag.toLowerCase().includes(orderDetail.chipId.toLowerCase())) ||
               news.content?.toLowerCase().includes(orderDetail.chipId.toLowerCase()) ||
               news.title.toLowerCase().includes(orderDetail.chipId.toLowerCase());
      }
      return false;
    });

    return basicMatch || orderDetailMatch;
  });
}

// 丝印反查数据类型
export interface SilkscreenData {
  id: string;
  silkscreen: string; // 丝印内容
  partNumber: string; // 订购型号
  package: string; // 封装
  manufacturer: string; // 品牌
  category: string; // 分类
  description: string; // 产品描述
  pins: number; // 管脚数
  imageUrl?: string; // 产品图片
  datasheetUrl?: string; // 数据手册链接
  alternativeSilkscreens?: string[]; // 可能的其他丝印变体
}

// 丝印反查模拟数据
export const placeholderSilkscreenData: SilkscreenData[] = [
  {
    id: 'silk-1',
    silkscreen: '3201',
    partNumber: 'TPS563201DDCT',
    package: 'DDC-6',
    manufacturer: 'TI(德州仪器)',
    category: 'Buck降压开关稳压器',
    description: '采用Eco-mode的4.5V至17V输入电压、3A输出电流、同步降压转换器',
    pins: 6,
    imageUrl: '/brands/image_sy/TPS563201DDCT.png',
    datasheetUrl: '/docs/TPS563201DDCT-datasheet.pdf',
    alternativeSilkscreens: ['563201', 'T3201']
  },
  {
    id: 'silk-2',
    silkscreen: '3201',
    partNumber: 'TPS563201DDCR',
    package: 'TSOT-23-6',
    manufacturer: 'TI(德州仪器)',
    category: '采用分离开关稳压器(DC/DC转换器)',
    description: '采用Eco-mode的4.5V至17V输入电压、3A输出电流、同步降压转换器',
    pins: 6,
    imageUrl: '/brands/image_sy/TPS563201DDCR.png',
    datasheetUrl: '/docs/TPS563201DDCR-datasheet.pdf',
    alternativeSilkscreens: ['563201', 'T3201']
  },
  {
    id: 'silk-3',
    silkscreen: '3201',
    partNumber: 'TPS563201DDCR',
    package: 'DDC-6',
    manufacturer: 'TI(德州仪器)',
    category: '采用分离开关稳压器(DC/DC转换器)',
    description: '采用Eco-mode的4.5V至17V输入电压、3A输出电流、同步降压转换器',
    pins: 6,
    imageUrl: '/brands/image_sy/TPS563201DDCR.png',
    datasheetUrl: '/docs/TPS563201DDCR-datasheet.pdf',
    alternativeSilkscreens: ['563201', 'T3201']
  },
  {
    id: 'silk-4',
    silkscreen: '3201',
    partNumber: 'THS3201D',
    package: 'SOIC-8',
    manufacturer: 'TI(德州仪器)',
    category: '运算放大器',
    description: 'IC OPAMP CFA 1 CIRCUIT 8SOIC',
    pins: 8,
    imageUrl: '/brands/image_sy/TI THS3201D.png',
    datasheetUrl: '/docs/THS3201D-datasheet.pdf',
    alternativeSilkscreens: ['THS3201', 'HS3201']
  },
  {
    id: 'silk-5',
    silkscreen: '3201',
    partNumber: 'AW33201CSR',
    package: 'WLCSP-9',
    manufacturer: 'AWINIC(艾为)',
    category: '负载开关',
    description: 'Over-Voltage Protection Load Switch',
    pins: 9,
    imageUrl: '/brands/image_sy/AW33201CSR.png',
    datasheetUrl: '/docs/AW33201CSR-datasheet.pdf',
    alternativeSilkscreens: ['AW3201', '33201']
  },
  {
    id: 'silk-6',
    silkscreen: 'ALL',
    partNumber: 'AMS1117-3.3',
    package: 'SOT-223',
    manufacturer: 'AMS（先进模拟）',
    category: '电源管理 → LDO稳压器',
    description: '1A低压差线性稳压器',
    pins: 4,
    imageUrl: '/brands/image_cp/AMS1117.png',
    datasheetUrl: '/docs/AMS1117-datasheet.pdf',
    alternativeSilkscreens: ['1117', 'AMS1117']
  },
  {
    id: 'silk-7',
    silkscreen: '358',
    partNumber: 'LM358',
    package: 'SOIC-8',
    manufacturer: 'TI（德州仪器）',
    category: '模拟器件 → 运算放大器',
    description: '双路低功耗运算放大器',
    pins: 8,
    imageUrl: '/brands/image_cp/LM358.png',
    datasheetUrl: '/docs/LM358-datasheet.pdf',
    alternativeSilkscreens: ['LM358', 'L358']
  },
  {
    id: 'silk-8',
    silkscreen: '2596',
    partNumber: 'LM2596',
    package: 'TO-263',
    manufacturer: 'TI（德州仪器）',
    category: '电源管理 → 降压转换器',
    description: '3A降压开关稳压器',
    pins: 5,
    imageUrl: '/brands/image_cp/LM2596.png',
    datasheetUrl: '/docs/LM2596-datasheet.pdf',
    alternativeSilkscreens: ['LM2596', 'L2596']
  },
  {
    id: 'silk-9',
    silkscreen: '555',
    partNumber: 'NE555',
    package: 'SOIC-8',
    manufacturer: 'TI（德州仪器）',
    category: '模拟器件 → 定时器',
    description: '精密定时器',
    pins: 8,
    imageUrl: '/brands/image_cp/NE555.png',
    datasheetUrl: '/docs/NE555-datasheet.pdf',
    alternativeSilkscreens: ['NE555', 'N555']
  },
  {
    id: 'silk-10',
    silkscreen: '595',
    partNumber: '74HC595',
    package: 'SOIC-16',
    manufacturer: 'TI（德州仪器）',
    category: '数字逻辑 → 移位寄存器',
    description: '8位串行输入/串行或并行输出移位寄存器',
    pins: 16,
    imageUrl: '/brands/image_cp/74HC595.png',
    datasheetUrl: '/docs/74HC595-datasheet.pdf',
    alternativeSilkscreens: ['74HC595', 'HC595']
  },
  {
    id: 'silk-11',
    silkscreen: '317',
    partNumber: 'LM317',
    package: 'TO-220',
    manufacturer: 'TI（德州仪器）',
    category: '电源管理 → 可调稳压器',
    description: '1.2V-37V可调正电压稳压器',
    pins: 3,
    imageUrl: '/brands/image_cp/LM317.png',
    datasheetUrl: '/docs/LM317-datasheet.pdf',
    alternativeSilkscreens: ['LM317', 'L317']
  }
];

// 查替代搜索结果接口
export interface AlternativeSearchResult {
  chip: Chip | null;           // 主芯片信息
  orderDetails: OrderDetail[]; // 订购详情（子型号）
  isExactMatch: boolean;       // 是否精确匹配
  totalAlternatives: number;   // 总替代数量
}

// 查替代搜索函数 - 返回与查资料相同的格式
export function searchAlternatives(query: string): AlternativeSearchResult {
  if (!query.trim()) {
    return {
      chip: null,
      orderDetails: [],
      isExactMatch: false,
      totalAlternatives: 0
    };
  }

  const lowerQuery = query.toLowerCase().trim();

  // 1. 尝试精确匹配芯片ID（父型号）
  const exactChip = placeholderChips.find(chip =>
    chip.id.toLowerCase() === lowerQuery
  );

  if (exactChip) {
    // 找到父型号，返回该芯片及其所有子型号
    const relatedOrderDetails = placeholderOrderDetails.filter(order =>
      order.chipId.toLowerCase() === exactChip.id.toLowerCase()
    );

    return {
      chip: exactChip,
      orderDetails: relatedOrderDetails,
      isExactMatch: true,
      totalAlternatives: relatedOrderDetails.length
    };
  }

  // 2. 尝试通过订购型号查找（子型号）
  const orderDetail = placeholderOrderDetails.find(order =>
    order.model.toLowerCase() === lowerQuery
  );

  if (orderDetail) {
    // 找到子型号，返回对应的父芯片和这个具体的订购详情
    const parentChip = placeholderChips.find(chip =>
      chip.id.toLowerCase() === orderDetail.chipId.toLowerCase()
    );

    // 获取同系列的所有子型号数量
    const allOrderDetails = placeholderOrderDetails.filter(order =>
      order.chipId.toLowerCase() === orderDetail.chipId.toLowerCase()
    );

    return {
      chip: parentChip || null,
      orderDetails: [orderDetail], // 只返回这一个具体的订购详情
      isExactMatch: true,
      totalAlternatives: allOrderDetails.length
    };
  }

  // 3. 模糊匹配
  const fuzzyChips = placeholderChips.filter(chip =>
    chip.id.toLowerCase().includes(lowerQuery) ||
    chip.model.toLowerCase().includes(lowerQuery) ||
    chip.manufacturer.toLowerCase().includes(lowerQuery)
  );

  if (fuzzyChips.length > 0) {
    // 返回第一个匹配的芯片及其订购详情
    const firstChip = fuzzyChips[0];
    const relatedOrderDetails = placeholderOrderDetails.filter(order =>
      order.chipId.toLowerCase() === firstChip.id.toLowerCase()
    );

    return {
      chip: firstChip,
      orderDetails: relatedOrderDetails,
      isExactMatch: false,
      totalAlternatives: relatedOrderDetails.length
    };
  }

  // 4. 通过订购型号模糊匹配
  const fuzzyOrderDetails = placeholderOrderDetails.filter(order =>
    order.model.toLowerCase().includes(lowerQuery)
  );

  if (fuzzyOrderDetails.length > 0) {
    // 按chipId分组，返回第一组
    const firstOrder = fuzzyOrderDetails[0];
    const parentChip = placeholderChips.find(chip =>
      chip.id.toLowerCase() === firstOrder.chipId.toLowerCase()
    );

    const sameChipOrders = fuzzyOrderDetails.filter(order =>
      order.chipId.toLowerCase() === firstOrder.chipId.toLowerCase()
    );

    return {
      chip: parentChip || null,
      orderDetails: sameChipOrders,
      isExactMatch: false,
      totalAlternatives: sameChipOrders.length
    };
  }

  // 5. 没有找到任何匹配
  return {
    chip: null,
    orderDetails: [],
    isExactMatch: false,
    totalAlternatives: 0
  };
}

// 丝印反查搜索函数
export function searchSilkscreen(query: string): SilkscreenData[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase().trim();

  return placeholderSilkscreenData.filter(item => {
    // 精确匹配丝印
    if (item.silkscreen.toLowerCase() === lowerQuery) return true;

    // 模糊匹配丝印
    if (item.silkscreen.toLowerCase().includes(lowerQuery)) return true;

    // 匹配替代丝印
    if (item.alternativeSilkscreens?.some(alt =>
      alt.toLowerCase() === lowerQuery ||
      alt.toLowerCase().includes(lowerQuery)
    )) return true;

    // 匹配订购型号
    if (item.partNumber.toLowerCase().includes(lowerQuery)) return true;

    return false;
  }).sort((a, b) => {
    // 精确匹配优先
    const aExact = a.silkscreen.toLowerCase() === lowerQuery;
    const bExact = b.silkscreen.toLowerCase() === lowerQuery;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // 按丝印长度排序（越短越相关）
    return a.silkscreen.length - b.silkscreen.length;
  });
}

// 产品分类筛选数据
export interface CategoryFilterData {
  brands: string[];
  packages: string[];
  parameters: {
    [category: string]: {
      type: 'single' | 'multiple' | 'range';
      options: string[];
    };
  };
}

// 三级分类筛选数据结构
export interface ThreeLevelFilterData {
  brand: {
    region: {
      name: string;
      options: string[];
    };
    manufacturer: {
      name: string;
      options: string[];
    };
  };
  package: {
    type: {
      name: string;
      options: string[];
    };
    size: {
      name: string;
      options: string[];
    };
    pins: {
      name: string;
      options: string[];
    };
  };
  parameters: {
    application: {
      name: string;
      subcategories: Record<string, {
        name: string;
        options: string[];
      }>;
    };
    topology: {
      name: string;
      subcategories: Record<string, {
        name: string;
        options: string[];
      }>;
    };
    electrical: {
      name: string;
      subcategories: Record<string, {
        name: string;
        options: string[];
      }>;
    };
    special: {
      name: string;
      subcategories: Record<string, {
        name: string;
        options: string[];
      }>;
    };
    protection: {
      name: string;
      subcategories: Record<string, {
        name: string;
        options: string[];
      }>;
    };
  };
}

// Buck(降压)开关稳压器三级筛选数据
export const buckConverterThreeLevelData: ThreeLevelFilterData = {
  // 🏢 品牌类别
  brand: {
    region: {
      name: '按地域',
      options: ['美国', '日本', '韩国', '台湾', '欧洲', '中国', '印度', '其他']
    },
    manufacturer: {
      name: '按厂商',
      options: [
        // 美国
        'TI(德州仪器)', 'ADI(亚德诺)', 'MPS(芯源)', 'onsemi(安森美)',
        'Maxim(美信)', 'Linear(凌特)', 'Intersil(英特矽)',
        // 日本
        'TOREX(特瑞仕)', 'Nisshinbo(日清纺)', 'Renesas(瑞萨)', 'ROHM(罗姆)',
        'ABLIC(艾普凌科)', 'Ricoh(理光)', 'Panasonic(松下)',
        // 韩国
        'Samsung(三星)', 'LG Innotek(LG)', 'Fairchild(仙童)',
        // 台湾
        'DIODES(美台)', 'UTC(友顺)', 'Richtek(立锜)', 'Anpec(茂达)', 'GMT(致新)',
        // 欧洲
        'ST(意法)', 'Infineon(英飞凌)', 'NXP(恩智浦)', 'Dialog(戴乐格)',
        // 中国
        'Rochester(罗彻斯特)', '中微半导体', '圣邦微电子', '芯海科技', '思瑞浦', '晶丰明源',
        // 印度
        'Cosmic(宇宙)',
        // 其他
        '其他品牌'
      ]
    }
  },

  // 📦 封装类别
  package: {
    type: {
      name: '封装类型',
      options: [
        'SOT-23', 'SOT-23-6', 'SOT-23-8',
        'SOIC-8', 'SOIC-14', 'SOIC-16',
        'MSOP-8', 'MSOP-10', 'MSOP-12',
        'QFN-16', 'QFN-20', 'QFN-24',
        'LQFP-48', 'LQFP-64', 'LQFP-100',
        'DFN-6', 'DFN-8', 'DFN-10',
        'WLCSP', 'BGA-64', 'BGA-100'
      ]
    },
    size: {
      name: '封装尺寸',
      options: [
        '1x1mm', '2x2mm', '3x3mm', '4x4mm',
        '5x5mm', '6x6mm', '7x7mm', '8x8mm',
        '10x10mm', '12x12mm', '14x14mm', '16x16mm'
      ]
    },
    pins: {
      name: '引脚数',
      options: ['4', '6', '8', '10', '12', '14', '16', '20', '24', '32', '48', '64', '100']
    }
  },

  // 📊 参数类别
  parameters: {
    application: {
      name: '应用场景',
      subcategories: {
        automotive: {
          name: '车规级',
          options: ['是(符合功能安全标准)', '是(不涉及功能安全)', '否']
        },
        industrial: {
          name: '工业级',
          options: ['是', '否']
        },
        consumer: {
          name: '消费级',
          options: ['是', '否']
        }
      }
    },
    topology: {
      name: '拓扑架构',
      subcategories: {
        powerConfig: {
          name: '功率配置',
          options: ['单管集成(异步)', '双管集成(同步)', '外置(控制器)']
        },
        deviceType: {
          name: '器件类型',
          options: ['MOSFET', 'GAN', 'SIC']
        },
        phaseNumber: {
          name: '相位数',
          options: ['1', '2', '3', '4', '5', '6', '8', '12', '16', '20']
        }
      }
    },
    electrical: {
      name: '电气参数',
      subcategories: {
        voltage: {
          name: '电压参数',
          options: [
            '最高输入电压: 4V', '最高输入电压: 6V', '最高输入电压: 12V', '最高输入电压: 18V',
            '最高输入电压: 24V', '最高输入电压: 36V', '最高输入电压: 60V', '最高输入电压: 100V',
            '最低输入电压: 1V', '最低输入电压: 2V', '最低输入电压: 3V', '最低输入电压: 4V',
            '最小输出电压: 0.1V', '最小输出电压: 0.5V', '最小输出电压: 0.8V', '最小输出电压: 1V',
            '最高输出电压: 4V', '最高输出电压: 6V', '最高输出电压: 12V', '最高输出电压: 18V'
          ]
        },
        current: {
          name: '电流参数',
          options: [
            '最大输出电流: 0.5A', '最大输出电流: 1A', '最大输出电流: 2A', '最大输出电流: 3A',
            '最大输出电流: 5A', '最大输出电流: 10A', '最大输出电流: 20A', '最大输出电流: 50A',
            '静态电流: <10uA', '静态电流: <50uA', '静态电流: <100uA', '静态电流: <500uA'
          ]
        },
        frequency: {
          name: '频率参数',
          options: [
            '开关频率: 0.05MHz', '开关频率: 0.1MHz', '开关频率: 0.5MHz', '开关频率: 1MHz',
            '开关频率: 2MHz', '开关频率: 5MHz', '开关频率: 10MHz'
          ]
        },
        accuracy: {
          name: '精度参数',
          options: ['输出精度: ±0.5%', '输出精度: ±1%', '输出精度: ±2%', '输出精度: ±3%', '输出精度: ±5%']
        }
      }
    },
    special: {
      name: '特殊功能',
      subcategories: {
        operation: {
          name: '工作模式',
          options: ['同步', '异步', '输出电压固定', '输出电压可调']
        },
        communication: {
          name: '通信接口',
          options: ['I2C', 'PMBus', 'VID', 'AVSBUS', '无通信接口']
        },
        control: {
          name: '控制功能',
          options: ['使能功能', '软启动', '输出放电', '集成LDO', '频率同步', '电压跟随', '动态调压', '电源指示']
        }
      }
    },
    protection: {
      name: '保护功能',
      subcategories: {
        voltage: {
          name: '电压保护',
          options: ['输入过压保护', '输入欠压保护', '输出过压保护', '输出欠压保护']
        },
        current: {
          name: '电流保护',
          options: ['输出过载保护', '输出短路保护']
        },
        thermal: {
          name: '热保护',
          options: ['过温保护']
        }
      }
    }
  }
};

// 保留原有的buckConverterFilterData以兼容现有代码
export const buckConverterFilterData: CategoryFilterData = {
  brands: buckConverterThreeLevelData.brand.manufacturer.options,
  packages: buckConverterThreeLevelData.package.type.options,
  parameters: {
    // 将三级结构转换为原有的扁平结构以保持兼容性
    '品牌地域': {
      type: 'multiple',
      options: buckConverterThreeLevelData.brand.region.options
    },
    '车规级': {
      type: 'single',
      options: buckConverterThreeLevelData.parameters.application.subcategories.automotive.options
    },
    '工业级': {
      type: 'single',
      options: buckConverterThreeLevelData.parameters.application.subcategories.industrial.options
    },
    '消费级': {
      type: 'single',
      options: buckConverterThreeLevelData.parameters.application.subcategories.consumer.options
    }
  }
};

// 订购详情模拟数据
export const placeholderOrderDetails: OrderDetail[] = [
  // TPS563201 的订购详情
  {
    id: 'TPS563201DDCR',
    model: 'TPS563201DDCR',
    chipId: 'TPS563201',
    package: 'SOT-23-THN (DDC)',
    pins: 6,
    silkscreen: '3201',
    packagingQuantity: '3,000',
    carrier: '大型 T&R',
    workTemp: '-40°C至125°C',
    lifecycle: '量产',
    rohs: '2',
    suppliers: [
      {
        name: '立创商城',
        price: '¥3.6015',
        stock: '2800',
        delivery: '现货',
        moq: '1',
        rating: 4.8
      },
      {
        name: '得捷电子',
        price: '¥3.8520',
        stock: '1200',
        delivery: '1-2天',
        moq: '10',
        rating: 4.7
      }
    ]
  },
  {
    id: 'TPS563201DDCT',
    model: 'TPS563201DDCT',
    chipId: 'TPS563201',
    package: 'SOT-23-THN (DDC)',
    pins: 6,
    silkscreen: '3201',
    packagingQuantity: '250',
    carrier: '小型 T&R',
    workTemp: '-40°C至125°C',
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
  },

  // TPS5430 的订购详情
  {
    id: 'TPS5430DDA',
    model: 'TPS5430DDA',
    chipId: 'TPS5430',
    package: 'HSOIC (DDA)',
    pins: 8,
    silkscreen: '5430',
    packagingQuantity: '75',
    carrier: '管',
    workTemp: '-40°C至125°C',
    lifecycle: '量产',
    rohs: '2',
    suppliers: [
      {
        name: 'TI官方',
        price: '$1.916',
        stock: '1000+',
        delivery: '现货',
        moq: '1ku',
        rating: 4.9
      },
      {
        name: '立创商城',
        price: '¥14.25',
        stock: '856',
        delivery: '现货',
        moq: '1',
        rating: 4.8
      }
    ]
  },
  {
    id: 'TPS5430DDAR',
    model: 'TPS5430DDAR',
    chipId: 'TPS5430',
    package: 'HSOIC (DDA)',
    pins: 8,
    silkscreen: '5430',
    packagingQuantity: '2,500',
    carrier: '大型 T&R',
    workTemp: '-40°C至125°C',
    lifecycle: '量产',
    rohs: '2',
    suppliers: [
      {
        name: 'TI官方',
        price: '$1.517',
        stock: '2500+',
        delivery: '现货',
        moq: '1ku',
        rating: 4.9
      },
      {
        name: '立创商城',
        price: '¥11.85',
        stock: '1200',
        delivery: '现货',
        moq: '1',
        rating: 4.8
      },
      {
        name: '得捷电子',
        price: '¥12.50',
        stock: '800',
        delivery: '1-2天',
        moq: '10',
        rating: 4.7
      }
    ]
  }
];

// 根据芯片ID查找订购详情
export function findOrderDetailsByChipId(chipId: string): OrderDetail[] {
  // 先通过chipId直接查找
  let results = placeholderOrderDetails.filter(order => order.chipId === chipId);

  // 如果没找到，尝试通过芯片model查找
  if (results.length === 0) {
    const chip = findChipById(chipId);
    if (chip) {
      results = placeholderOrderDetails.filter(order => order.chipId === chip.model);
    }
  }

  return results;
}

// 根据订购详情ID查找单个订购详情
export function findOrderDetailById(orderId: string): OrderDetail | undefined {
  return placeholderOrderDetails.find(order => order.id === orderId);
}

// 根据芯片ID和搜索查询查找订购详情（支持精确匹配特定订购型号）
export function findOrderDetailsByChipIdAndQuery(chipId: string, searchQuery?: string): OrderDetail[] {
  // 先获取该芯片的所有订购详情
  let results = findOrderDetailsByChipId(chipId);

  // 如果有搜索查询，检查是否是精确的订购型号搜索
  if (searchQuery && searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase().trim();

    // 检查搜索查询是否是完整的订购型号
    const exactOrderDetail = placeholderOrderDetails.find(orderDetail =>
      orderDetail.model.toLowerCase() === lowerQuery
    );

    if (exactOrderDetail && exactOrderDetail.chipId === chipId) {
      // 如果是精确的订购型号搜索，只返回该订购详情
      results = [exactOrderDetail];
    }
    // 否则返回所有订购详情（默认行为）
  }

  return results;
}

// TPS563201DDCR 的替代料数据
export const placeholderAlternativeParts: Record<string, AlternativePart[]> = {
  'TPS563201DDCR': [
    {
      id: 'AP62300TWU-7',
      partNumber: 'AP62300TWU-7',
      manufacturer: 'DIODES(美台)',
      package: 'TSOT-26-6',
      lifecycle: '量产',
      availability: 'pin to pin',
      description: 'DC/DC CONV HV BUCK,T',
      imageUrl: '/brands/image_td/AP62300TWU-7.png',
      datasheetUrl: '/docs/AP62300TWU-7-datasheet.pdf',
      pinToPin: true,
      functionalEquivalent: true,
      notes: 'DCDC CONV HV BUCK,T',
      alternativeLevel: 'P2P',
      brandCategory: 'FOREIGN',
      compatibilityScore: 95,
      similarities: ['相同的输入电压范围', '相同的输出电流', '相似的封装尺寸'],
      keyDifferences: ['开关频率略有不同', '内部补偿网络差异']
    },

    {
      id: 'RT6253B',
      partNumber: 'RT6253B',
      manufacturer: 'Richtek(立锜)',
      package: 'TSOT-26(FC)/SOT-563(FC)',
      lifecycle: '量产',
      availability: '功能相似',
      description: '17V Input, 3A, ACOT Buck Converter with Both FET Integrated',
      imageUrl: '/brands/image_td/RT6253B.png',
      datasheetUrl: '/docs/RT6253B-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '中微半导',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 85,
      similarities: ['相同的输入电压范围', '相同的输出电流', '集成FET设计'],
      keyDifferences: ['不同的控制架构', '封装略有差异', '补偿方式不同']
    },
    {
      id: 'RT6253A',
      partNumber: 'RT6253A',
      manufacturer: 'Richtek(立锜)',
      package: 'TSOT-26(FC)/SOT-563(FC)',
      lifecycle: '量产',
      availability: '功能相似',
      description: '17V Input, 3A, ACOT Buck Converter with Both FET Integrated',
      imageUrl: '/brands/image_td/RT6253A.png',
      datasheetUrl: '/docs/RT6253A-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '中微半导',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 85,
      similarities: ['相同的输入电压范围', '相同的输出电流', '集成FET设计'],
      keyDifferences: ['不同的控制架构', '封装略有差异', '补偿方式不同']
    },
    // 添加国内品牌替代料
    {
      id: 'TPS563201DDCR-SAME',
      partNumber: 'TPS563201DDCT',
      manufacturer: 'TI(德州仪器)',
      package: 'SOT-23-THN (DDC)',
      lifecycle: '量产',
      availability: '完全兼容',
      description: '4.5V 至 17V 输入、3A 输出、Eco 模式下的同步降压转换器',
      imageUrl: '/brands/image_td/TPS563201DDCT.png',
      datasheetUrl: '/docs/TPS563201-datasheet.pdf',
      pinToPin: true,
      functionalEquivalent: true,
      notes: '同品牌不同封装',
      alternativeLevel: 'BOM2BOM',
      brandCategory: 'SAME_BRAND',
      compatibilityScore: 100,
      similarities: ['完全相同的电气特性', '相同的管脚定义', '相同的控制逻辑'],
      keyDifferences: ['封装形式不同 (THN vs 标准)']
    },
    {
      id: 'CW3002',
      partNumber: 'CW3002',
      manufacturer: '中微半导体',
      package: 'SOT-23-6',
      lifecycle: '量产',
      availability: 'pin to pin',
      description: '4.5V-18V输入，3A同步降压转换器',
      imageUrl: '/brands/image_td/CW3002.png',
      datasheetUrl: '/docs/CW3002-datasheet.pdf',
      pinToPin: true,
      functionalEquivalent: true,
      notes: '国产替代',
      alternativeLevel: 'P2P',
      brandCategory: 'DOMESTIC',
      compatibilityScore: 92,
      similarities: ['相同的管脚定义', '相似的输入电压范围', '相同的输出电流'],
      keyDifferences: ['开关频率可调范围不同', '启动时序略有差异']
    },
    {
      id: 'SGM6603',
      partNumber: 'SGM6603',
      manufacturer: '圣邦微电子',
      package: 'SOT-23-6',
      lifecycle: '量产',
      availability: 'pin to pin',
      description: '4.5V-18V输入，3A同步降压转换器',
      imageUrl: '/brands/image_td/SGM6603.png',
      datasheetUrl: '/docs/SGM6603-datasheet.pdf',
      pinToPin: true,
      functionalEquivalent: true,
      notes: '国产替代',
      alternativeLevel: 'P2P',
      brandCategory: 'DOMESTIC',
      compatibilityScore: 90,
      similarities: ['相同的管脚定义', '相似的输入电压范围', '相同的输出电流'],
      keyDifferences: ['内部补偿网络不同', '过温保护阈值差异']
    },
    {
      id: 'STRG02TR',
      partNumber: 'STRG02TR',
      manufacturer: 'STR(意法)',
      package: 'VFDFPN 12 3X3X0.9',
      lifecycle: '立即供货',
      availability: '功能相似',
      description: 'Synchronous rectifier smart driver',
      imageUrl: '/brands/image_td/STRG02TR.png',
      datasheetUrl: '/docs/STRG02TR-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: false,
      notes: '意大利',
      alternativeLevel: 'PACKAGE',
      brandCategory: 'FOREIGN',
      compatibilityScore: 60,
      similarities: ['相似的封装尺寸'],
      keyDifferences: ['完全不同的功能', '不同的管脚定义', '不同的应用场景']
    },
    {
      id: 'LTC1266ACS#TRPBF',
      partNumber: 'LTC1266ACS#TRPBF',
      manufacturer: 'ADI(亚德诺)',
      package: 'SO-16',
      lifecycle: '立即供货',
      availability: '功能相似',
      description: 'IC REG CTRLR BUCK 16 SOIC',
      imageUrl: '/brands/image_td/LTC1266ACS%23TRPBF.png',
      datasheetUrl: '/docs/LTC1266ACS#TRPBF-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '美国',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 75,
      similarities: ['降压转换器功能', '可调输出'],
      keyDifferences: ['封装完全不同', '管脚定义不同', '控制方式差异较大']
    },
    {
      id: 'RT7250AZSP',
      partNumber: 'RT7250AZSP',
      manufacturer: 'Richtek(立锜)',
      package: 'SOIC-8(EP-154mil)',
      lifecycle: '立即供货',
      availability: '功能相似',
      description: 'IC REG BUCK ADJUSTABLE 8SOIC',
      imageUrl: '/brands/image_td/RT7250AZSP.png',
      datasheetUrl: '/docs/RT7250AZSP-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '中国台湾',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 80,
      similarities: ['降压转换器功能', '可调输出', '相似的输入电压范围'],
      keyDifferences: ['封装不同', '管脚定义不同', '输出电流能力差异']
    },
    {
      id: 'LT1506IR-SYNC',
      partNumber: 'LT1506IR-SYNC',
      manufacturer: 'ADI(亚德诺)',
      package: 'TO-263',
      lifecycle: '立即供货',
      availability: '功能相似',
      description: 'Conv DC-DC 4V to 15V Synchronous Step Down Single-Out 4.5A 8-Pin DDPAK',
      imageUrl: '/brands/image_td/LT1506IR-SYNC.png',
      datasheetUrl: '/docs/LT1506IR-SYNC-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '美国',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 78,
      similarities: ['同步降压转换器', '相似的输出电流', '相似的输入电压范围'],
      keyDifferences: ['封装完全不同', '管脚定义不同', '散热特性差异']
    },
    {
      id: 'LT1506CR#PBF',
      partNumber: 'LT1506CR#PBF',
      manufacturer: 'ADI(亚德诺)',
      package: 'DDPAK-7',
      lifecycle: '停产',
      availability: '功能相似',
      description: 'IC REG BUCK ADJ 4.5A DDPAK-7',
      imageUrl: '/brands/image_td/LT1506CR%23PBF.png',
      datasheetUrl: '/docs/LT1506CR#PBF-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '美国',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 70,
      similarities: ['降压转换器功能', '可调输出'],
      keyDifferences: ['已停产', '封装不同', '管脚定义不同']
    },
    {
      id: 'LT1507CN8',
      partNumber: 'LT1507CN8',
      manufacturer: 'ADI(亚德诺)',
      package: 'DIP-8',
      lifecycle: '停产',
      availability: '功能相似',
      description: 'Conv DC-DC 4V to 15V Synchronous Step Down Single-Out 1.5A 8-Pin PDIP',
      imageUrl: '/brands/image_td/LT1507CN8.png',
      datasheetUrl: '/docs/LT1507CN8-datasheet.pdf',
      pinToPin: false,
      functionalEquivalent: true,
      notes: '美国',
      alternativeLevel: 'FUNCTIONAL',
      brandCategory: 'FOREIGN',
      compatibilityScore: 65,
      similarities: ['同步降压转换器', '相似的输入电压范围'],
      keyDifferences: ['已停产', '输出电流较小', '封装完全不同', 'DIP封装不适合现代设计']
    }
  ]
};

// 根据订购型号查找替代料
export function findAlternativePartsByOrderModel(orderModel: string): AlternativePart[] {
  return placeholderAlternativeParts[orderModel] || [];
}

// 通用分类筛选数据配置
export const categoryFilterConfigs: Record<string, CategoryFilterData> = {
  // Buck(降压)开关稳压器
  'Buck(降压)开关稳压器': buckConverterFilterData,

  // LDO低压差线性稳压器
  'LDO低压差线性稳压器': {
    brands: [
      'TI(德州仪器)', 'ADI(亚德诺)', 'ST(意法)', 'Infineon(英飞凌)',
      'ROHM(罗姆)', 'Renesas(瑞萨)', 'MPS(芯源)', 'onsemi(安森美)',
      'Maxim(美信)', 'Linear(凌特)', 'TOREX(特瑞仕)', 'Nisshinbo(日清纺)',
      'DIODES(美台)', 'UTC(友顺)', 'Rochester(罗彻斯特)', '圣邦微电子'
    ],
    packages: [
      'SOT-23', 'SOT-23-5', 'SOT-89', 'TO-220', 'TO-252', 'TO-263',
      'SOIC-8', 'MSOP-8', 'DFN-6', 'QFN-16', 'WLCSP'
    ],
    parameters: {
      '输出电压类型': {
        type: 'single',
        options: ['固定', '可调']
      },
      '输出电压范围': {
        type: 'range',
        options: ['1.2V', '1.8V', '2.5V', '3.3V', '5V', '12V', '15V']
      },
      '最大输出电流': {
        type: 'range',
        options: ['100mA', '300mA', '500mA', '1A', '3A', '5A', '10A']
      },
      '压差电压': {
        type: 'range',
        options: ['100mV', '200mV', '300mV', '500mV', '1V', '2V']
      },
      '静态电流': {
        type: 'range',
        options: ['1µA', '10µA', '50µA', '100µA', '1mA', '10mA']
      },
      '工作温度': {
        type: 'single',
        options: ['-40°C至85°C', '-40°C至125°C', '-55°C至150°C']
      }
    }
  },

  // 32位微控制器
  '32位微控制器': {
    brands: [
      'STMicroelectronics', 'NXP(恩智浦)', 'Infineon(英飞凌)', 'TI(德州仪器)',
      'Microchip', 'Renesas(瑞萨)', 'Cypress', 'Silicon Labs',
      'Espressif Systems', 'Nordic', 'Realtek', '兆易创新',
      '华大半导体', '中颖电子', '航顺芯片', '灵动微电子'
    ],
    packages: [
      'LQFP-48', 'LQFP-64', 'LQFP-100', 'LQFP-144', 'LQFP-176',
      'QFN-32', 'QFN-48', 'QFN-64', 'BGA-64', 'BGA-100', 'BGA-144',
      'WLCSP', 'Module'
    ],
    parameters: {
      '内核架构': {
        type: 'single',
        options: ['ARM Cortex-M0', 'ARM Cortex-M0+', 'ARM Cortex-M3', 'ARM Cortex-M4', 'ARM Cortex-M7', 'RISC-V', 'Xtensa']
      },
      '主频范围': {
        type: 'range',
        options: ['48MHz', '72MHz', '100MHz', '168MHz', '200MHz', '400MHz', '600MHz']
      },
      'Flash容量': {
        type: 'range',
        options: ['32KB', '64KB', '128KB', '256KB', '512KB', '1MB', '2MB', '4MB']
      },
      'RAM容量': {
        type: 'range',
        options: ['8KB', '16KB', '32KB', '64KB', '128KB', '256KB', '512KB', '1MB']
      },
      '无线连接': {
        type: 'multiple',
        options: ['Wi-Fi', 'Bluetooth', 'Zigbee', 'LoRa', 'NB-IoT', '2.4GHz']
      },
      '特殊功能': {
        type: 'multiple',
        options: ['USB', 'CAN', 'Ethernet', 'LCD控制器', 'DSP', 'FPU', '加密引擎']
      }
    }
  },

  // 运算放大器
  '运算放大器': {
    brands: [
      'TI(德州仪器)', 'ADI(亚德诺)', 'Linear(凌特)', 'Maxim(美信)',
      'ST(意法)', 'onsemi(安森美)', 'Intersil(英特矽)', 'Microchip',
      'ROHM(罗姆)', 'Renesas(瑞萨)', '圣邦微电子', '芯海科技',
      '思瑞浦', '艾为电子', '矽力杰', '钰泰半导体'
    ],
    packages: [
      'SOT-23-5', 'SOT-23-6', 'SOIC-8', 'MSOP-8', 'DFN-6', 'QFN-16',
      'TSSOP-14', 'WLCSP', 'SC-70'
    ],
    parameters: {
      '通道数': {
        type: 'single',
        options: ['单通道', '双通道', '四通道']
      },
      '增益带宽积': {
        type: 'range',
        options: ['1MHz', '10MHz', '50MHz', '100MHz', '500MHz', '1GHz']
      },
      '输入偏置电流': {
        type: 'range',
        options: ['1pA', '10pA', '100pA', '1nA', '10nA', '100nA', '1µA']
      },
      '输入失调电压': {
        type: 'range',
        options: ['10µV', '100µV', '500µV', '1mV', '5mV', '10mV']
      },
      '电源电压': {
        type: 'range',
        options: ['1.8V', '2.7V', '5V', '12V', '15V', '30V', '36V']
      },
      '特殊类型': {
        type: 'multiple',
        options: ['低噪声', '高速', '精密', '低功耗', '轨到轨', '仪表放大器']
      }
    }
  }
};

// 根据分类名称获取筛选配置
export function getCategoryFilterData(categoryName: string): CategoryFilterData | null {
  // 尝试精确匹配
  if (categoryFilterConfigs[categoryName]) {
    return categoryFilterConfigs[categoryName];
  }

  // 尝试部分匹配
  for (const [key, config] of Object.entries(categoryFilterConfigs)) {
    if (categoryName.includes(key) || key.includes(categoryName)) {
      return config;
    }
  }

  // 返回默认配置
  return {
    brands: [
      'TI(德州仪器)', 'ADI(亚德诺)', 'ST(意法)', 'Infineon(英飞凌)',
      'NXP(恩智浦)', 'Renesas(瑞萨)', 'Microchip', 'onsemi(安森美)',
      'Maxim(美信)', 'ROHM(罗姆)', 'Cypress', 'Silicon Labs'
    ],
    packages: [
      'SOT-23', 'SOIC-8', 'QFN-16', 'QFP-32', 'BGA-64', 'LQFP-48',
      'DFN-8', 'MSOP-8', 'TSSOP-14', 'WLCSP'
    ],
    parameters: {
      '生命周期': {
        type: 'single',
        options: ['量产', '试产', '停产', '逐步淘汰']
      },
      '工作温度': {
        type: 'single',
        options: ['-40°C至85°C', '-40°C至125°C', '-55°C至150°C']
      },
      '认证标准': {
        type: 'multiple',
        options: ['RoHS', 'AEC-Q100', 'AEC-Q200', 'REACH']
      }
    }
  };
}