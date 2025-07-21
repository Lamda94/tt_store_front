'use client';

import { Provider } from 'react-redux';
import { store } from '../lib/store'; // Asegúrate de que la ruta a tu store sea correcta

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}