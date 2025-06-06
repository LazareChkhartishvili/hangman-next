"use client";

import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GamePause from "../components/GamePause";
import Container from "../components/Container";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Item {
  id: number;
  name: string;
}

interface Data {
  categories: {
    [key: string]: Item[];
  };
}

const WordGame = ({ category }: { category: string }) => {
  const [word, setWord] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gamePauseMenu, setGamePauseMenu] = useState(false);
  const [health, setHealth] = useState<number>(100);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const getHealthWidthClass = (health: number): string => {
    if (health > 90) return "w-[100%]";
    if (health > 75) return "w-[90%]";
    if (health > 60) return "w-[75%]";
    if (health > 45) return "w-[60%]";
    if (health > 30) return "w-[45%]";
    if (health > 15) return "w-[30%]";
    if (health > 0) return "w-[15%]";
    return "w-[0%]";
  };

  const loadWord = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`,
      { cache: "no-store" }
    );
    const data: Data = await res.json();
    const list = data.categories[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setWord(random.name.toUpperCase());
  }, [category]);

  useEffect(() => {
    loadWord();
  }, [loadWord]);

  useEffect(() => {
    if (word && word !== "") {
      const lettersInWord = word.replace(/\s/g, "").split("");
      const uniqueLetters = [...new Set(lettersInWord)];
      const hasWon = uniqueLetters.every((char) =>
        correctLetters.includes(char)
      );
      setIsWinner(hasWon);
    }
  }, [correctLetters, word]);

  const handleLetterClick = (letter: string) => {
    if (word.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setDisabledLetters((prev) => [...prev, letter]);
      setHealth((prev) => Math.max(prev - 15, 0));
    }
  };

  const resetGame = () => {
    setCorrectLetters([]);
    setDisabledLetters([]);
    setHealth(100);
    setIsWinner(false);
    setGamePauseMenu(false);
    loadWord();
  };

  return (
    <div className="fixed inset-0 z-50">
      {gamePauseMenu && <GamePause setGamePauseMenu={setGamePauseMenu} />}
      <Navbar
        name={category}
        gamePauseMenu={gamePauseMenu}
        setGamePauseMenu={setGamePauseMenu}
        getHealthWidthClass={getHealthWidthClass}
        health={health}
      />

      {health === 0 ? (
        <>
          <div className="absolute inset-0 bg-black opacity-70 z-40" />
          <div className="absolute inset-0 z-50 flex justify-center items-center">
            <Container>
              <Image
                className="absolute -top-6"
                src="/images/word-game-images/you_lose.png"
                width={320}
                height={161}
                alt="you_lose_text"
              />
              <div className="flex flex-col items-center gap-8">
                <div
                  onClick={resetGame}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[226px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">
                    Play Again
                  </h2>
                </div>
                <div
                  onClick={() => router.push("/pickCategory")}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[275px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">
                    New Category
                  </h2>
                </div>
                <div
                  onClick={() => router.push("/")}
                  className="bg-[url('/images/word-game-images/GradientButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[235px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">Quit</h2>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : isWinner ? (
        <>
          <div className="absolute inset-0 bg-black opacity-70 z-40" />
          <div className="absolute inset-0 z-50 flex justify-center items-center">
            <Container>
              <Image
                className="absolute -top-6"
                src="/images/word-game-images/youWin.png"
                width={320}
                height={161}
                alt="you_win_text"
              />
              <div className="flex flex-col items-center gap-8">
                <div
                  onClick={resetGame}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[226px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">
                    Play Again
                  </h2>
                </div>
                <div
                  onClick={() => router.push("/pickCategory")}
                  className="bg-[url('/images/word-game-images/ButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[275px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">
                    New Category
                  </h2>
                </div>
                <div
                  onClick={() => router.push("/")}
                  className="bg-[url('/images/word-game-images/GradientButtonHover.png')] hover:scale-105 duration-500 cursor-pointer w-[235px] h-[62px] bg-contain bg-no-repeat flex justify-center items-center"
                >
                  <h2 className="text-white uppercase text-[32px]">Quit</h2>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : (
        <>
          {/* სიტყვა */}
          <div className="flex gap-2 md:gap-3 px-[26px] md:px-[48px] justify-center items-center flex-wrap">
            {word.split("").map((char, index) =>
              char === " " ? (
                <div key={index} className="w-4 md:w-6" />
              ) : (
                <div
                  key={index}
                  className="bg-blue rounded-[12px] md:rounded-[32px] w-10 md:w-[88px] h-[66px] md:h-[112px] lg:w-[112px] lg:h-[128px] flex justify-center items-center"
                  style={{
                    boxShadow: "inset 4px 4px 10px #3C74FF, inset #140E66",
                  }}
                >
                  <h1 className="text-white text-[40px] md:text-[64px] lg:text-[88px] uppercase">
                    {correctLetters.includes(char) ? char : ""}
                  </h1>
                </div>
              )
            )}
          </div>

          {/* ანბანი */}
          <div className="mt-[120px] flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 max-w-[1173px] mx-auto">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={
                  disabledLetters.includes(letter) ||
                  correctLetters.includes(letter)
                }
                className={`w-[28px] h-[56px] md:w-[64px] md:h-[84px] lg:w-[109px] lg:h-[84px] text-[24px] md:text-[48px] rounded-[8px] md:rounded-[24px] flex items-center justify-center ${
                  disabledLetters.includes(letter)
                    ? "bg-white opacity-25 cursor-not-allowed"
                    : "bg-white text-darkNavy cursor-pointer"
                }`}
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

export default WordGame;
