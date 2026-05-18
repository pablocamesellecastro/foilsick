"use client"

import * as React from 'react'
import { Check, X, ChevronsUpDown, PlusIcon, ChevronDown } from "lucide-react"
import { Button } from "../button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../popover"

import { cn } from '@/lib/utils'
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react'
import { Label } from '../label'
import TooltipEasy from '../tooltipEasy'
import { TooltipProvider } from '../tooltip'
import { useTranslations } from 'next-intl'

export type OptionType = {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: OptionType[];
    selected: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
    addOption?: boolean;
    onAddOption?: (option) => void;
}

function MultiSelect({ options, selected, onChange, className, ...props }: MultiSelectProps) {
  const [optionToAdd, setOptionToAdd] = useState("")
  const [open, setOpen] = useState(false)
  const t = useTranslations("Select.multi-select");

    const addOptionToSelect = () => {
      if(props.addOption && props.onAddOption){
         props.onAddOption(optionToAdd)
         setOpen(false)
      }
    }

    const handleUnselect = (item: string) => {
        onChange(selected?.filter((i) => i !== item))
    }

    return (
        <TooltipProvider>
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full hover:bg-background justify-between h-auto py-0.5 min-h-10 overflow-hidden text-ellipsis`}
                    onClick={() => setOpen(!open)}
                >
                    <div className="w-full flex gap-1 flex-wrap">
                        {selected?.map((item) => (
                            <Badge
                                variant="secondary"
                                key={item}
                                className="px-1.5 py-0.5 text-xs flex space-x-1 cursor-default hover:bg-secondary pointer-events-auto w-fit max-w-full rounded-sm"
                                onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUnselect(item)
                                }}
                            >
                                <TooltipEasy content="Eliminar" position="top">
                                <span className='shrink text-ellipsis overflow-hidden'>{options.find((option) => option.value === item)?.label}</span>
                                </TooltipEasy>
                                <X 
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={(e) =>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleUnselect(item)
                                    }}
                                    className="cursor-pointer h-3 w-3 text-muted-foreground hover:text-primary shrink-0" 
                                />
                            </Badge>
                        ))}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-[99992]">
                <Command className={cn(className, "block w-full")}>
                    <CommandInput className="w-full border-b-red-400" placeholder={t("search")} onValueChange={setOptionToAdd} />
                    <CommandEmpty className='w-full items-center flex flex-col space-y-2 pt-2'>
                        <Label className='font-normal italic'>{t("no-results")}</Label>
                        {props.addOption && 
                            <Badge variant="secondary" className='cursor-pointer p-2 flex space-x-1' onClick={addOptionToSelect}>
                                <span>{t("add")}</span>
                                <PlusIcon className="h-4 w-4" />
                            </Badge>
                        }
                    </CommandEmpty>
                    <CommandList className='max-h-64 overflow-auto py-2 px-1 w-full'>
                        {options?.map((option: any) => (
                            <CommandItem
                                className='cursor-pointer'
                                key={option.value}
                                onSelect={() => {
                                    onChange(
                                        selected?.includes(option.value)
                                            ? selected?.filter((item) => item !== option.value)
                                            : [...selected, option.value]
                                    )
                                    setOpen(true)
                                }}
                            >
                                <Check className={cn("mr-2 h-4 w-4", selected?.includes(option.value) ? "opacity-100" : "opacity-0" )} />
                                <Label className="font-normal py-0.5 cursor-pointer">{option.label}</Label>
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        </TooltipProvider>
    )
}

export { MultiSelect }