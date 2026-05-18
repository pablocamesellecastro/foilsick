"use client"


import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"
import moment from "moment"
import { CustomCalendar } from "./CustomCalendar"
import { useState } from "react"
import { Label } from "./label"

interface Props {
  date:Date | undefined;
  setDate: (v?)=>void;
  placeholder?:string
  disabled?:boolean,
  name?:string
}

export function DatePickerComponent({date,setDate, placeholder='Pick a date',disabled,name}:Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleDayClick = (e) => {
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date && moment(date) ? moment(date).format("DD/MM/YYYY") : <span className="max-w-40 text-ellipsis overflow-hidden text-nowrap">{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[999999]">
        <CustomCalendar
        // @ts-ignore
          handleDayClick={handleDayClick}
          mode="single"
          selected={date}
          onSelect={setDate}
          fromYear={moment().year()-20}
          toYear={moment().year()+10}
          captionLayout="dropdown-buttons"
          initialFocus
          defaultMonth={date || new Date()}
          className="rounded-md border"
          disabled={disabled}

        />
        <PopoverArrow className="fill-background drop-shadow -mt-[2px] -mb-[2px]" />
      </PopoverContent>
    </Popover>
  )
}
