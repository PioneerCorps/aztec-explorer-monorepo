import logo from "../../assets/logo.webp";
export const Footer = () => {
  return (
    <div className="bg-bgDark2 flex justify-between w-full py-[65px] px-[6.5vw] !text-xs below-mobile:gap-3 dark:bg-bgDark3 ">
      <div className="flex items-center justify-center text-white gap-3">
        <img className=" h-[60px] w-[60px]" src={logo} />
        <div className="headerExa below-mobile:hidden">
          Aztec Explorer
          <div className="text-xs font-thin tracking-wide">PioneerLabs</div>
        </div>
      </div>
      <div className="flex justify-between items-center w-1/2 below-mobile:w-[80%] text-white font-extralight">
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">About Us</h1>
          <p className="hover:underline cursor-pointer">Contact Us</p>
          <p className="hover:underline cursor-pointer">Brand Kit</p>
          <p className="hover:underline cursor-pointer">Bug Report</p>
        </div>
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">Socials</h1>
          <p className="hover:underline cursor-pointer">Discord</p>
          <p className="hover:underline cursor-pointer">X</p>
        </div>
        <div className=" flex flex-col gap-2 h-full">
          <h1 className="text-bgLight2 text-lg">Services</h1>
          <p className="hover:underline cursor-pointer">API Documentation</p>
          <p className="hover:underline cursor-pointer">API Plans</p>
          <p className="hover:underline cursor-pointer">Guides</p>
        </div>
      </div>
    </div>
  );
};
