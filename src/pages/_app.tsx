import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { trailingCursor } from "cursor-effects";
import "../../public/styles/global.css";

const TITLE = "my work is serious, i am not | mu";
const EXIT_TIMEOUT_MS = 1650;

type DisplayedPage = Pick<AppProps, "Component" | "pageProps"> & {
  routeKey: string;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [displayedPage, setDisplayedPage] = React.useState<DisplayedPage>({
    Component,
    pageProps,
    routeKey: router.asPath,
  });
  const displayedRouteKeyRef = React.useRef(router.asPath);
  const pendingPageRef = React.useRef<DisplayedPage | null>(null);
  const exitTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  React.useEffect(() => {
    // only run if this is a desktop device, not a touch device
    if (window.matchMedia("(pointer:fine)").matches) {
      trailingCursor({ particles: 14 });
    }
  }, []);

  React.useEffect(() => {
    if (router.asPath === displayedRouteKeyRef.current) {
      return;
    }

    pendingPageRef.current = {
      Component,
      pageProps,
      routeKey: router.asPath,
    };

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = setTimeout(() => {
      if (pendingPageRef.current) {
        displayedRouteKeyRef.current = pendingPageRef.current.routeKey;
        setDisplayedPage(pendingPageRef.current);
        pendingPageRef.current = null;
      }
      exitTimerRef.current = null;
    }, EXIT_TIMEOUT_MS);

    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, [Component, pageProps, router.asPath]);

  const PageComponent = displayedPage.Component;
  const isExiting = router.asPath !== displayedPage.routeKey;

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
      <div
        className={
          isExiting ? "transition-fade-exit transition-fade-exit-active" : ""
        }
      >
        <PageComponent {...displayedPage.pageProps} />
      </div>
    </>
  );
}
