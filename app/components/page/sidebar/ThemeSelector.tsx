import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { SidebarMenuButton } from "../../ui/sidebar";
import { useEffect, useState } from "react";

export default function ThemeSelector({ isMobile }: { isMobile: boolean }) {
  const [isClient, setIsClient] = useState(false);
  const { setTheme, theme } = useTheme();
  const t = useTranslations('ThemeSelector');

  useEffect(() => {
    setIsClient(true);
  }, []);
  


  return isClient && theme && (
  <DropdownMenu>
      <DropdownMenuTrigger asChild >
    <SidebarMenuButton className="aria-expanded:bg-secondary aria-expanded:cursor-pointer hover:bg-secondary">
          <SunIcon className="me-1 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="me-1 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          <span>{t(theme || 'system')}</span>
    </SidebarMenuButton>
      </DropdownMenuTrigger>
    <DropdownMenuContent className='rounded-lg ml-1' side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
      <DropdownMenuItem onClick={() => setTheme("light")} className={cn("cursor-pointer",(theme==="light" && "font-bold"))}>
        <SunIcon className="w-5 h-5" />
        <span className={cn("font-normal",(theme==="light" && "font-bold"))}>{t('light')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")} className={cn("cursor-pointer",(theme==="dark" && "font-bold"))}>
        <MoonIcon className="w-5 h-5" />
        <span className={cn("font-normal",(theme==="dark" && "font-bold"))}>{t('dark')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")} className={cn("cursor-pointer",(theme==="system" && "font-bold"))}>
        <SunMoonIcon className="w-5 h-5" />
        <span className={cn("font-normal",(theme==="system" && "font-bold"))}>{t('system')}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  );
};