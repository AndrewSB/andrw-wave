import React from "react";
import Link from "next/link";
import Router from "next/router";
import FakePhonePanel from "./FakePhonePanel";
import PokemonDialogBox from "./PokemonDialogBox";
import styles from "./Me.module.css";
import NowPlayingBox from "./NowPlayingBox";

// const backgroundImageUrl = 'http://svgshare.com/i/JtN.svg'
// const oldBackgroundImageUrl = 'https://78.media.tumblr.com/3c9a8417a347d806520acc60267a3dac/tumblr_nkap4jjcuq1twprc3o1_1280.jpg'
const backgroundImageUrlPallete = {
  dominant: "rgb(40, 70, 80)",
};

const Me: React.FC<{ trackEvent: (string) => void }> = ({ trackEvent }) => {
  console.log(trackEvent);

  return (
    <FakePhonePanel
      showingWidth={530}
      customStyle={`
      background: ${backgroundImageUrlPallete.dominant};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    `}
    >
      <div
        style={{
          backgroundImage: "url('/me.svg')",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Link href="/404" className="block py-16 w-full h-[88px]" />
        <div className="block fixed left-0 lg:px-14 bg-transparent ml-[-20px] md:ml-0 bottom-32 lg:bottom-14 max-w-full">
          <NowPlayingBox trackEvent={trackEvent} />
        </div>
        <div className="flex flex-row items-stretch justify-end w-full p-4">
          {/* <span style={{}}>yo</span> */}
          <PokemonDialogBox
            pushLostPage={() => Router.push("/404")}
            onNewText={(t) => trackEvent("dialog: " + t.substring(0, 10))}
          />
        </div>
      </div>
      <style jsx>{`
        .fourohfourlink {
          display: block;
          padding-top: 8.5vh;
          height: 88px;
          width: 200px;
        }

        p {
          font-family: Arial, sans-serif;
        }
      `}</style>
    </FakePhonePanel>
  );
};

export default Me;
