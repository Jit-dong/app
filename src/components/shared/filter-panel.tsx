
"use client";

import { Card, CardContent, CardHeader, CardTitle as DeprecatedCardTitle } from "@/components/ui/card"; // DeprecatedCardTitle might be unused now
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"; // Import Sheet components

// Placeholder data - in a real app, this would come from an API or config
const manufacturers = ["STMicroelectronics", "Espressif Systems", "Microchip Technology", "Broadcom Inc.", "Texas Instruments", "Analog Devices"];
const packageTypes = ["LQFP100", "Module", "PDIP28", "SoC", "SOP-8", "QFN-24", "BGA"];
const lifecycleStatuses = ["Active", "EOL", "NRND", "Preliminary", "Obsolete"];
const temperatureRanges = ["Commercial (0°C to 70°C)", "Industrial (-40°C to 85°C)", "Automotive (-40°C to 125°C)"];
const interfaceTypes = ["I2C", "SPI", "UART", "CAN", "USB", "Ethernet"];

// Example categories - can be nested
const categories = [
  { 
    name: "电源管理", 
    subCategories: [
      { name: "LDO 稳压器" },
      { name: "DC/DC 转换器", subCategories: ["升压", "降压", "升降压"] },
      { name: "电池管理" }
    ] 
  },
  { 
    name: "微控制器 (MCU)",
    subCategories: [
      { name: "8位 MCU"},
      { name: "16位 MCU"},
      { name: "32位 MCU"},
    ]
  },
  { name: "传感器" },
  { name: "接口芯片" },
];


export interface ChipFilters {
  category?: string;
  manufacturer?: string[];
  packageType?: string[];
  lifecycleStatus?: string[];
  operatingVoltageMin?: number;
  operatingVoltageMax?: number;
  outputCurrentMin?: number;
  outputCurrentMax?: number;
  temperatureRange?: string;
  hasDatasheet?: boolean;
  automotiveGrade?: boolean;
  rohsCompliant?: boolean;
  lowPower?: boolean;
  internalOscillator?: boolean;
  interfaceTypes?: string[];
}

interface FilterPanelProps {
  onApplyFilters: (filters: ChipFilters) => void;
  onClearFilters: () => void;
  initialFilters?: ChipFilters;
  setSheetOpen: Dispatch<SetStateAction<boolean>>; // To close the sheet
}

