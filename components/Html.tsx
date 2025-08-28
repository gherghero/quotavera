import React from "react";

type HtmlProps = { html: string };

/**
 * Wrapper che inietta HTML “puro” (dallo Stitch export) dentro Next/Tailwind.
 * NB: il markup passato deve essere SOLO il contenuto del <body>, senza <html>/<head>.
 */
export default function Html({ html }: HtmlProps) {
  return (
    <main
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
