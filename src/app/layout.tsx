
'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [history, setHistory] = useState<string[]>([]);

  const handleNewPrompt = (prompt: string) => {
    setHistory(prevHistory => 
      [prompt, ...prevHistory.filter(p => p.toLowerCase() !== prompt.toLowerCase())].slice(0, 15)
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleHistoryClick = (prompt: string) => {
    // This is a placeholder for future functionality.
    // For now, we can just log it to the console.
    console.log(`Selected history item: ${prompt}`);
  };

  // A simple way to pass props to children if they are the intended component
  const childrenWithProps = React.Children.map(children, child => {
    // Checking if it's a valid React element is important
    if (React.isValidElement(child)) {
      // Here you can check the type of the child and add props
      // For this case, we'll assume the child is the page component that needs the prop.
      // A more robust solution might use React.Context if prop drilling becomes an issue.
      // @ts-ignore
      return React.cloneElement(child, { onNewPrompt: handleNewPrompt });
    }
    return child;
  });

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
          <Header 
            history={history} 
            onClearHistory={handleClearHistory} 
            onHistoryClick={handleHistoryClick} 
          />
          <main className="flex-grow">
            {childrenWithProps}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
