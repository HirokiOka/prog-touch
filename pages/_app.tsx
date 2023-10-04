import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { Noto_Sans_JP } from 'next/font/google';
import ProgHead from 'components/ProgHead';

const notoSansJapanese = Noto_Sans_JP({
  weight: '400',
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notoSansJapanese.className}>
      <ProgHead />
      <Component {...pageProps} />
    </main>
  );
}
