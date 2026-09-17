import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://image-gallery-zeta-amber.vercel.app"),
  title: {
    default: "Image Gallery — Curated Visual Inspiration",
    template: "%s | Image Gallery",
  },
  description:
    "Explore, search, filter, and download high-resolution photography and vector artwork. Fast, responsive, and beautifully modern.",
  keywords: [
    "image gallery",
    "photos",
    "vectors",
    "photography",
    "creative visuals",
    "next.js",
    "tailwind css",
    "react",
  ],
  authors: [{ name: "Khalid Sifullah Siam" }],
  creator: "Khalid Sifullah Siam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://image-gallery-zeta-amber.vercel.app",
    siteName: "Image Gallery",
    title: "Image Gallery — Curated Visual Inspiration",
    description:
      "Explore, search, filter, and download high-resolution photography and vector artwork.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Gallery — Curated Visual Inspiration",
    description:
      "Explore, search, filter, and download high-resolution photography and vector artwork.",
    creator: "@khalidsifullah",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
