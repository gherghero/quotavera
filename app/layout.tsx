import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QuotaVera',
  description: 'Claim, collect & win premium assets.',
  themeColor: '#1f8f4d'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1f8f4d" />
        {/* iOS A2HS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QuotaVera" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
