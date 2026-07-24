"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className=" hover:text-gray-500 transition text-2xl leading-none"
    >
      ←
    </button>
  );
}
