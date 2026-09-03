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
  metadataBase: new URL("https://madisson-ai-studio.vercel.app"),
  title: {
    default: `${site.name} — Prompt & Asset Vault`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: site.profileImage,
    apple: site.profileImage,
  },
  openGraph: {
    title: `${site.name} — Prompt & Asset Vault`,
    description: site.description,
    url: "https://madisson-ai-studio.vercel.app",
    siteName: site.name,
    images: [{ url: "/og-image.jpg", width: 1080, height: 1920 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Prompt & Asset Vault`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
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
