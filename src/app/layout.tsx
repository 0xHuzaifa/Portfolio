import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatLauncher } from "@/components/assistant/ChatLauncher";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Only used for the handwritten marginalia in the Trust section.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: {
    default: "Huzaifa Ahmed — Full-Stack Developer",
    template: "%s | Huzaifa Ahmed",
  },
  description:
    "Full-stack developer specialising in SaaS platforms, CRMs, and internal tools. Building business software that teams actually use — React, Next.js, Node.js, MongoDB, AWS.",
  metadataBase: new URL("https://0xhuzaifa.com"),
  keywords: [
    "full-stack developer",
    "SaaS developer",
    "CRM development",
    "React developer",
    "Node.js developer",
    "Next.js developer",
    "internal tools developer",
    "business software",
    "web application development",
  ],
  authors: [{ name: "Huzaifa Ahmed", url: "https://0xhuzaifa.com" }],
  creator: "Huzaifa Ahmed",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Huzaifa Ahmed — Full-Stack Developer",
    description:
      "Full-stack developer specialising in SaaS platforms, CRMs, and internal tools. Building business software that teams actually use.",
    type: "website",
    url: "https://0xhuzaifa.com",
    siteName: "Huzaifa Ahmed",
    images: [
      {
        url: "/full-logo-with-bg.png",
        width: 1200,
        height: 630,
        alt: "Huzaifa Ahmed — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Huzaifa Ahmed — Full-Stack Developer",
    description:
      "Full-stack developer specialising in SaaS platforms, CRMs, and internal tools.",
    images: ["/full-logo-with-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Huzaifa Ahmed",
  url: "https://0xhuzaifa.com",
  image: "https://0xhuzaifa.com/huzaifa.jpg",
  jobTitle: "Full-Stack Developer",
  description:
    "Full-stack developer specialising in SaaS platforms, CRMs, and internal tools. Building business software that teams actually use.",
  email: "huzaifa.rb00@gmail.com",
  sameAs: ["https://linkedin.com/in/0xhuzaifa", "https://github.com/0xhuzaifa"],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "SaaS development",
    "CRM systems",
    "Full-stack development",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Solvevare",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <TooltipProvider delayDuration={150}>
          <SiteHeader />
          <main className="min-h-dvh">{children}</main>
          <SiteFooter />
          <ChatLauncher />
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  );
}
