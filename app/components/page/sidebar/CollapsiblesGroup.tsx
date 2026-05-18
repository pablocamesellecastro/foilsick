"use client";
import {
  ChevronDown,
  Cuboid,
  FolderIcon,
  Dot,
  DropletIcon,
  LeafIcon,
  ThermometerSun,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/components/ui/sidebar";
import { useTranslations } from "next-intl";
import TooltipEasy from "@/app/components/ui/tooltipEasy";

class Item {
  url: string;
  key: string;
  isActive: boolean;
  icon: any;
}

const items: Item[] = [
  {
    url: "/products",
    key: "products",
    icon: FolderIcon,
    isActive: false,
  },
];

export function CollapsiblesGroup() {
  const t = useTranslations("AppSidebar");

  return (
    <SidebarGroup className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:-mt-5">
      <SidebarGroupLabel className="text-sm text-hospitaldarkblue font-semibold mb-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:mb-0">
        {t("levels")}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items!.map((item: Item) => (
          <Collapsible
            key={item.key}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={t(item.key)}
                  className="transition-all hover:bg-secondary h-auto min-h-12 py-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:min-h-10 duration-300"
                >
                  {item.icon && (
                    <>
                      <item.icon className="me-1 group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden" />
                      <a
                        className="hidden group-has-[[data-collapsible=icon]]/sidebar-wrapper:block"
                        href={item.url}
                      >
                        <item.icon className="me-1 size-5 -ml-0.5" />
                      </a>
                    </>
                  )}
                  {/* <TooltipEasy forceDelay content={t(item.url)}> */}

                  <span className="flex-wrap group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
                    {t(item.key)}
                  </span>
                  {/* </TooltipEasy> */}
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
