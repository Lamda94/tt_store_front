import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICart {
  article_id: number;
  image: string;
  name: string;
  price: number;
  quantity?: number;
}

const initialState: ICart = {
  article_id: 0,
  image: '',
  name: '',
  price: 0,
  quantity: 0
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ICart>) => {
      if (state.article_id !== action.payload.article_id) {
        state = action.payload;
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;