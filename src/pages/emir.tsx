import React from "react";
import AnalyticsHead from "../components/AnalyticsHead";
import Head from "next/head";

export default function Emir() {
  return (
    <React.Fragment>
      <Head>
        <title>head of hamas</title>
      </Head>
      <AnalyticsHead path="/emir" incrementVists={false} />
      <video
        src="/Chadposting Average Turk.mp4"
        autoPlay={true}
        loop
        playsInline
        controls={true}
        style={{
          objectFit: "scale-down",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
    </React.Fragment>
  );
}
