import { Loader2Icon } from "lucide-react";
import { Label } from "../label";

export default function LoadingItem({ name }) {
  return (
    <div className="opacity-50 py-2 px-4 max-lg:px-3 space-x-2 flex items-center">
      <Loader2Icon className="animate-spin" />
      <Label className="max-lg:hidden">{name}</Label>
    </div>
  );
}