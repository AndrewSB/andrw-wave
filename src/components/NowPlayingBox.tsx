import React from "react";
import Image from "next/image";

type Props = {
  track?: string;
  artist?: string;
};

const NowPlayingBox: React.FC<Props> = ({ track, artist }) => {
  return (
    <div className="hidden lg:block fixed bottom-8 left-0 px-8 z-70">
      <div className="relative duration-100 ">
        <div className="duration-300 bg-white cursor-pointer h-14 shadow-md flex rounded-md relative">
          <Image
            src="/jax.png"
            alt="Jax"
            width={50}
            height={50}
            className="rounded-l-md"
          />
          {track && artist && (
            <div className="flex flex-col justify-center ml-2">
              <p className="text-sm font-bold">{track}</p>
              <p className="text-xs">{artist}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBox;
