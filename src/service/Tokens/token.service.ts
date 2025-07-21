
import { IAcceptanceUrl } from '@/lib/features/tokens/TokenSlice';
import axios from 'axios';

export const fetchTokensAPI = async (): Promise<IAcceptanceUrl> => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${url}transaction/acceptance/links`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await axios.request(config);
  if (!response.status) {
    throw new Error('No se pudieron obtener los tokens');
  }

  return response.data;
};