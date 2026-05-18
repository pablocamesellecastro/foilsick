import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from 'lucide-react'

export function RenderSortIcon({ getIsSorted }) {
  switch(getIsSorted){
    case "asc":
      return <ArrowUpIcon className="ml-2 h-4 w-4" />
    case "desc":
      return <ArrowDownIcon className="ml-2 h-4 w-4" />
    default:
      return <ArrowUpDown className="ml-2 h-4 w-4" />  
  }
}