import { Link } from "react-router-dom";
import LoadingCard from "../common/loadingCard";
import { timeSince } from "../common/getTimePassed";
import { Copy } from "../common/copyToClipboard";

export const AddressTable = ({ accounts, loading, error }) => {
  const renderFields = () => {
    return (
      <>
        <h1 className="!hidden below-mobile:flex">Blocks</h1>
        <div className="flex px-[16px] pb-6 font-medium justify-between gap-0 below-lg:text-xs below-mobile:hidden text-header">
          <div className="w-[90%] below-lg:text-center flex items-center">
            <span>Address</span>
          </div>
          <div className="w-[10%] below-lg:text-center flex items-center">
            <span>Balance</span>
          </div>
        </div>
      </>
    );
  };
  // console.log(accounts);
  // console.log(new Date(Date.now()).toISOString());
  const renderBlockList = () => {
    const blockCards = accounts.map((account) => {
      return (
        <div
          key={Math.random()}
          className="below-mobile:!hidden !gap-0 card font-light !text-xs"
        >
          <div className="w-[90%] overflow-hidden text-ellipsis flex gap-1 items-center ">
            <Link
              to={`/address/${account.address}`}
              className="text-link underline-offset-2"
            >
              {` ${account.address.slice(
                0,
                7
              )}..........${account.address.slice(account.address.length - 9)}`}
            </Link>
            <Copy
              string={account.address}
              className="!mb-0 dark:text-textDark2"
            />
          </div>

          <div className=" w-[10%] button-orange !max-w-none ">
            {account.balance}
          </div>
        </div>
      );
    });

    return blockCards;
  };
  const renderMobileBlockList = () =>
    accounts.map((account) => (
      <Link
        to={`/address/${account.address}`}
        key={Math.random()}
        className="!hidden below-mobile:!flex card font-light !text-xs"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="text-white1">Contract:</div>
            <div className="underline text-pastelPink">
              {`${account.address.slice(0, 5)}..........${account.address.slice(
                account.address.length - 7
              )}`}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div>Total Fees :</div>
            <div className=" button-orange !max-w-none !px-1 !py-1 !text-[10px] !rounded-md">
              {account.balance} TST
            </div>
          </div>
        </div>
      </Link>
    ));

  const errorCard = () => {
    return (
      <div className="primary-box w-full flex items-center justify-center h-[350px]">
        Couldn't fetch accounts. Please try again later
      </div>
    );
  };

  const loadingSkeleton = () => {
    const itemCount = accounts?.length ? accounts.length : 10;

    return (
      <>
        {Array.from({ length: itemCount }, (_, index) => (
          <LoadingCard key={index} className={"h-[48px]"} />
        ))}
      </>
    );
  };
  return (
    <div className="flex flex-col w-full gap-4 secondary-box">
      {renderFields()}
      {error ? (
        errorCard()
      ) : (
        <div className="relative flex flex-col gap-[10px]">
          {loading ? (
            loadingSkeleton()
          ) : (
            <>
              {renderBlockList()}
              {renderMobileBlockList()}
            </>
          )}
        </div>
      )}
    </div>
  );
};
