'use client';

import { PropsWithChildren } from 'react';

import { ReduxProvider } from '@/app/redux-provider';

export default function Providers({ children }: PropsWithChildren<any>) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
