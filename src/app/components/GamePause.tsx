import React from "react";
import Container from "./Container";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GamePause = ({
  setGamePauseMenu,
}: {
  setGamePauseMenu: (e: boolean) => void;
}) => {
  const handleOutsideClick = () => {
    setGamePauseMenu(false);
  };

  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1A043A, #2B1677, #151278)",
          opacity: 0.8,
        }}
        onClick={handleOutsideClick}
      />

      {/* კონტეინერი */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Container>
            <Image
              className="absolute -top-6"
              src={"/images/word-game-images/Paused.svg"}
              width={265}
              height={161}
              alt="pausedText"
            />
            <div className="flex flex-col items-center gap-8">
              <div
                onClick={() => setGamePauseMenu(false)}
                className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[226px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
              >
                <h2 className="lg:text-[32px] lg:leading-[120%] lg:tracking-[5%] uppercase text-white">
                  Continue
                </h2>
              </div>
              <div className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[275px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center">
                <h2 className="lg:text-[32px] lg:leading-[120%] lg:tracking-[5%] uppercase text-white">
                  New Category
                </h2>
              </div>
              <div
                onClick={() => {
                  setGamePauseMenu(false);
                  router.push("/");
                }}
                className="bg-[url('/images/word-game-images/GradientButtonHover.png')]  hover:scale-105 cursor-pointer duration-500 w-[235px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
              >
                <h2 className="lg:text-[32px] lg:leading-[120%] lg:tracking-[5%] uppercase text-white">
                  Quit
                </h2>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GamePause;
