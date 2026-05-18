"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(decodeURIComponent(id));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHash();

    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);
}
