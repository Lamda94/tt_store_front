import type { IProduct } from '@/lib/features/products/productSlice';
import axios from 'axios';

export const fetchProductsAPI = async (): Promise<IProduct[]> => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${url}article/list`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config);
  if (!response.status) {
    throw new Error('No se pudieron obtener los productos');
  }

  return response.data;
};