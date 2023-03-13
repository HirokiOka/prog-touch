import '@/styles/globals.scss';
import type { AppProps } from 'next/app'
import ProgHead from '../compoments/ProgHead';
import Header from '../compoments/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgHead />
      <Header />
      <Component {...pageProps} />
    </>
  );
}
