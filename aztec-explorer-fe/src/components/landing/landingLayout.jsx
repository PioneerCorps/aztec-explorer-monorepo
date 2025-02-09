import { LatestBlocks } from "./latestBlocks";
import { LatestTx } from "./latestTx";
import { Main } from "./main";

export const Landing = () => {
  return (
    <div className="relative w-screen ">
      <div className="flex flex-col w-full  ">
        <Main />
        <div className="flex justify-center items-center  gap-[2vw] py-[44px] px-[6.5vw] w-full below-lg:flex-col">
          <LatestBlocks />
          <LatestTx />
        </div>
      </div>
    </div>
  );
};
