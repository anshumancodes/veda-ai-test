import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Veda AI — Assessment Review",
  description: "Upload question papers and answer sheets to automatically map and review student responses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
