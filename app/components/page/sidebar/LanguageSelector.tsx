import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@/lib/server/locale";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "../../ui/sidebar";
import Image from "next/image";

export default function LanguageSelector({ isMobile }) {
  const locale = useLocale();
  const t = useTranslations("LanguageSelector");

  return (
    <DropdownMenu>
      {/* Botón que muestra el idioma actual y abre el dropdown */}
      <SidebarMenuButton asChild className="hover:bg-secondary">
        <DropdownMenuTrigger className="aria-expanded:bg-secondary aria-expanded:cursor-pointer flex items-center gap-2">
          {/* Muestra la imagen del idioma seleccionado */}
          <Image
            src={`/images/flags/${locale}.png`}
            alt={t(locale.toLowerCase())}
            width={17}
            height={17}
          />
          <span>{t(locale.toLowerCase())}</span>
        </DropdownMenuTrigger>
      </SidebarMenuButton>

      {/* Dropdown con las opciones de lenguajes */}
      <DropdownMenuContent
        className="rounded-lg ml-1"
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
      >
        {/* Opción para el idioma español */}
        <DropdownMenuItem
          onClick={() => setUserLocale("es")}
          className={cn(
            "cursor-pointer flex items-center gap-2",
            locale === "es" && "font-bold"
          )}
        >
          <Image
            src="/images/flags/es.png"
            alt="Español"
            width={17}
            height={17}
          />
          <span>{t("es")}</span>
        </DropdownMenuItem>

        {/* Opción para el idioma inglés */}
        <DropdownMenuItem
          onClick={() => setUserLocale("en")}
          className={cn(
            "cursor-pointer flex items-center gap-2",
            locale === "en" && "font-bold"
          )}
        >
          <Image
            src="/images/flags/en.png"
            alt="Inglés"
            width={17}
            height={17}
          />
          <span>{t("en")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
