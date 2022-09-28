import { AppProps } from "next/app";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";
import "../../styles/global.css";

const TITLE = "my work is serious, i am not | mu";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="theme-color" content="#000000" />
        <style>{"body { margin: 0; }"}</style>
        <title>{TITLE}</title>
        <meta name="title" content={TITLE} />
        <meta
          name="og:image"
          content="https://i.giphy.com/media/BERINdDXSdkevihtAK/giphy.gif"
        />
      </Head>
      <PageTransition
        skipInitialTransition
        timeout={3200}
        classNames="transition-fade"
      >
        <Component {...pageProps} />
      </PageTransition>
    </>
  );
}
