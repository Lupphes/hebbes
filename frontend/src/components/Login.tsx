// Import statements
'use client';
import { loginUser } from '@/redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';

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
        .then(() => router.push('/'));
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
      <section className='bg-gray-50'>
        <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0 md:h-screen'>
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
                <div className='relative rounded-lg bg-white p-4 shadow md:p-8'>
                  <div className='text-gray-500 mb-4 text-sm font-light '>
                    <h3 className='text-2xl text-gray-900 mb-3 font-bold '>
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
                        className='focus:ring-primary-300 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 w-full rounded-lg border bg-white px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 sm:w-auto'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className='xl:p-0 w-full rounded-lg bg-white shadow md:mt-0 sm:max-w-md'>
            <div className='space-y-4 p-6 md:space-y-6 sm:p-8'>
              <form className='space-y-4 md:space-y-6' action='#' method='post'>
                <section
                  className='flex flex-col
                        items-center justify-start self-stretch
                        bg-text-white-op-100
                        px-3 py-3 text-left font-poppins
                        text-base text-black'
                >
                  <div className='relative'>
                    <div
                      className='flex
                        flex-col gap-5
                        overflow-hidden'
                    >
                      <div
                        className='flex
                          text-center font-poppins text-17xl
                          font-semibold font-semibold text-black'
                      >
                        Log In
                      </div>
                      <TextField
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[transparent]] [border:none]'
                        color='success'
                        label='Email address'
                        variant='outlined'
                      />
                      <TextField
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[transparent] [border:none]'
                        color='success'
                        label='Password'
                        variant='outlined'
                      />
                      <div className='flex flex-row items-center gap-10 overflow-hidden'>
                        <Button
                          className='flex-1'
                          color='success'
                          variant='outlined'
                          onClick={handleLogin}
                        >
                          Log In
                        </Button>
                        <a className='relative flex-1 text-left text-[inherit] text-green-600 hover:underline'>
                          Forgot password?
                        </a>
                      </div>
                      <p className='relative flex-1 text-left font-light text-[inherit]'>
                        Don’t have an account yet?{' '}
                        <a
                          href='/register'
                          className='relative flex-1 text-right text-[inherit] text-green-600 hover:underline'
                        >
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
