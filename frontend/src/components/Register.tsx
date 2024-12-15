'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { registerUser } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import {
  Button,
  TextField,
} from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleRegister = () => {
    // Handle registration logic here (e.g., API call to create a new user).
    const user = { email, password };
    dispatch(registerUser(user))
      .unwrap()
      .then(() => router.push('/login'));
  };

  return (
    <>
      <section className="self-stretch bg-text-white-op-100
                          flex flex-col items-center
                          justify-start
                          text-left text-base text-black font-poppins
                          py-3 px-3">
        <form action='#' method="post">
          <div className="relative">
            <div className="overflow-hidden
                            flex flex-col
                            gap-5">
              <div className="font-semibold
                              font-semibold font-poppins text-17xl
                              text-center text-black flex">
                Create an account
              </div>
              <TextField
                className="[border:none] bg-[transparent]]"
                color="success"
                label="Email address"
                variant="outlined"
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
              />
              <TextField
                className="[border:none] bg-[transparent]"
                color="success"
                label="Password"
                variant="outlined"
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="overflow-hidden flex flex-row items-center gap-10">
                <Button className="flex-1" color="success" variant="outlined" onClick={handleRegister}>
                  Sign Up
                </Button>
              </div>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <a
                  href='/login'
                  className='text-green-600 font-medium hover:underline'
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
