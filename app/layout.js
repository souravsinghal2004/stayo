import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

const inter = Inter({subsets:['latin']});

export const metadata = {
  title: "Stayo",
  description: "Find Your Dream Stays For Vacations",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
    <html lang="en">
      
      <body
        className={`${inter.className} `}       >

   <Header/>
        <main className="min-h-screen">{children}</main>
        <Toaster  richColors/>
    <Footer/>
        
      </body>
    </html>
    </ClerkProvider>
  );
}