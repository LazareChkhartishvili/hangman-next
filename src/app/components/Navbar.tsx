import Image from "next/image";

const Navbar = ({
  name,
  gamePauseMenu,
  setGamePauseMenu,
}: {
  name: string;
  gamePauseMenu: boolean;
  setGamePauseMenu: (e: boolean) => void;
}) => {
  return (
    <header
      className="flex items-center justify-between px-[26px] pt-[46px] pb-[78px] md:px-[112px] md:pt-[60px] md:pb-[88px] lg:pt-[66px]
    lg:pb-[166px]"
    >
      <div className="flex items-center gap-4 lg:gap-[57px]">
        <div
          onClick={() => setGamePauseMenu(!gamePauseMenu)}
          className="bg-[url('/images/word-game-images/StartGameButton.png')] cursor-pointer bg-cover mx-auto w-10 h-10 md:w-[64px] md:h-[64px] lg:w-[94px] lg:h-[94px] flex items-center justify-center"
        >
          <Image
            className="md:w-8 md:h-[32px]"
            src={"/images/word-game-images/icon-menu.svg"}
            width={14}
            height={14}
            alt="burger"
          />
        </div>
        <h1 className="text-[40px] md:text-[48px] lg:text-[88px] leading-[120%] tracking-[-0.5%] md:tracking-normal text-white">
          {name.toUpperCase()}
        </h1>
      </div>
      <div className="flex items-center gap-4 lg:gap-[57px]">
        <div className="w-[57px] md:w-[160px] lg:w-[240px] h-4 md:h-[31px] rounded-[96px] bg-white"></div>
        <Image
          className="md:w-[54px] md:h-[48px]"
          src={"/images/word-game-images/icon-heart.svg"}
          width={26}
          height={24}
          alt="heart_icon"
        />
      </div>
    </header>
  );
};

export default Navbar;
