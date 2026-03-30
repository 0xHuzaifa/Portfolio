import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EditorLayout } from "@/components/layout/EditorLayout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TabProvider } from "@/contexts/TabContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huzaifa Ahmed - Full-Stack Developer",
  description:
    "Full-Stack Developer helping startups and businesses build scalable SaaS platforms, admin dashboards, and production-ready web applications. React, Node.js, TypeScript, AWS.",
  openGraph: {
    title: "Huzaifa Ahmed - Full-Stack Developer",
    description:
      "Building scalable SaaS platforms and web applications for startups and businesses.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TabProvider>
            <TooltipProvider delayDuration={150}>
              <EditorLayout>{children}</EditorLayout>
            </TooltipProvider>
          </TabProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
