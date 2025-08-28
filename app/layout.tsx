import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuotaVera",
  description: "Pass digitali con concorsi a premi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
