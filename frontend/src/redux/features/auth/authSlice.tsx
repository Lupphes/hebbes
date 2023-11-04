import { RootState } from '@/redux/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/api/axios';

type User = {
  email?: string;
  password?: string;
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
      console.log(user);
      const response = await api.post('/auth/register', user);
      return response.data;
    } catch (err) {
      return { error: 'Error calling Auth API' };
    }
  }
);

export const loginUser = createAsyncThunk<User, Partial<User>>(
  'loginuser',
  async (user) => {
    try {
      const response = await api.post('/auth/login', user);
      return response.data;
    } catch (err) {
      return { error: 'Error calling Auth API' };
    }
  }
);

export const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.token = access_token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {})
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {});
  },
});

export const { logOut, setCredentials } = auth.actions;
export default auth.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
