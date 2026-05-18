import { cloneElement } from "react";
import { Button } from "../button";
import { Label } from "../label";
import { MenubarArrow, MenubarContent, MenubarTrigger } from "../menubar";

export default function MenuElement({
  title,
  children,
  icon,
}: {title: string, children: React.ReactNode, icon: React.ReactElement}) {
  return (<>
    <MenubarTrigger asChild>
      <Button variant="ghost" className='max-lg:px-2 cursor-pointer'>
        {title && (<Label className="cursor-pointer max-lg:hidden">{title}</Label>)}
        {icon && cloneElement(icon, { className: 'lg:hidden' })}
      </Button>
    </MenubarTrigger>

    {children && (
      <MenubarContent sideOffset={-1} side="bottom" align="start" className='fill-white dark:fill-secondary z-[99999]'>
        {children}
        <MenubarArrow className="fill-white dark:fill-background arrow-style stroke-white dark:stroke-background stroke-[3px]" />
      </MenubarContent>
    )}
  </>);
}