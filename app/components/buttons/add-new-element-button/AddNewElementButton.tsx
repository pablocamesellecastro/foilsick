import { Button } from '@/app/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function AddNewElementButton({title}) {
  return (
    <Button 
    size="default"
    variant="ghost"
    className="font-normal flex space-x-2 items-center text-blue-700 dark:text-blue-400">
      <span className="">{title}</span>
      <PlusIcon className=' h-4 w-4' />
    </Button>
  )
}