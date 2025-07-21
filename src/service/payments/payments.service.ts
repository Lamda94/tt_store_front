import { ITransactionData } from '@/lib/features/payment/paymentSlice';
import axios from 'axios';

export const fetchTransactionAPI = async (data:ITransactionData): Promise<ITransactionData> => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${url}transaction/generate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data,
  };
  const response = await axios.request(config);
  if (!response.status) {
    throw new Error('No se pudieron obtener los productos');
  }
  console.log(response, 'response de axios');
  
  return response.data;
};