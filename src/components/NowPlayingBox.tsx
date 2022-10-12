import React, { useEffect } from "react";
import Image from "next/future/image";
import { useNowPlaying } from "../hooks";

const NowPlayingBox = ({ trackEvent }: { trackEvent: (string) => void }) => {
  const { nowPlaying, error } = useNowPlaying();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [previousPreviewUrl, setPreviousPreviewUrl] = React.useState("");

  const audioPlayer = React.useRef(null);

  console.log(nowPlaying);

  useEffect(() => {
    if (nowPlaying?.preview_url !== previousPreviewUrl) {
      setIsPlaying(false);
      setPreviousPreviewUrl(nowPlaying?.preview_url);
    }
  }, [
    isPlaying,
    setIsPlaying,
    nowPlaying,
    previousPreviewUrl,
    setPreviousPreviewUrl,
  ]);

  let shouldRenderBox =
    nowPlaying !== undefined &&
    nowPlaying.track !== undefined &&
    nowPlaying.is_playing;

  return (
    <div
      className="relative bg-transparent"
      style={{
        opacity: nowPlaying?.track === undefined ? 0 : 1,
        transition: "all 1s ease",
        cursor: 'url("/spotify.png"), none',
        // cursor: 'url("' + nowPlaying.album_art + '"), alias',
      }}
    >
      {shouldRenderBox && (
        <React.Fragment>
          <button
            onClick={(e) => {
              if (!isPlaying) {
                trackEvent("player: play " + nowPlaying.external_link);
                setIsPlaying(true);
                audioPlayer.current?.pause();
                audioPlayer.current = new Audio(nowPlaying.preview_url);
                audioPlayer.current.play();
              } else {
                trackEvent("player: ?");
                alert(
                  `andrew, wherever he may be in the world, is listening to "${nowPlaying.track} by ${nowPlaying.artist}", literally right now.`
                );
              }
              e.preventDefault();
            }}
            className="absolute duration-300 hover:scale-110 active:scale-95 transform flex items-center justify-center -top-5 -right-2 z-30 h-10 w-10 border-2 rounded-full overflow-hidden bg-white bg-opacity-20 backdrop-blur-3xl text-white border-[#284650]"
          >
            {isPlaying ? (
              "?"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M3 22v-20l18 10-18 10z"></path>
              </svg>
            )}
          </button>
          <div
            className="duration-300 bg-white bg-opacity-30 h-14 m-4 shadow-md flex rounded-md overflow-y-visible"
            onClick={() => {
              trackEvent("player: open spotify " + nowPlaying.external_link);
              open(nowPlaying.external_link, "_blank");
            }}
          >
            <Image
              src="/jax.png"
              alt="Jax"
              width={80}
              height={80}
              style={{ height: "intrinsic", marginTop: -24 }}
            />
            <div
              className="w-5 h-full py-3 inline-flex justify-between relative"
              style={{
                ...{
                  transition: "all 0.5s ease",
                },
                ...(isPlaying
                  ? { marginLeft: 8, marginRight: 15 }
                  : { width: 0, marginRight: 5 }),
              }}
            >
              <Keyframes
                name="bounce"
                _0={{ transform: "scaleY(0.25)" }}
                _30={{ transform: "scaleY(0.83)" }}
                _60={{ transform: "scaleY(0.42)" }}
                _80={{ transform: "scaleY(0.625)" }}
                to={{ transform: "scaleY(0.5)" }}
                className="mx-5"
              />
              {[-3.2, -1.2, 0].map((animationDelay) => (
                <span
                  key={animationDelay}
                  style={{
                    backgroundColor: "#DD926D",
                    opacity: 0.8,
                    width: 5,
                    content: "",
                    height: "100%",
                    margin: "0 1.5px",
                    transition: "all 1s ease",
                    transformOrigin: "bottom",
                    animation: "bounce 1.8s ease infinite alternate",
                    animationDelay: `${animationDelay}s`,
                    transform: "scaleY(0.5)",
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center mr-6 text-left uppercase overflow-x-hidden">
              <h3 className="font-bold uppercase text-md truncate line-clamp-1 text-white font-msBold">
                {nowPlaying.track}
              </h3>
              <h4 className="uppercase font-mono text-xs 0 opacity-40 truncate">
                {nowPlaying.artist}
              </h4>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NowPlayingBox;

interface KeyframeProps {
  name: string;
  [key: string]: React.CSSProperties | string;
}

const Keyframes = (props: KeyframeProps) => {
  const toCss = (cssObject: React.CSSProperties | string) =>
    typeof cssObject === "string"
      ? cssObject
      : Object.keys(cssObject).reduce((accumulator, key) => {
          const cssKey = key.replace(/[A-Z]/g, (v) => `-${v.toLowerCase()}`);
          const cssValue = (cssObject as any)[key].toString().replace("'", "");
          return `${accumulator}${cssKey}:${cssValue};`;
        }, "");

  return (
    <style>
      {`@keyframes ${props.name} {
        ${Object.keys(props)
          .map((key) => {
            return ["from", "to"].includes(key)
              ? `${key} { ${toCss(props[key])} }`
              : /^_[0-9]+$/.test(key)
              ? `${key.replace("_", "")}% { ${toCss(props[key])} }`
              : "";
          })
          .join(" ")}
      }`}
    </style>
  );
};
