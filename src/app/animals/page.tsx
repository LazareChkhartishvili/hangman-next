"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GamePause from "../components/GamePause";
import Container from "../components/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Animal {
  id: number;
  name: string;
}

interface Data {
  categories: {
    [key: string]: Animal[];
  };
}

const Animals = () => {
  const [word, setWord] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gamePauseMenu, setGamePauseMenu] = useState(false);
  const [health, setHealth] = useState<number>(100);

  const router = useRouter();

  const getHealthWidthClass = (health: number): string => {
    if (health > 90) return "w-[100%]";
    if (health > 60) return "w-[70%]";
    if (health > 30) return "w-[50%]";
    if (health > 10) return "w-[30%]";
    if (health > 0) return "w-[10%]";
    return "w-[0%]";
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`,
        {
          cache: "no-store",
        }
      );
      const data: Data = await res.json();
      const animals = data.categories["Animals"];
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      setWord(randomAnimal.name.toUpperCase());
    };

    fetchData();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (word.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setDisabledLetters((prev) => [...prev, letter]);
      setHealth((prev) => Math.max(prev - 30, 0));
    }
  };

  const resetGame = async () => {
    setCorrectLetters([]);
    setDisabledLetters([]);
    setHealth(100);
    setGamePauseMenu(false);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`,
      {
        cache: "no-store",
      }
    );
    const data: Data = await res.json();
    const animals = data.categories["Animals"];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setWord(randomAnimal.name.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50">
      {gamePauseMenu && <GamePause setGamePauseMenu={setGamePauseMenu} />}

      <Navbar
        name={"animals"}
        gamePauseMenu={gamePauseMenu}
        setGamePauseMenu={setGamePauseMenu}
        getHealthWidthClass={getHealthWidthClass}
        health={health}
      />

      {health === 0 ? (
        <>
          {/* Game Over ფონის დაბლოკვა */}
          <div className="absolute inset-0 bg-black opacity-70 z-40" />

          {/* Game Over კონტეინერი */}
          <div className="absolute inset-0 z-50 flex justify-center items-center">
            <Container>
              <Image
                className="absolute -top-6"
                src={"/images/word-game-images/you_lose.png"}
                width={320}
                height={161}
                alt="you_lose_text"
              />
              <div className="flex flex-col items-center gap-8">
                <div
                  onClick={resetGame}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[226px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="lg:text-[32px] lg:leading-[120%] lg:tracking-[5%] uppercase text-white">
                    Play Again
                  </h2>
                </div>
                <div
                  onClick={() => {
                    setGamePauseMenu(false);
                    router.push("/pickCategory");
                  }}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[275px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
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
        </>
      ) : (
        <>
          {/* ასოების კონტეინერები */}
          <div className="flex gap-2 md:gap-3 px-[26px] md:px-[48px] justify-center items-center flex-wrap">
            {word.split("").map((char, index) => {
              if (char === " ") {
                return <div key={index} className="w-4 md:w-6" />;
              }
              return (
                <div
                  style={{
                    boxShadow: "inset 4px 4px 10px #3C74FF, inset #140E66",
                  }}
                  key={index}
                  className="bg-blue rounded-[12px] md:rounded-[32px] w-10 md:w-[88px] h-[66px] md:h-[112px] lg:w-[112px] lg:h-[128px] flex justify-center items-center"
                >
                  <h1 className="text-[40px] md:text-[64px] lg:text-[88px] text-white leading-[120%] tracking-[5%] uppercase text-center">
                    {correctLetters.includes(char) ? char : ""}
                  </h1>
                </div>
              );
            })}
          </div>

          {/* ანბანი */}
          <div className="mt-[118px] md:mt-[134px] lg:mt-[120px] items-center flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6  max-w-[324px] md:max-w-[704px] lg:max-w-[1173px] mx-auto">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={
                  disabledLetters.includes(letter) ||
                  correctLetters.includes(letter)
                }
                className={`w-[28px] h-[56px] md:w-[64px] text-[24px] md:text-[48px] md:h-[84px] lg:w-[109px] lg:h-[84px] rounded-[8px] md:rounded-[24px] flex items-center justify-center 
              ${
                disabledLetters.includes(letter)
                  ? "bg-white opacity-25 md:w-[64px]  text-darkNavy text-2xl leading-[150%]  cursor-not-allowed"
                  : "bg-white text-darkNavy text-2xl leading-[150%]  cursor-pointer"
              } transition`}
              >
                {letter}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Animals;
