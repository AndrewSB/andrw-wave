import React from "react";
import AnalyticsHead from "../components/AnalyticsHead";

export default function Emir() {
  return (
    <React.Fragment>
      <AnalyticsHead path="/emir" incrementVists={false} />
      <video src="/Chadposting Average Turk.mp4" autoPlay />
    </React.Fragment>
  );
}
