import Providers from './provider';
import './globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Explain from '@/components/Explain';

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
      <body className=''>
        <div className='font-poppins'>
          <Header title='Price Bandit' />
          <Providers>{children}</Providers>
          <section className='flex flex-col items-center justify-start'>
            <Explain />
            <Footer />
          </section>
        </div>
      </body>
    </html>
  );
}
