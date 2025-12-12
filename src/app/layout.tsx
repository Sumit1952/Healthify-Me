import type { Metadata } from 'next';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'Healthify Me',
  description: 'Life Doesn\'t Have To Be A Constant Balancing Act.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorant.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
