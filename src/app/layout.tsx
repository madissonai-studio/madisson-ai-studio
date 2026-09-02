import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { CurrencyProvider } from "@/components/currency-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — Prompt & Asset Vault`,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <CurrencyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
