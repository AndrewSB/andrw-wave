import { AppProps } from 'next/app';
import Head from 'next/head';
import { PageTransition } from 'next-page-transitions';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>mu</title>
        <style>{`body { margin: 0; }`}</style>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
      </Head>
      <PageTransition skipInitialTransition timeout={3200} classNames="transition-fade">
        <Component {...pageProps} />
      </PageTransition>
      <style jsx global>{`
          .transition-fade-enter {
            opacity: 0;
          }
          .transition-fade-enter-active {
            opacity: 1;
            transition: opacity 400ms steps(2);
          }
          .transition-fade-exit {
            opacity: 1;
          }
          .transition-fade-exit-active {
            opacity: 0;
            transition: opacity 2500ms steps(7);
          }
        `}</style>
    </>
  );
}