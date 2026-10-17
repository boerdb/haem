import Image from "next/image";
import { cn } from "@/lib/utils";

/** Beeldmerk van Haemo (rode bloedcel met O₂), zelfde ontwerp als het app-icoon. */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0", className)}
      aria-hidden
    />
  );
}
