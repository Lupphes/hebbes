'use client';
import { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import AboutExplain from '@/components/AboutExplain';

const AboutPage = () => {
  /*
  useLayoutEffect(() => {
    const isAuth = localStorage.getItem('access_token');
    if (!isAuth) {
      redirect('/login');
    }
  }, []);
  */
  return (
    <AboutExplain />
  );
};

export default AboutPage;
