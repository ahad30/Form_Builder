"use client";
import LoadingPage from "@/components/LoadingPage";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);



  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {
                  isLoading ? ( 
                        <div>
                          <LoadingPage/>
                        </div>
                  ): (
        <QueryClientProvider client={queryClient}>


          {children}
        </QueryClientProvider>
                  )}
      </body>
    </html>
  );
}
