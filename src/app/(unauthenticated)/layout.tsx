import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login - xbri",
  description: "Pagina de autenticação",
};

interface UnauthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-center justify-center h-screen bg-gray-100`}>
        {children}
      </body>
    </html>
  );
}