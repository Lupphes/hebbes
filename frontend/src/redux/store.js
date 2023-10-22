import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer';

const store = configureStore(rootReducer);

export default store;
