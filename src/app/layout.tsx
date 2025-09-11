import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Huzaifa Ahmed | Full Stack Developer',
  description: 'Full Stack Developer specializing in modern web technologies. Creating exceptional digital experiences with React, Node.js, and cutting-edge tools.',
  keywords: 'Full Stack Developer, React Developer, Node.js, JavaScript, TypeScript, Web Development, Portfolio',
  authors: [{ name: 'Huzaifa Ahmed' }],
  creator: 'Huzaifa Ahmed',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://0xhuzaifa.dev',
    title: 'Huzaifa Ahmed | Full Stack Developer',
    description: 'Full Stack Developer creating exceptional digital experiences',
    siteName: 'Huzaifa Ahmed Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huzaifa Ahmed | Full Stack Developer',
    description: 'Full Stack Developer creating exceptional digital experiences',
    creator: '@0xhuzaifa',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}