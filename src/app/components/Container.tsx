import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="relative bg-[url('/images/word-game-images/PopupSmall.png')] scale-[0.6] md:scale-90 lg:scale-100 bg-no-repeat bg-center flex-col flex justify-center items-center h-[500px] w-[592px]">
      {children}
    </div>
  );
};

export default Container;
