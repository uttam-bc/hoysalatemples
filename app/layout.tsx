import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_Kannada, Source_Sans_3 } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Hoysala Temples",
  description: "A stone-and-lamplight showcase of Hoysala temples in Karnataka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${kannada.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
