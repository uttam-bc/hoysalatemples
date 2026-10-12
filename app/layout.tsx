import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Serif_Kannada, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/locale-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const kannada = Noto_Serif_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0c12",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hoysalatemples.online"),
  title: {
    default: "Hoysala Temples | hoysalatemples.online",
    template: "%s | Hoysala Temples",
  },
  description:
    "An authentic stone-and-lamplight digital sanctuary showcasing 13 medieval Hoysala temples across Karnataka. Stellate plans, soapstone carvings, and connected pilgrimage circuits.",
  keywords: [
    "Hoysala temples",
    "Belur Chennakeshava",
    "Halebidu Hoysaleswara",
    "Somanathapura",
    "Karnataka heritage",
    "Hoysala architecture",
    "UNESCO World Heritage India",
    "Soapstone temples",
    "Stellate plan temples",
    "Doddagaddavalli",
    "Amruthapura",
    "ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳು",
  ],
  authors: [{ name: "UTTAM B C", url: "https://hoysalatemples.online" }],
  creator: "UTTAM B C",
  publisher: "hoysalatemples.online",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hoysalatemples.online",
    siteName: "Hoysala Temples",
    title: "Hoysala Temples | hoysalatemples.online",
    description:
      "Explore 13 masterworks of Hoysala architecture across Karnataka with interactive cartography, stellate architectural blueprints, dynastic timeline, and pilgrimage routing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoysala Temples | hoysalatemples.online",
    description:
      "Explore 13 masterworks of Hoysala architecture across Karnataka with interactive cartography and stellate blueprints.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${kannada.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0b0c12] text-[#ede7de] flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <LocaleProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
