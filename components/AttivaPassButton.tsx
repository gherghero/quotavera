"use client";
import { useRouter } from "next/navigation";

export function AttivaPassButton({ slug, pkgKey }: { slug: string; pkgKey: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/checkout?pid=${encodeURIComponent(slug)}&pkg=${encodeURIComponent(pkgKey)}`)}
      className="flex w-full items-center justify-center rounded-xl h-12 px-5 bg-[#081c44] text-[#f8f9fc] text-base font-bold"
    >
      Attiva Pass
    </button>
  );
}
