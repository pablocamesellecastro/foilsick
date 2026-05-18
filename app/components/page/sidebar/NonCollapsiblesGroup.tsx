import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { useTranslations } from "next-intl";

export function NonCollapsiblesGroup({
  projects,
  title,
}: {
  projects: {
    key: string;
    url: string;
    icon: LucideIcon;
  }[];
  title: string;
}) {
  const t = useTranslations("AppSidebar");

  return (
    <SidebarGroup className="z-[99999]">
      <SidebarGroupLabel className="text-sm text-hospitaldarkblue font-semibold mb-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:mb-0">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton
              asChild
              tooltip={t(item.key)}
              className="transition-all hover:bg-secondary min-h-12 h-auto group-has-[[data-collapsible=icon]]/sidebar-wrapper:min-h-10 duration-300"
            >
              <a href={item.url}>
                {item.icon && (
                  <item.icon className="transition-all duration-300 me-1 group-has-[[data-collapsible=icon]]/sidebar-wrapper:size-5 group-has-[[data-collapsible=icon]]/sidebar-wrapper:-ml-0.5" />
                )}
                <span className="text-ellipsis">{t(item.key)}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
