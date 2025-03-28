import type { Metadata } from "next";
import "./globals.css";
import { josefinSans } from '@/app/ui/fonts';
import { ThemeProvider } from 'next-themes'
import Footer from "./components/footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "QwQ-TkitAI - YouTube Summarizer",
  description: "Instantly generate concise summaries for any YouTube video. Save time, capture key insights, and understand content quickly with our free AI-powered summarization tool.",
  keywords: [
    "YouTube summary",
    "video summarizer",
    "AI summary tool", 
    "content digest",
    "video insights",
    "quick video understanding",
    "free youtube tool"
  ],
  authors: [
    { name: "Redwanidk", url: "https://github.com/redwanidm" }
  ],
  openGraph: {
    title: "QwQ-TkitAI - YouTube Summarizer",
    description: "Instantly generate concise summaries for any YouTube video.",
    url: "https://yourwebsite.com/youtube-summarizer",
    siteName: "QwQ-TkitAI",
    images: [
      {
        url: "/opgraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "QwQ-TkitAI YouTube Summarizer - Get Video Insights Instantly"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large"
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true}>
      <body className={`${josefinSans.className} antialiased`}>
      <ThemeProvider defaultTheme="night">
      <SpeedInsights/>
      
        {children}
      </ThemeProvider>
      <Footer/>
      </body>
    </html>
  );
}
