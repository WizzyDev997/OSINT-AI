import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Energy Claims Analyzer — OSINT/IA",
  description: "Prototype OSINT/IA — Vérification et cartographie argumentaire sur les coûts énergétiques",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
