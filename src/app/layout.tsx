
'use client';

import React from 'react';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { HistoryProvider } from '@/context/history-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        <title>PixelForge</title>
        <meta name="description" content="Generate amazing images with AI" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen transition-colors duration-300 animated-gradient-bg">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <HistoryProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster />
          </HistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
