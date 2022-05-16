import React from "react";
import Me from "../components/Me";
import AnalyticsHead from "../components/AnalyticsHead";

export default function Home() {
  return (
    <>
      <AnalyticsHead path="/" incrementVists={true} />
      <Me />
    </>
  );
}
