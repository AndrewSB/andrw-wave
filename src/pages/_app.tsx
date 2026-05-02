import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { trailingCursor } from "cursor-effects";
import { siteMetadata } from "../siteMetadata";
import { msBeeBold, msBeeRegular, pressStart2P } from "../fonts";
import "../../public/styles/global.css";

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
  const [isExiting, setIsExiting] = React.useState(false);
  const displayedRouteKeyRef = React.useRef(router.asPath);
  const pendingPageRef = React.useRef<DisplayedPage | null>(null);
  const exitTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const finishExit = React.useCallback(() => {
    if (pendingPageRef.current) {
      displayedRouteKeyRef.current = pendingPageRef.current.routeKey;
      setDisplayedPage(pendingPageRef.current);
      pendingPageRef.current = null;
    }

    setIsExiting(false);
    exitTimerRef.current = null;
  }, []);

  const startExit = React.useCallback(() => {
    setIsExiting(true);

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = setTimeout(finishExit, EXIT_TIMEOUT_MS);
  }, [finishExit]);

  React.useEffect(() => {
    // only run if this is a desktop device, not a touch device
    if (window.matchMedia("(pointer:fine)").matches) {
      trailingCursor({ particles: 14 });
    }
  }, []);

  React.useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (url !== displayedRouteKeyRef.current) {
        startExit();
      }
    };

    const handleRouteChangeError = () => {
      if (!pendingPageRef.current) {
        setIsExiting(false);
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events, startExit]);

  React.useEffect(() => {
    if (router.asPath === displayedRouteKeyRef.current) {
      return;
    }

    pendingPageRef.current = {
      Component,
      pageProps,
      routeKey: router.asPath,
    };

    if (!isExiting) {
      const frame = requestAnimationFrame(startExit);
      return () => cancelAnimationFrame(frame);
    }
  }, [Component, isExiting, pageProps, router.asPath, startExit]);

  React.useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  const PageComponent = displayedPage.Component;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="theme-color" content={siteMetadata.themeColor} />
        <style>{"body { margin: 0; }"}</style>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <link rel="canonical" href={siteMetadata.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteMetadata.appName} />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:title" content={siteMetadata.title} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image" content={siteMetadata.previewImage} />
        <meta property="og:image:type" content="image/gif" />
      </Head>
      <div
        className={`${pressStart2P.variable} ${msBeeRegular.variable} ${
          msBeeBold.variable
        } ${
          isExiting ? "transition-fade-exit transition-fade-exit-active" : ""
        }`}
      >
        <PageComponent {...displayedPage.pageProps} />
      </div>
    </>
  );
}
