'use client';

import { PropsWithChildren } from 'react';

import { ReduxProvider } from '@/app/redux-provider';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
export default function Providers({ children }: PropsWithChildren<any>) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}
