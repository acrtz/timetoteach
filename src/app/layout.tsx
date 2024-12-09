import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>
        <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-background">
          {children}
        </div>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
