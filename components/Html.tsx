import React from "react";

type HtmlProps = {
  children: React.ReactNode;
};

export default function Html({ children }: HtmlProps) {
  return (
    <main>
      {children}
    </main>
  );
}
