import { AppProps } from "next/app";
import Head from "next/head";
import { PageTransition } from "next-page-transitions";
import dedent from "dedent";
import dynamic from "next/dynamic";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>mu</title>
        <style>{`body { margin: 0; }`}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <PageTransition
        skipInitialTransition
        timeout={3200}
        classNames="transition-fade"
      >
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

export const AnalyticsHead = dynamic(
  () => import("./_app").then((mod) => mod._AnalyticsHead),
  { ssr: false }
);
export const _AnalyticsHead: React.FC<{ path: string }> = ({ path }) => {
  if (process.env.NODE_ENV === "development") {
    return (
      <Head>
        <meta name="development" content="ayy boy" />
      </Head>
    );
  }

  return (
    <Head>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: dedent`
        function create_UUID() {
          var dt = new Date().getTime();
          var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = (dt + Math.random()*16)%16 | 0;
              dt = Math.floor(dt/16);
              return (c=='x' ? r :(r&0x3|0x8)).toString(16);
          });
          return uuid;
        }
        window.tuuid = create_UUID()
        `,
        }}
      />
      <script
        defer
        async
        dangerouslySetInnerHTML={{
          __html: dedent`
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
          analytics.load("xoFId4OzdmQYD6HQWyKiZKyZjhfszGup");
          analytics.page();
          }}();
        `,
        }}
      />
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `fetch("https://enc7ni3p7gol81k.m.pipedream.net?path=${path}&uuid=" + window.tuuid)`,
        }}
      />
    </Head>
  );
};
