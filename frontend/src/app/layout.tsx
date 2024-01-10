import Providers from './provider';
import './globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Explain from '@/components/Explain';
import { CircularProgress } from '@mui/material';

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
          <Providers>
            <Header title='Price Bandit' />
            <div className='flex flex-col items-center'>
              {children}
              <section className='flex flex-col items-center justify-start'>
                <Explain />
                <Footer />
              </section>
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
