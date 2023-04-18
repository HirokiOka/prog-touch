import 'styles/globals.scss';
import type { AppProps } from 'next/app'
import ProgHead from 'components/ProgHead';
import Header from 'components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgHead />
      <Component {...pageProps} />
    </>
  );
}
