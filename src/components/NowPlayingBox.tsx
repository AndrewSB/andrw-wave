import React, { useEffect } from "react";
import Image from "next/future/image";

type Props = {
  track?: string;
  artist?: string;
  spotifyUrl?: string;
  previewUrl?: string;
};

const NowPlayingBox: React.FC<Props> = ({
  track,
  artist,
  spotifyUrl,
  previewUrl,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [previousPreviewUrl, setPreviousPreviewUrl] = React.useState("");

  const audioPlayer = React.useRef(null);

  useEffect(() => {
    if (previewUrl !== previousPreviewUrl) {
      setIsPlaying(false);
      setPreviousPreviewUrl(previewUrl);
    }
  }, [
    isPlaying,
    setIsPlaying,
    previewUrl,
    previousPreviewUrl,
    setPreviousPreviewUrl,
  ]);

  if (
    track === undefined ||
    artist === undefined ||
    spotifyUrl === undefined ||
    previewUrl === undefined
  ) {
    return null;
  } else {
    return (
      <div
        className="relative bg-transparent"
        style={{
          transition: "all 1s ease",
          cursor: 'url("/spotify.png"), alias',
        }}
      >
        <button
          onClick={(e) => {
            if (!isPlaying) {
              setIsPlaying(true);
              audioPlayer.current?.pause();
              audioPlayer.current = new Audio(previewUrl);
              audioPlayer.current.play();
            } else {
              alert(
                `andrew, wherever he may be in the world, is listening to "${track} by ${artist}", literally right now.`
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
          onClick={() => open(spotifyUrl, "_blank")}
        >
          <Image
            src="/jax.png"
            alt="Jax"
            width={80}
            height={80}
            style={{ height: "intrinsic", marginTop: -24 }}
          />
          <div
            className="w-5 h-full ml-3 pb-3 pt-3 inline-flex justify-between relative"
            style={{
              transition: "all 1s ease",
              width: isPlaying ? 5 * 4 : 0,
            }}
          >
            <Keyframes
              name="bounce"
              _0={{ transform: "scaleY(0.25)" }}
              _30={{ transform: "scaleY(0.83)" }}
              _60={{ transform: "scaleY(0.42)" }}
              _80={{ transform: "scaleY(0.625)" }}
              to={{ transform: "scaleY(0.5)" }}
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
          <div className="flex flex-col justify-center mx-6 text-left uppercase overflow-x-hidden">
            <h3 className="font-bold uppercase text-md truncate line-clamp-1 text-white font-msBold">
              {track}
            </h3>
            <h4 className="uppercase font-mono text-xs 0 opacity-40 truncate">
              {artist}
            </h4>
          </div>
        </div>
      </div>
    );
  }
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
