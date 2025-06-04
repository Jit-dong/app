export interface Category {
  name: string;
  subCategories?: Category[];
}

export const productCategories: Category[] = [
  {
    name: "电源管理",
    subCategories: [
      {
        name: "AC-DC控制器",
        subCategories: [
          { name: "原边反馈控制器" },
          { name: "副边反馈控制器" },
          { name: "反激控制器(未细分)" },
          { name: "PWM控制器" },
          { name: "同步整流器" },
          { name: "非隔离AC-DC" },
          { name: "PFC功率因数校正" },
          { name: "反馈信号发生器" },
          { name: "LLC谐振控制器" },
          { name: "正激控制器" },
          { name: "半桥控制器" },
          { name: "全桥控制器" },
          { name: "推挽控制器" },
          { name: "相移全桥控制器" },
          { name: "负载均分器" },
          { name: "交流过零检测" },
        ],
      },
      {
        name: "开关稳压器/DC-DC转换器",
        subCategories: [
          { name: "Buck(降压)开关稳压器" },
          { name: "Boost(升压)开关稳压器" },
          { name: "Buck-Boost(升降压)开关稳压器" },
          { name: "Forward(正激式)开关稳压器" },
          { name: "Flyback(反激式)开关稳压器" },
          { name: "Charge Pump(电荷泵)" },
          { name: "未细分开关稳压器(DC/DC转换器)" },
          { name: "线性稳压器控制器" },
          { name: "RMS至DC转换器" },
          { name: "反馈回路功率控制器" },
          { name: "以太网供电-PoE控制器" },
          { name: "照明/镇流器控制器" },
          { name: "AC/DC控制器" },
        ],
      },
      {
        name: "LDO低压差线性稳压器",
        subCategories: [
            { name: "正可调LDO" },
            { name: "正固定LDO" },
            { name: "负可调LDO" },
            { name: "负固定LDO" },
            { name: "双路输出LDO" },
            { name: "多路输出LDO" },
        ]
      },
      {
        name: "电池管理",
        subCategories: [
            { name: "电池充电管理" },
            { name: "电池均衡器" },
            { name: "电池保护和监控" },
            { name: "电池电量计" },
            { name: "电池充电器评估板" },
        ]
      },
      { name: "USB-C充电控制" },
      { name: "功率驱动器" },
      { name: "电源开关" },
      { name: "电源保护" },
      { name: "电源监视" },
      { name: "无线充电" },
      { name: "以太网供电" },
      { name: "LED照明-DC/DC" },
      { name: "LED照明-AC/DC" },
      { name: "参考基准" },
      { name: "显示电源" },
      { name: "PMIC" },
    ],
  },
  {
    name: "信号链",
    subCategories: [
        { name: "放大器" },
        { name: "数据转换器" },
        { name: "模拟开关/多路复用器" },
        { name: "音频芯片" },
        { name: "比较器" },
        { name: "电流检测与传感" },
        { name: "数字电位器" },
        { name: "视频芯片" },
        { name: "滤波器" },
    ]
  },
  {
    name: "MCU微控制器",
    subCategories: [
        { name: "8位微控制器" },
        { name: "16位微控制器" },
        { name: "32位微控制器" },
        { name: "微控制器评估板" },
    ]
  },
  {
    name: "嵌入式处理器和控制器",
    subCategories: [
        { name: "DSP数字信号处理器" },
        { name: "MPU微处理器" },
        { name: "应用处理器" },
        { name: "FPGA现场可编程门阵列" },
        { name: "CPLD复杂可编程逻辑器件" },
        { name: "SoC片上系统" },
        { name: "处理器评估板" },
    ]
  },
  {
    name: "存储器",
    subCategories: [
        { name: "DRAM" },
        { name: "SRAM" },
        { name: "FLASH" },
        { name: "EEPROM" },
        { name: "FRAM" },
        { name: "存储卡" },
        { name: "存储器评估板" },
    ]
  },
  {
    name: "射频和无线",
    subCategories: [
        { name: "射频收发器" },
        { name: "射频放大器" },
        { name: "射频混频器" },
        { name: "射频调制器/解调器" },
        { name: "Wi-Fi芯片" },
        { name: "蓝牙芯片" },
        { name: "Zigbee芯片" },
        { name: "NFC芯片" },
        { name: "GNSS/GPS芯片" },
        { name: "无线通信模组" },
        { name: "无线芯片评估板" },
    ]
  },
  {
    name: "接口芯片",
    subCategories: [
        { name: "USB接口" },
        { name: "UART接口" },
        { name: "I2C接口" },
        { name: "SPI接口" },
        { name: "CAN接口" },
        { name: "LIN接口" },
        { name: "以太网接口" },
        { name: "LVDS/M-LVDS接口" },
        { name: "HDMI/DVI接口" },
        { name: "显示接口" },
        { name: "串行器/解串器" },
        { name: "电平转换器" },
        { name: "接口芯片评估板" },
    ]
  },
  {
    name: "专用集成电路",
    subCategories: [
        { name: "汽车电子芯片" },
        { name: "电机驱动芯片" },
        { name: "安全加密芯片" },
        { name: "电源模块" },
        { name: "时钟与计时芯片" },
        { name: "可编程逻辑器件" },
    ]
  },
  {
    name: "传感器",
    subCategories: [
        { name: "温度传感器" },
        { name: "湿度传感器" },
        { name: "压力传感器" },
        { name: "加速度传感器" },
        { name: "陀螺仪传感器" },
        { name: "磁传感器" },
        { name: "光学传感器" },
        { name: "气体传感器" },
        { name: "MEMS麦克风" },
        { name: "传感器融合芯片" },
        { name: "传感器评估板" },
        { name: "位置传感器" },
        { name: "编码器" },
        { name: "流量传感器" },
        { name: "液位传感器" },
        { name: "力传感器/称重传感器" },
        { name: "振动传感器" },
        { name: "超声波传感器" },
    ]
  },
  {
    name: "SiC/GaN",
    subCategories: [
        { name: "SiC MOSFET" },
        { name: "SiC二极管" },
        { name: "GaN HEMT" },
        { name: "SiC/GaN驱动器" },
        { name: "SiC/GaN模块" },
        { name: "SiC/GaN评估板" },
    ]
  },
  {
    name: "MOS/IGBT",
    subCategories: [
        { name: "低压MOSFET" },
        { name: "中高压MOSFET" },
        { name: "IGBT单管" },
        { name: "IGBT模块" },
        { name: "MOSFET驱动器" },
        { name: "IGBT驱动器" },
        { name: "智能功率模块IPM" },
        { name: "MOS/IGBT评估板" },
    ]
  },
  {
    name: "晶体管/晶闸管",
    subCategories: [
        { name: "双极性晶体管BJT" },
        { name: "结型场效应管JFET" },
        { name: "数字晶体管" },
        { name: "达林顿晶体管" },
        { name: "晶闸管/可控硅SCR" },
        { name: "双向晶闸管TRIAC" },
    ]
  },
  {
    name: "二极管",
    subCategories: [
        { name: "肖特基二极管" },
        { name: "快恢复二极管" },
        { name: "超快恢复二极管" },
        { name: "整流二极管" },
        { name: "齐纳二极管" },
        { name: "TVS二极管" },
        { name: "开关二极管" },
        { name: "变容二极管" },
        { name: "PIN二极管" },
        { name: "桥式整流器" },
    ]
  },
  {
    name: "保护器件",
    subCategories: [
        { name: "ESD保护器件" },
        { name: "TVS瞬态电压抑制器" },
        { name: "压敏电阻" },
        { name: "气体放电管" },
        { name: "PPTC自恢复保险丝" },
        { name: "保险丝" },
    ]
  },
  {
    name: "光电器件",
    subCategories: [
        { name: "LED发光二极管" },
        { name: "LED驱动器" },
        { name: "光电耦合器" },
        { name: "光电二极管" },
        { name: "光电晶体管" },
        { name: "红外器件" },
        { name: "激光二极管" },
        { name: "光纤收发器" },
        { name: "显示屏及驱动" },
    ]
  },
  {
    name: "射频器件",
    subCategories: [
        { name: "射频滤波器" },
        { name: "射频开关" },
        { name: "射频衰减器" },
        { name: "射频耦合器/功分器" },
        { name: "巴伦" },
        { name: "天线" },
    ]
  },
  {
    name: "时钟和计时",
    subCategories: [
        { name: "晶振/振荡器" },
        { name: "时钟发生器" },
        { name: "时钟缓冲器" },
        { name: "实时时钟RTC" },
    ]
  },
  {
    name: "逻辑器件",
    subCategories: [
        { name: "逻辑门" },
        { name: "触发器" },
        { name: "计数器" },
        { name: "编码器/解码器" },
        { name: "多路复用器" },
        { name: "缓冲器/驱动器" },
    ]
  },
];
