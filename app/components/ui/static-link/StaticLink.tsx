import { Button } from '../button';
import Link from 'next/link';

export default function StaticLink({href, children}) {
  return (
    <Button variant="ghost" className="h-8 w-full justify-start">
      <Link className="cursor-pointer h-8 w-full flex space-x-4 items-center" href={href}>{children}</Link>
    </Button>
  );
}