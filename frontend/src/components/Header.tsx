'use client';
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import { useMemo, type CSSProperties } from 'react';
import { Button, TextField, Menu, MenuItem } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HeaderBackground from '@/resources/HeaderBackground.png';
import HeaderLogo from '@/resources/HeaderLogo.png';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logOut } from '@/redux/features/auth/authSlice';
import { RootState } from '@/redux/store';
type HeaderType = {
  title?: string;
  /** Action props */
};

const Header: NextPage<HeaderType> = ({ title }) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = (event.target as HTMLFormElement).elements.namedItem(
      'search'
    ) as HTMLInputElement | null;
    const query = searchInput?.value;
    router.push(`/shop/?query=${query}`);
  };

  const handleExpandUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRetractUser = () => {
    setAnchorEl(null);
  };
  const handleLogout = (e: React.MouseEvent<Element, MouseEvent>) => {
    // Handle login logic here (e.g., API call to authenticate the user).
    e.preventDefault();
    try {
      dispatch(logOut());
      setAnchorEl(null);
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className='flex flex-col items-center font-poppins text-29xl'>
      <header
        className='md:item-center my-7 flex w-[95%]
                          flex-row justify-between gap-7 md:flex-col
                          md:justify-center sm:flex-col'
      >
        <div className='flex h-14 flex-none flex-row items-center md:justify-center'>
          <Button
            className=''
            color='success'
            variant='outlined'
            onClick={() => handleNavigate('/')}
          >
            Home
          </Button>
          <Button
            className=''
            color='success'
            variant='outlined'
            onClick={() => handleNavigate('/')}
          >
            Categories
          </Button>
          <Button
            onClick={() => handleNavigate('/about')}
            className=''
            color='success'
            variant='outlined'
          >
            About
          </Button>
          <Button className='' color='success' variant='outlined' href='/about'>
            Premium
          </Button>
        </div>
        <form onSubmit={handleSearch}>
          <TextField
            className='w-full flex-initial bg-[transparent] [border:none] md:justify-center'
            color='success'
            label='Product Searched'
            variant='outlined'
            id='search'
            InputProps={{
              endAdornment: (
                <button
                  type='submit'
                  className='border-none bg-transparent p-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              ),
            }}
            name='search'
          />
        </form>
        <div className='flex flex-none flex-row content-center items-center gap-x-5 md:justify-center'>
          <a href='/cart'>
            <AddShoppingCartIcon fontSize='large' />
          </a>
          {token ? (
            <>
              <Button onClick={handleExpandUser}>
                <AccountCircleIcon fontSize='large' />
              </Button>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleRetractUser}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link
              href='/login'
              className='mr-4 font-semibold'
              style={{ fontSize: 'medium' }}
            >
              Login
            </Link>
          )}
        </div>
      </header>
      <div
        className='flex w-full flex-col items-center bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url(${HeaderBackground.src})`,
          height: '300px',
        }}
      >
        <img className='w-[200px] object-cover' alt='' src={HeaderLogo.src} />
        <div className='h-auto font-medium'>{title}</div>
      </div>
    </div>
  );
};

export default Header;
