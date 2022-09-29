import React from "react";
import dynamic from "next/dynamic";

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
    tuuid?: string;
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

type ITrackAnalyticsHead = {
  path: string;
  incrementVists: boolean;
  children?: (tracker: (text: string) => void) => React.ReactNode;
};

// This is only rendered on the client, never on the server.
const TrackAnalyticsHead: React.FC<ITrackAnalyticsHead> = ({
  path,
  incrementVists,
  children,
}) => {
  React.useEffect(() => {
    if (window.tuuid === undefined) {
      window.tuuid = create_UUID();
    }

    if (process.env.NODE_ENV === "development") {
      console.log("in development");
    } else {
      fetch(
        `https://enqnftwr161artz.m.pipedream.net?path=${path}&num_visit=${numVisits()}&uuid=${
          window.tuuid
        }`
      );
      if (incrementVists) {
        localStorage.setItem("visits", (numVisits() + 1).toString());
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      {children((eventText: string) => {
        if (process.env.NODE_ENV === "development") {
          console.log("t: " + eventText);
        } else {
          fetch(
            `https://en6zlc1nkkhbaom.m.pipedream.net?event=${encodeURIComponent(
              eventText
            )}&path=${path}&num_visit=${numVisits()}&uuid=${window.tuuid}`
          );
        }
      })}
    </React.Fragment>
  );
};

export default AnalyticsHead;
