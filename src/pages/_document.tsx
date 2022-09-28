import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <style>{`
        body {
            margin: 0;
        }
        .transition-fade-exit {
          opacity: 1;
        }
        .transition-fade-exit-active {
          opacity: 0;
          transition: opacity 2500ms steps(7);
        }
      `}</style>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        />
        <link
          rel="preload"
          href="/fonts/MSBee-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/MSBee-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
