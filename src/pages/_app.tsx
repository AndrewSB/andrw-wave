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
        <script>{`
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
          analytics.load("xoFId4OzdmQYD6HQWyKiZKyZjhfszGup");
          analytics.page({url: document.location.href});
          }}();
        `}</script>
        <script async>{`
          fetch("https://enc7ni3p7gol81k.m.pipedream.net?path=" + document.location.pathname + document.location.search)
        `}</script>
      </Head>
      <PageTransition skipInitialTransition timeout={3200} classNames="transition-fade">
        <Component {...pageProps} />
      </PageTransition>
      <style jsx global>{`
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