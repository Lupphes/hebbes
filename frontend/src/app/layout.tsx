import Providers from './provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Explain from '@/components/Explain';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Price Bandit',
  description: 'Find the best price for your groceries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang='en'>
      <body className={inter.className}>
      <div className="font-poppins">
        <Header
          title="Price Bandit"
        />
        <div className="flex flex-col items-center">
          <Providers>{children}</Providers>
        </div>
        <section className="flex flex-col items-center justify-start">
          <Explain />
          <Footer />
        </section>
      </div>
      </body>
    </html>
  );
}
