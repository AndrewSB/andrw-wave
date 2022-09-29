import React from "react";
import Me from "../components/Me";
import AnalyticsHead from "../components/AnalyticsHead";

export default function Home() {
  return (
    <React.Fragment>
      <AnalyticsHead path="/" incrementVists={true}>
        {(tracker) => {
          return <Me tappedText={(dialogText) => tracker(dialogText)} />;
        }}
      </AnalyticsHead>
    </React.Fragment>
  );
}
