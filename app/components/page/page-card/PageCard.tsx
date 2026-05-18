"use client";
import { Card, CardContent } from "@/app/components/ui/card";
import PageHeader, { PageHeaderWithTitles } from "./PageHeader";
import React from "react";

type PageCardProps = {
  children: React.ReactNode;
  title?: React.ReactNode; // permite ReactNode por si metes <span/>
  description?: React.ReactNode;
  topRightCorner?: React.ReactNode;
  id?: string;
  className?: string;
};

export default function PageCard({
  children,
  topRightCorner,
  title,
  description,
  id,
  className,
}: PageCardProps) {
  return (
    <Card id={id} className="@container/card">
      {title || description ? (
        <PageHeaderWithTitles
          title={title as any}
          description={description as any}
          topRightCorner={topRightCorner}
        />
      ) : (
        <PageHeader topRightCorner={topRightCorner} />
      )}
      <CardContent className="px-2">{children}</CardContent>
    </Card>
  );
}
