import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToPlay = () => {
  return (
    <div className="pt-[41px] px-[25px] md:pt-[114px] md:px-[112px]">
      <div className="flex flex-row items-center justify-between md:justify-start">
        <Link href={"/"}>
          <div
            className="bg-[url('/images/word-game-images/StartGameButton.png')] bg-no-repeat bg-center bg-cover w-10 h-10 md:w-[64px] md:h-[64px]
         cursor-pointer flex justify-center items-center"
          >
            <Image
              className="mb-2 md:w-[27px] md:h-[25px]"
              src={"/images/word-game-images/icon-back.svg"}
              width={20}
              height={20}
              alt="BackButton"
            />
          </div>
        </Link>
        <h1 className="text-[48px] md:text-[104px] md:mx-auto font-bold bg-gradient-to-b from-[#67B6FF] to-white bg-clip-text text-transparent">
          How To Play
        </h1>
      </div>
    </div>
  );
};

export default HowToPlay;
