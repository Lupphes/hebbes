import { RootState } from '@/redux/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/api/axios';

type User = {
  id?: number;
  email?: string;
  password?: string;
};

type LoggedIn = {
  access_token: string;
  token_type: string;
  user: User;
};

type InitialState = {
  loading: boolean;
  error: string;
  user: User;
  token?: string | null;
};

const initialState = {
  user: null,
  token: null,
} as unknown as InitialState;

export const registerUser = createAsyncThunk<User, Partial<User>>(
  'registeruser',
  async (user) => {
    try {
      const response = await api.post('/auth/register', user);
      return response.data;
    } catch (err) {
      throw Error('Error calling registering');
    }
  }
);

export const loginUser = createAsyncThunk<LoggedIn, Partial<User>>(
  'loginuser',
  async (user) => {
    try {
      const response = await api.post('/auth/login', user);
      return response.data.data;
    } catch (err) {
      throw Error('Error calling logging in');
    }
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { logOut } = auth.actions;
export default auth.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
