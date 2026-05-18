"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/app/components/ui/sidebar";
import Image from "next/image";
import SidebarBottom from "./SidebarBottom";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { CollapsiblesGroup } from "./CollapsiblesGroup";
import { NonCollapsiblesGroup } from "./NonCollapsiblesGroup";
import { InfoIcon } from "lucide-react";

export default function AppSidebar() {
  // Usamos useMemo para estabilizar la URL de la imagen
  // const shopIconUrl = useMemo(() => `/api/stores/${1}/icon`, [1]);
  const t = useTranslations("Sidebar.MainSection");

  return (
    <Sidebar collapsible="icon" className="bg-card">
      <SidebarHeader
        className="flex flex-row items-center gap-4 p-0 pb-3 mb-1 mt-0.5 
          group-has-[[data-collapsible=icon]]/sidebar-wrapper:p-0 
          border-b border-b-secondary transition-all ease-linear
          group-has-[[data-collapsible=icon]]/sidebar-wrapper:pb-2 
          group-has-[[data-collapsible=icon]]/sidebar-wrapper:pt-1
          "
      >
        <Link
          href="/"
          className="flex flex-row items-center p-4 pb-0 gap-4 w-full transition-colors cursor-pointer
            group-has-[[data-collapsible=icon]]/sidebar-wrapper:p-2"
        >
          <div className="flex flex-row aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Image
              width={400}
              height={448}
              src={`/images/Foilsick.png`}
              alt="Foilsick Logo"
              className="size-8 object-contain"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <h1 className="font-semibold truncate">Foilsick</h1>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NonCollapsiblesGroup
          title={t("general")}
          projects={[
            {
              key: "info",
              url: `/`,
              icon: InfoIcon,
            },
          ]}
        />
        <CollapsiblesGroup />
      </SidebarContent>

      <SidebarFooter>
        <SidebarBottom className="mt-auto mx-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}
