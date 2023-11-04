import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
