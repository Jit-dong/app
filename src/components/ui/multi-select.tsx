"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MultiSelectProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "选择选项...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  const handleRemove = (option: string) => {
    onChange(value.filter(item => item !== option))
  }

  const handleClear = () => {
    onChange([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            !value.length && "text-muted-foreground",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {value.length === 0 ? (
              <span>{placeholder}</span>
            ) : value.length === 1 ? (
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                {value[0]}
              </span>
            ) : (
              <>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                  {value[0]}
                </span>
                <span className="text-muted-foreground text-xs">
                  +{value.length - 1} 更多
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {value.length > 0 && (
              <X
                className="h-4 w-4 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              />
            )}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground",
                value.includes(option) && "bg-accent"
              )}
              onClick={() => handleSelect(option)}
            >
              <div className="flex h-4 w-4 items-center justify-center">
                {value.includes(option) && <Check className="h-4 w-4" />}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          ))}
        </div>
        {value.length > 0 && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="w-full"
            >
              清除所有选择
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
