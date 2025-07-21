import { fetchProductsAPI } from '@/service/Product/product.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface IProduct {
  article_id: string;
  article_name: string;
  article_description: string;
  article_price: number;
  article_image: string;
  article_stock: number;
  article_status: number;
}

interface ProductsState {
  items: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProductsAPI();
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;