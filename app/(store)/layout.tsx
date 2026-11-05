import Header from "@/components/Header";
import Link from "next/link";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <footer>
        <Link href="/privacy" className="pl-2 pb-1 hover:underline">
          Privacy
        </Link>
      </footer>
    </>
  );
}