export default function FilterPanel({ onApplyFilters, onClearFilters, initialFilters = {}, setSheetOpen }: FilterPanelProps) {
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(initialFilters.category);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(initialFilters.manufacturer || []);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState<string[]>(initialFilters.packageType || []);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters.lifecycleStatus || []);
  
  const [opVoltageMin, setOpVoltageMin] = useState<string>(initialFilters.operatingVoltageMin?.toString() || "");
  const [opVoltageMax, setOpVoltageMax] = useState<string>(initialFilters.operatingVoltageMax?.toString() || "");
  const [outCurrentMin, setOutCurrentMin] = useState<string>(initialFilters.outputCurrentMin?.toString() || "");
  const [outCurrentMax, setOutCurrentMax] = useState<string>(initialFilters.outputCurrentMax?.toString() || "");

  const [selectedTempRange, setSelectedTempRange] = useState<string | undefined>(initialFilters.temperatureRange);
  const [hasDatasheet, setHasDatasheet] = useState<boolean>(initialFilters.hasDatasheet || false);
  const [isAutomotive, setIsAutomotive] = useState<boolean>(initialFilters.automotiveGrade || false);
  const [isRohs, setIsRohs] = useState<boolean>(initialFilters.rohsCompliant || false);
  const [isLowPower, setIsLowPower] = useState<boolean>(initialFilters.lowPower || false);
  const [hasInternalOsc, setHasInternalOsc] = useState<boolean>(initialFilters.internalOscillator || false);
  const [selectedInterfaces, setSelectedInterfaces] = useState<string[]>(initialFilters.interfaceTypes || []);

  const handleMultiSelectChange = (setter: Dispatch<SetStateAction<string[]>>, item: string, checked: boolean) => {
    setter(prev =>
      checked ? [...prev, item] : prev.filter(m => m !== item)
    );
  };

  const handleApply = () => {
    const filtersToApply: ChipFilters = {
      category: currentCategory,
      manufacturer: selectedManufacturers.length > 0 ? selectedManufacturers : undefined,
      packageType: selectedPackageTypes.length > 0 ? selectedPackageTypes : undefined,
      lifecycleStatus: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      operatingVoltageMin: opVoltageMin ? parseFloat(opVoltageMin) : undefined,
      operatingVoltageMax: opVoltageMax ? parseFloat(opVoltageMax) : undefined,
      outputCurrentMin: outCurrentMin ? parseFloat(outCurrentMin) : undefined,
      outputCurrentMax: outCurrentMax ? parseFloat(outCurrentMax) : undefined,
      temperatureRange: selectedTempRange,
      hasDatasheet: hasDatasheet || undefined, // only include if true
      automotiveGrade: isAutomotive || undefined,
      rohsCompliant: isRohs || undefined,
      lowPower: isLowPower || undefined,
      internalOscillator: hasInternalOsc || undefined,
      interfaceTypes: selectedInterfaces.length > 0 ? selectedInterfaces : undefined,
    };
    onApplyFilters(filtersToApply);
    setSheetOpen(false); // Close the sheet on apply
  };

  const handleReset = () => {
    setCurrentCategory(undefined);
    setSelectedManufacturers([]);
    setSelectedPackageTypes([]);
    setSelectedStatuses([]);
    setOpVoltageMin("");
    setOpVoltageMax("");
    setOutCurrentMin("");
    setOutCurrentMax("");
    setSelectedTempRange(undefined);
    setHasDatasheet(false);
    setIsAutomotive(false);
    setIsRohs(false);
    setIsLowPower(false);
    setHasInternalOsc(false);
    setSelectedInterfaces([]);
    onClearFilters();
    // Optionally keep the sheet open or close it: setSheetOpen(false);
  };
  
  const localizedLifecycleStatuses = {
    "Active": "活跃",
    "EOL": "停产",
    "NRND": "不推荐用于新设计",
    "Preliminary": "初步",
    "Obsolete": "过时"
  };

  const renderCategorySelector = (categoriesToRender: any[], level = 0, parentPath = ""): JSX.Element[] => {
    return categoriesToRender.map(cat => {
      const currentPath = parentPath ? `${parentPath} > ${cat.name}` : cat.name;
      if (cat.subCategories && cat.subCategories.length > 0) {
        return (
          <AccordionItem value={currentPath} key={currentPath} className="border-b-0">
            <AccordionTrigger className={`py-2 px-${2 + level * 2} text-sm hover:bg-muted/50 rounded-md`}>
              {cat.name}
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <div className={`py-1 px-${4 + level * 2} text-sm hover:bg-accent/10 rounded-md cursor-pointer`} onClick={() => setCurrentCategory(currentPath.replace(/ > .*/, ` > ${cat.name} (全部)`))}>
                全部 {cat.name}
              </div>
              {renderCategorySelector(cat.subCategories, level + 1, currentPath)}
            </AccordionContent>
          </AccordionItem>
        );
      }
      return (
         <div key={currentPath} className={`py-2 px-${4 + level * 2} text-sm hover:bg-accent/10 rounded-md cursor-pointer ${currentCategory === currentPath ? 'bg-accent text-accent-foreground' : ''}`} onClick={() => setCurrentCategory(currentPath)}>
          {cat.name}
        </div>
      );
    });
  };


  return (
    <>
      <SheetHeader className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleReset} className="text-sm">重置</Button>
            <SheetTitle className="text-lg font-semibold">筛选条件</SheetTitle>
            <SheetClose asChild>
                <Button variant="ghost" onClick={handleApply} className="text-sm text-accent">完成</Button>
            </SheetClose>
        </div>
      </SheetHeader>

      <ScrollArea className="h-[calc(100vh-120px)]"> {/* Adjust height as needed */}
        <div className="p-4 space-y-6">
          {/* Basic Attributes Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-md">基础属性</h3>
            
            {/* Category */}
            <div className="space-y-1">
              <Label className="text-sm">分类: {currentCategory || "全部"}</Label>
              <Accordion type="single" collapsible className="w-full border rounded-md">
                 {renderCategorySelector(categories)}
              </Accordion>
            </div>

            {/* Manufacturer */}
            <FilterMultiSelectGroup
              title="品牌 (制造商)"
              items={manufacturers}
              selectedItems={selectedManufacturers}
              onChange={(item, checked) => handleMultiSelectChange(setSelectedManufacturers, item, checked)}
            />

            {/* Package Type */}
             <FilterMultiSelectGroup
              title="封装类型"
              items={packageTypes}
              selectedItems={selectedPackageTypes}
              onChange={(item, checked) => handleMultiSelectChange(setSelectedPackageTypes, item, checked)}
            />
          </div>

          {/* Key Parameters Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-md">关键参数</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputWithLabel label="工作电压 (Min V)" value={opVoltageMin} onChange={e => setOpVoltageMin(e.target.value)} placeholder="例如 1.8" type="number" />
              <InputWithLabel label="工作电压 (Max V)" value={opVoltageMax} onChange={e => setOpVoltageMax(e.target.value)} placeholder="例如 5.5" type="number" />
              <InputWithLabel label="输出电流 (Min A)" value={outCurrentMin} onChange={e => setOutCurrentMin(e.target.value)} placeholder="例如 0.1" type="number" />
              <InputWithLabel label="输出电流 (Max A)" value={outCurrentMax} onChange={e => setOutCurrentMax(e.target.value)} placeholder="例如 3" type="number" />
            </div>
            <div>
              <Label htmlFor="temp-range" className="text-sm">温度范围</Label>
              <Select value={selectedTempRange} onValueChange={setSelectedTempRange}>
                <SelectTrigger id="temp-range">
                  <SelectValue placeholder="选择温度范围" />
                </SelectTrigger>
                <SelectContent>
                  {temperatureRanges.map(range => (
                    <SelectItem key={range} value={range}>{range}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Features & Certifications Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-md">特性与认证</h3>
            <SwitchWithLabel label="有PDF (Datasheet)" checked={hasDatasheet} onCheckedChange={setHasDatasheet} />
            <SwitchWithLabel label="车规级" checked={isAutomotive} onCheckedChange={setIsAutomotive} />
            <SwitchWithLabel label="RoHS 兼容" checked={isRohs} onCheckedChange={setIsRohs} />
            <SwitchWithLabel label="低功耗" checked={isLowPower} onCheckedChange={setIsLowPower} />
            <SwitchWithLabel label="内置振荡器" checked={hasInternalOsc} onCheckedChange={setHasInternalOsc} />
            
            <FilterMultiSelectGroup
              title="接口类型"
              items={interfaceTypes}
              selectedItems={selectedInterfaces}
              onChange={(item, checked) => handleMultiSelectChange(setSelectedInterfaces, item, checked)}
            />

            {/* Lifecycle Status - Moved here to group with other features/tags */}
             <div>
              <h4 className="font-semibold mb-2 text-sm">生命周期状态</h4>
              <div className="space-y-2">
                {lifecycleStatuses.map((s) => (
                  <div key={s} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`status-panel-${s}`} 
                      checked={selectedStatuses.includes(s)}
                      onCheckedChange={(checked) => handleMultiSelectChange(setSelectedStatuses, s, !!checked)}
                    />
                    <Label htmlFor={`status-panel-${s}`} className="font-normal text-xs sm:text-sm">
                      {localizedLifecycleStatuses[s as keyof typeof localizedLifecycleStatuses] || s}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {/* Footer with Apply and Reset might be redundant due to header, but keeping structure if needed later */}
      {/* 
      <SheetFooter className="px-4 py-3 border-t">
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>重置</Button>
            <SheetClose asChild>
                <Button onClick={handleApply}>应用筛选</Button>
            </SheetClose>
        </div>
      </SheetFooter> 
      */}
    </>
  );
}


