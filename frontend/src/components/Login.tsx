// Import statements
'use client';
import { loginUser } from '@/redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  // State variables with explicit types
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    const user = { email, password };
    try {
      await dispatch(loginUser(user))
        .unwrap()
        .then(() => router.push('/main'));
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unknown error occurred');
      }
      setShowModal(true);
    }
  };

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
          {errorMsg && showModal ? (
            <div
              id='info-popup'
              tabIndex={-1}
              className={
                `h-modal left-0  right-0 top-0 z-50 w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full` +
                `${!showModal ? ' hidden' : ''}`
              }
            >
              <div className='relative h-full w-full max-w-lg p-4 md:h-auto'>
                <div className='relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 md:p-8'>
                  <div className='mb-4 text-sm font-light text-gray-500 dark:text-gray-400'>
                    <h3 className='mb-3 text-2xl font-bold text-gray-900 dark:text-white'>
                      Error logging in
                    </h3>
                    <p>The provided email or username is incorrect</p>
                  </div>
                  <div className='items-center justify-between space-y-4 pt-0 sm:flex sm:space-y-0'>
                    <div className='items-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0'>
                      <button
                        id='close-modal'
                        onClick={() => setShowModal(false)}
                        type='button'
                        className='focus:ring-primary-300 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:w-auto'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
            <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
                Sign in to your account
              </h1>
              <form className='space-y-4 md:space-y-6' action='#' method='post'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                    placeholder='name@company.com'
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='••••••••'
                    className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <a
                    href='#'
                    className='text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline'
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={handleLogin}
                  className='mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Sign in
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <a
                    href='/register'
                    className='text-primary-600 dark:text-primary-500 font-medium hover:underline'
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
