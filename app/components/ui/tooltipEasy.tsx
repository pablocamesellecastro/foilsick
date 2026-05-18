/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '@/app/components/ui/tooltip'
// [data-state]	"closed" | "delayed-open" | "instant-open"
// [data-side]	"left" | "right" | "bottom" | "top"
// [data-align]	"start" | "end" | "center"
export default function TooltipEasy({children, content, side, align, secondaryBackground, forceDelay, sideOffset, alignOffset, ...props}: any) {
  return (
    <Tooltip {...props} skipDelayDuration={forceDelay ? 0 : 300}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className={cn('z-[99999] max-w-96', !secondaryBackground ? 'bg-background':'bg-secondary')} side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
        <TooltipArrow className={
          cn('arrow-style stroke-slate-200 dark:stroke-slate-800 stroke-[3px]',
            !secondaryBackground ? 'fill-background':'fill-secondary'
          )} 
        />
        <p className='font-normal text-sm'>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
};