import { Header } from '@/components/layouts/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Riveroco - 2.0',
  description: 'Plan, Check and done!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <div className="flex h-screen">
          <main className="w-full  bg-gray-100/20 overflow-x-auto">
            <Header />

            <ScrollArea>{children}</ScrollArea>
          </main>
        </div>
      </body>
    </html>
  );
}
