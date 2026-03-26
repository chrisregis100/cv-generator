import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CV Generator",
  description:
    "un site web pour générer un CV en toute simplicité et rapidement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="night">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        style={{ fontFamily: "var(--font-space), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
