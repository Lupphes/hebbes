import { combineReducers } from 'redux';

import loginReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  auth: loginReducer,
  cart: cartReducer,
});

export default rootReducer;
