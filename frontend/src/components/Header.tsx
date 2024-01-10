'use client';
import type { NextPage } from 'next';
import { useMemo, type CSSProperties } from 'react';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import HeaderBackground from '@/resources/HeaderBackground.png';
import HeaderLogo from '@/resources/HeaderLogo.png';
import {
  Button,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';

type HeaderType = {
  title?: string;
};

const Header: NextPage<HeaderType> = ({ title }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = (event.target as HTMLFormElement).elements.namedItem(
      'search'
    ) as HTMLInputElement | null;
    const query = searchInput?.value.trim(); // Trim to remove any whitespace

    // If the query is empty, do nothing and return
    if (!query) {
      return;
    }

    // If there is a query, proceed with the navigation
    router.push(`/shop/?query=${query}`);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setMenuOpen(open);
    };

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const list = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'Categories', 'About', 'Premium', 'Cart', 'Login'].map(
          (text) => {
            let path = '';
            if (text === 'Home' || text === 'Categories') {
              path = '/';
            } else if (text === 'About' || text === 'Premium') {
              path = '/about';
            } else {
              path = `/${text.toLowerCase()}`;
            }

            return (
              <Button
                key={text}
                color='success'
                variant='outlined'
                fullWidth
                style={{ margin: '8px 0' }} // Optional: adjust spacing
                onClick={() => navigate(path)}
              >
                {text}
              </Button>
            );
          }
        )}
      </List>
    </div>
  );

  return (
    <div className='flex flex-col items-center font-poppins'>
      <header className='my-3 md:flex-row md:gap-7'>
        <div className='flex w-full flex-row items-center justify-between md:flex-row md:gap-7'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleDrawer(true)}
            className='md:hidden'
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={menuOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>

          <div className='my-3 hidden flex-wrap justify-center gap-3 md:flex md:gap-5'>
            {/* Buttons visible on larger screens */}
            <Button color='success' variant='outlined' href='/'>
              Home
            </Button>
            <Button color='success' variant='outlined' href='/'>
              Categories
            </Button>
            <Button color='success' variant='outlined' href='/about'>
              About
            </Button>
            <Button color='success' variant='outlined' href='/about'>
              Premium
            </Button>
          </div>

          <form className='mx-4 flex-grow md:w-auto' onSubmit={handleSearch}>
            {/* Search field */}
            <TextField
              fullWidth
              color='success'
              label='Product Searched'
              variant='outlined'
              id='search'
              name='search'
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
            />
          </form>

          {/* Icons for cart and login, visible on larger screens */}
          <div className='hidden flex-row items-center gap-x-5 md:flex'>
            <a href='/cart'>
              {/* Shopping Cart Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='green'
                className='h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </a>
            <a href='/login'>
              {/* User/Login Icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='green'
                className='h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </a>
          </div>
        </div>
      </header>
      {/* Rest of your component, including background and title */}
      <div
        className='flex w-full flex-col items-center bg-cover bg-no-repeat'
        style={{
          backgroundImage: `url(${HeaderBackground.src})`,
          height: '300px',
        }}
      >
        <a href='/'>
          <img
            className='w-[200px] object-cover'
            alt='Header Logo'
            src={HeaderLogo.src}
          />
        </a>
        <div className='h-auto font-medium'>{title}</div>
      </div>
    </div>
  );
};

export default Header;
