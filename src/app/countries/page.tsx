"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GamePause from "../components/GamePause";

interface Countries {
  id: number;
  name: string;
}

interface Data {
  categories: {
    [key: string]: Countries[];
  };
}

const Countries = () => {
  const [word, setWord] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [gamePauseMenu, setGamePauseMenu] = useState(false);

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
      const countries = data.categories["Countries"];
      const randomCountries =
        countries[Math.floor(Math.random() * countries.length)];
      setWord(randomCountries.name.toUpperCase());
    };

    fetchData();
  }, []);

  const handleLetterClick = (letter: string) => {
    if (word.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
    } else {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  };

  return (
    <div className="">
      {gamePauseMenu && <GamePause setGamePauseMenu={setGamePauseMenu} />}
      <Navbar
        name={"animals"}
        gamePauseMenu={gamePauseMenu}
        setGamePauseMenu={setGamePauseMenu}
      />
      {/* ასოების კონტეინერები */}
      <div className="flex gap-2 md:gap-3 px-[26px] md:px-[48px] justify-center items-center">
        {word.split("").map((char, index) => (
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
        ))}
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
    </div>
  );
};

export default Countries;
