import { Html, Head, Main, NextScript } from "next/document";
import { siteMetadata } from "../siteMetadata";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content={siteMetadata.appName} />
        <meta
          name="apple-mobile-web-app-title"
          content={siteMetadata.appName}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <style>{`
        body {
            margin: 0;
        }
        .transition-fade-exit {
          opacity: 1;
        }
        .transition-fade-exit-active {
          opacity: 0;
          transition: opacity 1600ms steps(7);
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
