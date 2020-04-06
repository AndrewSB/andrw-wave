import { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>mu</title>
        <style>{`body { margin: 0; }`}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}