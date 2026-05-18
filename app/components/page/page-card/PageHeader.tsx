"use client";
// import { useTranslations } from 'next-intl';
// import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function PageHeader({
  topRightCorner,
}: {
  topRightCorner: any;
}) {
  const normalizedPath = usePathname();

  const t = useTranslations("CardTitles");

  // const normalizedPath = path.replace(/\b\d+\b/g, 'x');  // Reemplazar números enteros en la ruta con "x"

  return (
    <CardHeader
      className={cn(
        "relative",
        !t(`descriptions.${normalizedPath}`) && "pb-12 mb-0.5"
      )}
    >
      <CardTitle className="text-hospitaldarkblue">
        {t(`titles.${normalizedPath}`)}
      </CardTitle>
      <CardDescription>
        <span className="@[540px]/card:block hidden text-hospitalmiddleblue">
          {t(`descriptions.${normalizedPath}`)}
        </span>
        <span className="@[540px]/card:hidden text-hospitalmiddleblue">
          {t(`descriptions.${normalizedPath}`)}
        </span>
      </CardDescription>
      {topRightCorner && (
        <div className="absolute right-4 top-4">{topRightCorner}</div>
      )}
    </CardHeader>
  );
}

export function PageHeaderWithTitles({
  title,
  description,
  topRightCorner,
}: {
  title: string;
  description?: string;
  topRightCorner: any;
}) {
  return (
    <CardHeader className={cn("relative", !description && "pb-12 mb-0.5")}>
      <CardTitle className="text-hospitaldarkblue">{title}</CardTitle>
      <CardDescription>
        <span className="@[540px]/card:block hidden text-hospitalmiddleblue">
          {description}
        </span>
        <span className="@[540px]/card:hidden text-hospitalmiddleblue">
          {description}
        </span>
      </CardDescription>
      {topRightCorner && (
        <div className="absolute right-4 top-4">{topRightCorner}</div>
      )}
    </CardHeader>
  );
}
