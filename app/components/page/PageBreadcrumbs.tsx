"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function PageBreadcrumbs() {
  const path = usePathname();
  const t = useTranslations("Breadcrumbs");

  const normalizedPath = path.replace(/\b\d+\b/g, "x");

  let dynamicPath = normalizedPath;

  if (
    normalizedPath.startsWith("/roles/") &&
    !normalizedPath.includes("x") &&
    normalizedPath !== "/roles/create"
  ) {
    dynamicPath = "/roles/[id]";
  }

  if (
    normalizedPath.startsWith("/permissions/") &&
    !normalizedPath.includes("create") &&
    normalizedPath !== "/permissions/create"
  ) {
    dynamicPath = "/permissions/[id]";
  }

  if (
    normalizedPath.startsWith("/users/") &&
    !normalizedPath.includes("create") &&
    normalizedPath !== "/users/create"
  ) {
    dynamicPath = "/users/[id]";
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink href={`/`}>
            {"Principal"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" /> */}

        <BreadcrumbItem>
          <BreadcrumbPage>
            {t(dynamicPath, { id: path.split("/").pop() })}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
