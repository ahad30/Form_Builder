"use client";
import LoadingPage from "@/components/LoadingPage";
import "./globals.css";
import { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css";




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
      <body suppressHydrationWarning={true} className="bg-white  text-black">
        {
                  isLoading ? ( 
                        <div>
                          <LoadingPage/>
                        </div>
                  ): (

          <div>

            {children}
          </div>



                  )}
      </body>
    </html>
  );
}
