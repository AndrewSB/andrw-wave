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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
