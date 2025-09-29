import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UnitX Converter",
  description: "A modern unit converter with history tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
