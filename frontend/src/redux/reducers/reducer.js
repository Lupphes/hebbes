import { combineReducers } from 'redux';

import loginReducer from '../features/login/loginSlice';

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  login: loginReducer,
});

export default rootReducer;
