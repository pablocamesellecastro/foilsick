"use client";
import { Button } from '@/app/components/ui/button'
import Link from 'next/link';
import React from 'react';
import TooltipEasy from '../../ui/tooltipEasy';
import { cn } from '@/lib/utils';

export function TableActionButton({icon, tooltip, ...props}) {
  return (
    <TooltipEasy side="top" align="center" content={tooltip} >
    <Button 
    size="icon"
    variant="ghost"
    {...props}
    >
      {icon && React.cloneElement(icon, {className: 'h-4 w-4 font-normal flex space-x-2 items-center'})}
  </Button>
  </TooltipEasy>
  )
}

export function TableActionPopoverLink({href, children, className}: {href: string, children: React.ReactNode, className?: string}) {
  return (
    // <TooltipEasy side="top" align="center" content={tooltip} >
    <Link className={cn("flex py-1.5 px-2 space-x-2 font-normal text-sm items-center text-blue-700 dark:text-blue-400", className)} href={href}>
      {children}
    </Link>
  // </TooltipEasy>
  )
}