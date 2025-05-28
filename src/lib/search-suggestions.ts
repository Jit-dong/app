// 搜索建议数据

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'match' | 'category' | 'brand' | 'series';
  category?: string;
  count?: number;
  description?: string;
  brand?: string;
}

// 热门搜索建议
export const popularSuggestions: SearchSuggestion[] = [
  { id: 'p1', text: 'STM32F407', type: 'popular', count: 1250, brand: 'STMicroelectronics', description: '高性能ARM Cortex-M4微控制器' },
  { id: 'p2', text: 'ESP32', type: 'popular', count: 980, brand: 'Espressif', description: 'WiFi+蓝牙双模芯片' },
  { id: 'p3', text: 'TPS5430', type: 'popular', count: 756, brand: 'Texas Instruments', description: '3A降压转换器' },
  { id: 'p4', text: 'LM358', type: 'popular', count: 642, brand: 'Texas Instruments', description: '双运算放大器' },
  { id: 'p5', text: 'AMS1117', type: 'popular', count: 534, brand: 'Advanced Monolithic Systems', description: '低压差线性稳压器' },
  { id: 'p6', text: 'STM32F103', type: 'popular', count: 489, brand: 'STMicroelectronics', description: 'ARM Cortex-M3微控制器' },
  { id: 'p7', text: 'LM2596', type: 'popular', count: 423, brand: 'Texas Instruments', description: '降压开关稳压器' },
  { id: 'p8', text: 'NE555', type: 'popular', count: 398, brand: 'Texas Instruments', description: '定时器芯片' },
  { id: 'p9', text: 'CH340', type: 'popular', count: 367, brand: 'WCH', description: 'USB转串口芯片' },
  { id: 'p10', text: 'ESP8266', type: 'popular', count: 345, brand: 'Espressif', description: 'WiFi芯片' },
];

// 分类建议
export const categorySuggestions: SearchSuggestion[] = [
  { id: 'c1', text: '微控制器', type: 'category', category: 'MCU', description: '单片机、ARM、RISC-V等' },
  { id: 'c2', text: '电源管理', type: 'category', category: 'Power', description: '稳压器、开关电源、电池管理' },
  { id: 'c3', text: '运算放大器', type: 'category', category: 'Analog', description: '运放、比较器、仪表放大器' },
  { id: 'c4', text: '传感器', type: 'category', category: 'Sensor', description: '温度、湿度、压力、光线传感器' },
  { id: 'c5', text: '通信芯片', type: 'category', category: 'Communication', description: 'WiFi、蓝牙、LoRa、CAN' },
  { id: 'c6', text: '存储器', type: 'category', category: 'Memory', description: 'Flash、EEPROM、SRAM、DRAM' },
  { id: 'c7', text: '接口芯片', type: 'category', category: 'Interface', description: 'USB、UART、SPI、I2C' },
  { id: 'c8', text: '显示驱动', type: 'category', category: 'Display', description: 'LCD、OLED、LED驱动芯片' },
  { id: 'c9', text: '音频芯片', type: 'category', category: 'Audio', description: '音频编解码、功放、DAC/ADC' },
  { id: 'c10', text: '时钟芯片', type: 'category', category: 'Clock', description: '晶振、时钟发生器、RTC' },
];

// 品牌建议
export const brandSuggestions: SearchSuggestion[] = [
  { id: 'b1', text: 'STMicroelectronics', type: 'brand', description: '意法半导体' },
  { id: 'b2', text: 'Texas Instruments', type: 'brand', description: '德州仪器' },
  { id: 'b3', text: 'Espressif', type: 'brand', description: '乐鑫科技' },
  { id: 'b4', text: 'Microchip', type: 'brand', description: '微芯科技' },
  { id: 'b5', text: 'Analog Devices', type: 'brand', description: '亚德诺半导体' },
  { id: 'b6', text: 'Infineon', type: 'brand', description: '英飞凌' },
  { id: 'b7', text: 'NXP', type: 'brand', description: '恩智浦' },
  { id: 'b8', text: 'Maxim', type: 'brand', description: '美信' },
  { id: 'b9', text: 'Linear Technology', type: 'brand', description: '凌力尔特' },
  { id: 'b10', text: 'ON Semiconductor', type: 'brand', description: '安森美' },
];

