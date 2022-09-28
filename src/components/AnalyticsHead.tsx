import React from "react";
import Head from "next/head";
import dedent from "dedent";
import dynamic from "next/dynamic";
import Script from "next/script";

const AnalyticsHead = dynamic(() => Promise.resolve(TrackAnalyticsHead), {
  ssr: false,
});

function numVisits() {
  var visits = localStorage.getItem("visits");
  if (visits) {
    return parseInt(visits);
  } else {
    return 0;
  }
}

declare global {
  interface Window {
    tuuid: string;
    numVisits: number;
  }
}

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

// This is only rendered on the client, never on the server.
const TrackAnalyticsHead: React.FC<{
  path: string;
  incrementVists: boolean;
}> = ({ path, incrementVists }) => {
  window.tuuid = create_UUID();
  window.numVisits = numVisits();

  return (
    <Head>
      {process.env.NODE_ENV === "development" ? (
        <meta name="development" content="ayy boy" />
      ) : (
        <React.Fragment>
          <meta name="a" content="on" />
          <Script
            id="pipedream"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: dedent`
              fetch("https://enc7ni3p7gol81k.m.pipedream.net?path=${path}&num_visit=" + window.numVisits + "&uuid=" + window.tuuid);
              ${
                incrementVists
                  ? `localStorage.setItem("visits", window.numVisits + 1);`
                  : ""
              }
              `,
            }}
          />
          <Script
            id="ga"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: dedent`
          !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
          analytics.load("xoFId4OzdmQYD6HQWyKiZKyZjhfszGup");
          analytics.page();
          }}();
        `,
            }}
          />
        </React.Fragment>
      )}
    </Head>
  );
};

export default AnalyticsHead;
