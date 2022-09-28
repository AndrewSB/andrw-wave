import React from "react";
import Image from "next/future/image";

type Props = {
  track?: string;
  artist?: string;
};

const NowPlayingBox: React.FC<Props> = ({ track, artist }) => {
  if (track === undefined || artist === undefined) {
    return null;
  } else {
    return (
      <div className="relative duration-100 bg-transparent">
        <button
          onClick={(e) => {
            alert(
              `andrew, wherever he may be in the world, is listening to "${track} by ${artist}", literally right now.`
            );
            e.preventDefault();
          }}
          className="absolute duration-300 hover:scale-110 active:scale-95 transform flex items-center justify-center -top-5 -right-2 z-30 h-10 w-10 border-2 rounded-full overflow-hidden bg-white bg-opacity-20 backdrop-blur-3xl text-white border-opacity-20 border-white"
        >
          ?
        </button>
        <div
          className="duration-300 bg-white bg-opacity-30 cursor-pointer h-14 m-4 shadow-md flex rounded-md overflow-y-visible"
          onClick={() => alert("to")}
        >
          <Image
            src="/jax.png"
            alt="Jax"
            width={80}
            height={80}
            style={{ height: "intrinsic", marginTop: -24 }}
          />
          <div className="flex flex-col justify-center ml-2 mr-8 text-left uppercase">
            <h3 className="font-bold uppercase text-md truncate line-clamp-1 text-white">
              {track}
            </h3>
            <h4 className="uppercase font-mono text-2xs 0 opacity-40 truncate ">
              {artist}
            </h4>
          </div>
        </div>
      </div>
    );
  }
};

export default NowPlayingBox;
