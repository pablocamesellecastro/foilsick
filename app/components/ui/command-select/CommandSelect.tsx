// components/CommandSelect.tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useController } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../form";
import { useTranslations } from "next-intl";

interface Option {
  label: string;
  value: any;
}

interface CommandSelectProps {
  name: string;
  control: any; // from useForm
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  searchPlaceholder?: string;
}

export const CommandSelect = ({
  name,
  control,
  options,
  placeholder,
  className,
  label,
  required = false,
  searchPlaceholder
}: CommandSelectProps) => {
  const { field, fieldState } = useController({ name, control });
  const [open, setOpen] = useState(false);
  const t = useTranslations("Select.command-select");

  const selectedOption = options.find((opt) => opt.value === field.value);

  return (
    <FormField name={name} control={control} render={({ field }) => (        <FormItem className={cn("flex flex-col space-y-2", className)}>

        <FormLabel>{label}</FormLabel>

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full flex justify-between items-center border border-input bg-background rounded-md px-3 py-2 text-sm text-left",
            className
          )}
        >
          {selectedOption ? selectedOption.label : <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || t("search")} />
          <CommandEmpty>{t("no-results")}</CommandEmpty>
          <CommandGroup>
            {(required ? options : [...options, ...[{value: undefined, label: "Ninguno"}]]).map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  field.onChange(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      </Popover>
        <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>)}
    />
  );
}