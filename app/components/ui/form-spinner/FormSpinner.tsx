import { Loader2Icon } from "lucide-react";
import { Label } from "@components/ui/label";

export default function FormSpinner({ label }) {
	return (
		<div className='flex flex-col space-y-4'>
			<Label>{label}</Label>
			<Loader2Icon className='animate-spin' />
		</div>
	);
}
