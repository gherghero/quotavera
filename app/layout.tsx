import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuotaVera",
  description: "Pass digitali per beni di lusso con concorsi a premi: esperienza minimal e premium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-[#f8f9fc] text-[#0e121b]`}>
        {children}
      </body>
    </html>
  );
}
