import { SearchBar } from "./searchBar";

export const Main = () => {
  return (
    <div className="relative h-[55vh]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-cover bg-center rounded-tl-[115px] below-mobile:rounded-tl-none rounded-br-[115px] main dark:border-bgLight1 dark:border"></div>

      <div className="h-full w-full flex flex-col items-center justify-center gap-10 relative z-10">
        <div className="flex flex-col h-full items-center w-full gap-[25%] pt-[40px]  justify-center">
          <div className="flex flex-col items-center justify-center gap-5 w-[70vw] max-w-[850px]">
            <h1 className="relative z-50 headerMega text-nowrap text-shadow below-lg:!text-5xl below-mobile:!text-3xl">
              Explore Privacy
            </h1>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 radial-grad rounded-tl-[115px] below-mobile:rounded-tl-none rounded-br-[115px] border border-pastelPurple dark:hidden"></div>
    </div>
  );
};
