"use client";
import AppSidebar from "@/app/components/page/sidebar/AppSidebar";
import { Separator } from "@/app/components/ui/separator";
import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar";
import NotificationsModule from "../NotificationsModule";
import PageBreadcrumbs from "../PageBreadcrumbs";

export default function PageLayout({ children }: { children: any }) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden">
        <header />
        <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      </div>
    </SidebarProvider>
  );
}
