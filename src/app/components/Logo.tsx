import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="md:w-[373px] md:h-[180px] absolute -top-10 md:-top-20"
      src={"/images/word-game-images/logo.svg"}
      width={263}
      height={126}
      alt="logo"
    />
  );
};

export default Logo;
