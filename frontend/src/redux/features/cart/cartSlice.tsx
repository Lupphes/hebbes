import { RootState } from '@/redux/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '@/api/axios';

interface CartState{
  cart: Item[];
}

const initialState: CartState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
        const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
  
        if (existingItemIndex !== -1) {
          // Item already in cart, increase quantity
          state.cart[existingItemIndex].cartQuantity += 1;
        } else {
          // Item not in cart, add it
          state.cart.push({ ...action.payload, cartQuantity: 1 });
        }
        console.log(...state.cart)
        //console.log( action.payload)
      },
      removeCartItem: (state, action) => {
        const itemIndex = state.cart.findIndex(item => item.id === action.payload);
        if (itemIndex !== -1) {
          state.cart.splice(itemIndex, 1);
        }
      },
      decrementCartQuantity: (state, action) => {
        const itemIndex = state.cart.findIndex(item => item.id === action.payload);
        if (itemIndex !== -1 && state.cart[itemIndex].cartQuantity > 1) {
          state.cart[itemIndex].cartQuantity -= 1;
        }
      },
      incrementCartQuantity: (state, action) => {
        const itemIndex = state.cart.findIndex(item => item.id === action.payload);
        if (itemIndex !== -1) {
          state.cart[itemIndex].cartQuantity += 1;
        }
      },
  },
})

// Action creators are generated for each case reducer function
export const { addCartItem, removeCartItem, decrementCartQuantity, incrementCartQuantity } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;