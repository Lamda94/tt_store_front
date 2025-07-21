import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  descriptions: string;
}

const initialStateProducts: IProduct[] = [
    { id: 1, name: 'Esprit Ruffle Shirt', price: 16.64, image: '/images/product-01.jpg', category: 'women', descriptions: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.' },
    { id: 2, name: 'Herschel supply', price: 35.31, image: '/images/product-02.jpg', category: 'women', descriptions: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.' },
    { id: 3, name: 'Only Check Trouser', price: 25.50, image: '/images/product-03.jpg', category: 'men', descriptions: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.' },
    { id: 4, name: 'Classic Trench Coat', price: 75.00, image: '/images/product-04.jpg', category: 'women', descriptions: 'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.' },
];


const producstSlice = createSlice({
  name: 'cart',
  initialState: initialStateProducts,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (!existingProduct) {
        state.push(action.payload);
      }
    },
  },
});

export const { addProduct } = producstSlice.actions;
export default producstSlice.reducer;