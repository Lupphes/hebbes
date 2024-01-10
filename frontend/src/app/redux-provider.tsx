'use client';

import { PropsWithChildren } from 'react';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }: PropsWithChildren<any>) {
  return <Provider store={store}>{children}</Provider>;
}