// 系列建议
export const seriesSuggestions: SearchSuggestion[] = [
  { id: 's1', text: 'STM32F4系列', type: 'series', brand: 'STMicroelectronics', description: 'ARM Cortex-M4高性能微控制器' },
  { id: 's2', text: 'STM32F1系列', type: 'series', brand: 'STMicroelectronics', description: 'ARM Cortex-M3主流微控制器' },
  { id: 's3', text: 'ESP32系列', type: 'series', brand: 'Espressif', description: 'WiFi+蓝牙物联网芯片' },
  { id: 's4', text: 'TPS系列', type: 'series', brand: 'Texas Instruments', description: '开关电源管理芯片' },
  { id: 's5', text: 'LM系列', type: 'series', brand: 'Texas Instruments', description: '线性稳压器和运放' },
  { id: 's6', text: 'PIC系列', type: 'series', brand: 'Microchip', description: 'PIC微控制器' },
  { id: 's7', text: 'AVR系列', type: 'series', brand: 'Microchip', description: 'AVR微控制器' },
  { id: 's8', text: 'AD系列', type: 'series', brand: 'Analog Devices', description: '模拟器件' },
];

// 获取搜索建议的函数
export function getSearchSuggestions(query: string = '', limit: number = 8): SearchSuggestion[] {
  if (!query.trim()) {
    // 没有查询时返回热门搜索和分类
    return [
      ...popularSuggestions.slice(0, 5),
      ...categorySuggestions.slice(0, 3),
    ].slice(0, limit);
  }

  const lowerQuery = query.toLowerCase();
  const allSuggestions = [
    ...popularSuggestions,
    ...categorySuggestions,
    ...brandSuggestions,
    ...seriesSuggestions,
  ];

  // 精确匹配（开头匹配）
  const exactMatches = allSuggestions.filter(s =>
    s.text.toLowerCase().startsWith(lowerQuery)
  );

  // 包含匹配
  const containsMatches = allSuggestions.filter(s =>
    s.text.toLowerCase().includes(lowerQuery) &&
    !s.text.toLowerCase().startsWith(lowerQuery)
  );

  // 描述匹配
  const descriptionMatches = allSuggestions.filter(s =>
    s.description?.toLowerCase().includes(lowerQuery) &&
    !s.text.toLowerCase().includes(lowerQuery)
  );

  // 品牌匹配
  const brandMatches = allSuggestions.filter(s =>
    s.brand?.toLowerCase().includes(lowerQuery) &&
    !s.text.toLowerCase().includes(lowerQuery) &&
    !s.description?.toLowerCase().includes(lowerQuery)
  );

  // 合并结果并标记为匹配类型
  const results = [
    ...exactMatches.map(s => ({ ...s, type: 'match' as const })),
    ...containsMatches.map(s => ({ ...s, type: 'match' as const })),
    ...descriptionMatches.map(s => ({ ...s, type: 'match' as const })),
    ...brandMatches.map(s => ({ ...s, type: 'match' as const })),
  ];

  // 去重并限制数量
  const uniqueResults = results.filter((item, index, self) =>
    index === self.findIndex(t => t.id === item.id)
  );

  return uniqueResults.slice(0, limit);
}

// 获取最近搜索记录（实际项目中应该从localStorage获取）
export function getRecentSearches(): SearchSuggestion[] {
  // 模拟从localStorage获取 - 增加更多项目
  const mockRecent = [
    { id: 'r1', text: 'STM32F103', type: 'recent' as const },
    { id: 'r2', text: 'Arduino', type: 'recent' as const },
    { id: 'r3', text: 'LM2596', type: 'recent' as const },
    { id: 'r4', text: '运算放大器', type: 'recent' as const },
    { id: 'r5', text: 'ESP32', type: 'recent' as const },
    { id: 'r6', text: 'TPS5430', type: 'recent' as const },
    { id: 'r7', text: 'LM358', type: 'recent' as const },
    { id: 'r8', text: 'AMS1117', type: 'recent' as const },
    { id: 'r9', text: 'NE555', type: 'recent' as const },
    { id: 'r10', text: '74HC595', type: 'recent' as const },
    { id: 'r11', text: 'ATmega328P', type: 'recent' as const },
    { id: 'r12', text: 'Raspberry Pi', type: 'recent' as const },
  ];

  return mockRecent;
}

// 保存搜索记录（实际项目中应该保存到localStorage）
export function saveSearchHistory(query: string): void {
  // 模拟保存到localStorage
  console.log('保存搜索记录:', query);
}
