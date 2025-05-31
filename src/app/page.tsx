import React from "react";
import Logo from "./components/Logo";
import Container from "./components/Container";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <Container>
        <Logo />

        <Link href={"/pickCategory"}>
          <div
            className="mt-20 bg-[url('/images/word-game-images/StartGameButton.png')] bg-no-repeat bg-center bg-cover w-[200px] h-[200px]
         flex justify-center items-center hover:scale-110 duration-500 cursor-pointer"
          >
            <Image
              src={"/images/word-game-images/StartButtonTriangle.png"}
              width={66}
              height={62}
              alt="PlayButton"
              priority
            />
          </div>
        </Link>
        <div
          className="mt-[58px] bg-[url('/images/word-game-images/ButtonDefault.png')] w-[260px] h-[62px] cursor-pointer 
        flex items-center justify-center hover:scale-95 duration-500 hover:"
        >
          <h2 className="text-[32px] leading-[120%] tracking-[5%] uppercase text-white ">
            <Link href={"/howtoplay"}>How To Play</Link>
          </h2>
        </div>
      </Container>
    </div>
  );
};

export default Home;
