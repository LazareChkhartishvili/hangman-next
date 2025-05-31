import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToPlay = () => {
  const instructionItems = [
    {
      id: 1,
      number: 1,
      title: "Choose A Category",
      content:
        "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.",
    },
    {
      id: 2,
      number: 2,
      title: "Guess letters",
      content:
        "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.",
    },
    {
      id: 3,
      number: 3,
      title: "Win or lose",
      content:
        "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.",
    },
  ];

  return (
    <div className="pt-[41px] px-[25px] md:pt-[20px] md:px-[112px] mb-20 lg:pt-[100px] lg:px-[150px]">
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

      {/* instructionItems  */}

      <div className="flex flex-col lg:flex-row lg:mx-auto lg:justify-center lg:items-center mt-[29px] md:mt-[40px] gap-6">
        {instructionItems.map((item) => {
          return (
            <div key={item.id}>
              <div className="md:hidden bg-white p-8 rounded-[20px]">
                <h2 className="text-darkNavy text-2xl leading-[120%] tracking-[5%]">
                  <span className="text-blue mr-4">0{item.number}</span>
                  {item.title}
                </h2>
                <p className="text-[#887DC0] leading-[120%] tracking-[5%] mt-4 hover:scale-105 cursor-pointer duration-500">
                  {item.content}
                </p>
              </div>
              {/* MD */}
              <div className="hidden md:flex lg:w-[384px] lg:h-[550px]  bg-white py-8 px-10 md:px-[43px] md:py-[60px] rounded-[20px]">
                <div className="flex flex-row md:flex-col text-center items-center">
                  <h2 className="text-[88px] leading-[120%] text-blue mr-10">
                    0{item.number}
                  </h2>
                  <div className="flex flex-col">
                    <h1 className="text-[40px] lg:my-10 text-darkNavy leading-[120%] tracking-[5%] uppercase">
                      {item.title}
                    </h1>
                    <p className="text-[20px] lg:max-w-[288px] text-[#887DC0] leading-[120%] tracking-[5%]">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowToPlay;
