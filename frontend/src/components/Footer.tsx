'use client';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <footer className='w-full bg-slate-800 text-base text-white'>
      <div className='mx-4 sm:mx-10'>
        {/* Responsive grid layout */}
        <div className='grid grid-cols-1 gap-8 py-8 md:grid-cols-3'>
          <div className='text-center md:text-left'>
            <p className='text-gray-600'>Nijmegen, the Netherlands</p>
          </div>
          <div>
            <p className='text-gray-700 mb-4 font-medium'>Links</p>
            <div className='flex flex-col gap-4'>
              <button
                onClick={() => navigate('/')}
                className='text-gray-600 rounded-lg font-medium'
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className='text-gray-600 rounded-lg font-medium'
              >
                About
              </button>
              <button
                onClick={() => navigate('/premium')}
                className='text-gray-600 rounded-lg font-medium'
              >
                Premium
              </button>
            </div>
          </div>
          <div>
            <p className='text-gray-700 mb-4 font-medium'>Help</p>
            <div className='flex flex-col gap-4'>
              <button
                onClick={() => navigate('/how-it-works')}
                className='text-gray-600 rounded-lg font-medium'
              >
                How it works?
              </button>
              <button
                onClick={() => navigate('/privacy-policy')}
                className='text-gray-600 rounded-lg font-medium'
              >
                Privacy Policies
              </button>
            </div>
          </div>
        </div>
        <div className='border-gray-300 border-t text-center'>
          <p className='text-gray-600 mb-4 mt-4'>
            © 2023 Price Bandit. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
