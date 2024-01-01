import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AuthProvider from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Toaster
        position='top-right'
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </AuthProvider>
  ); 
}
