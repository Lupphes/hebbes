import { combineReducers } from 'redux';

import loginReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  auth: loginReducer,
});

export default rootReducer;
