import React from "react";
import { Data, CategoryName } from "../types/types";

const Categories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/data.json`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data: Data = await response.json();
  const categoryNames = Object.keys(data.categories) as CategoryName[];

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="grid grid-cols-1 gap-4 justify-items-center max-w-7xl mx-auto md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {categoryNames.map((category) => (
          <div
            key={category}
            className="relative flex items-center justify-center w-[324px] h-[77px] md:w-[384px] md:h-[190px] bg-[url('/images/word-game-images/ButtonDefault.png')] lg:bg-[url('/images/word-game-images/ButtonCategoryHoverNew.png')] bg-no-repeat bg-cover md:bg-contain bg-center hover:scale-105 transition-transform duration-500 cursor-pointer"
          >
            <h2 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-[0.05em] drop-shadow-md">
              {category}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
