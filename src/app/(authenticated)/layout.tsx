import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xbri App",
  description: "Desafio técnico xbri",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <Topbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}