// Helper sub-components for FilterPanel
interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, id, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="space-y-1">
      <Label htmlFor={inputId} className="text-sm">{label}</Label>
      <Input id={inputId} {...props} className="text-sm" />
    </div>
  );
};

interface SwitchWithLabelProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}
const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({ label, checked, onCheckedChange, id }) => {
  const switchId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex items-center justify-between space-x-2 py-1.5">
      <Label htmlFor={switchId} className="text-sm font-normal">{label}</Label>
      <Switch id={switchId} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

interface FilterMultiSelectGroupProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onChange: (item: string, checked: boolean) => void;
}
const FilterMultiSelectGroup: React.FC<FilterMultiSelectGroupProps> = ({ title, items, selectedItems, onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 3);

  return (
    <div>
      <h4 className="font-semibold mb-1 text-sm">{title}</h4>
      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1"> {/* Added max-height and scroll */}
        {displayItems.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${title.replace(/\s+/g, '-')}-${item}`}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) => onChange(item, !!checked)}
            />
            <Label htmlFor={`${title.replace(/\s+/g, '-')}-${item}`} className="font-normal text-xs sm:text-sm">
              {item}
            </Label>
          </div>
        ))}
      </div>
      {items.length > 3 && (
        <Button variant="link" size="sm" onClick={() => setShowAll(!showAll)} className="p-0 h-auto text-accent text-xs">
          {showAll ? "收起" : `查看全部 (${items.length})`} {showAll ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
        </Button>
      )}
    </div>
  );
};
