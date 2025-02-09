import { Link } from "react-router-dom";
import LoadingCard from "../common/loadingCard";
import { timeSince } from "../common/getTimePassed";
import { Copy } from "../common/copyToClipboard";

export const BlockTable = ({
  blocks,
  loading,
  error,
  renderFilterElement,
  setSort,
  currentSort,
}) => {
  const renderFields = () => {
    return (
      <>
        <h1 className="!hidden below-mobile:flex">Blocks</h1>
        <div className="flex px-[16px] pb-6 font-medium justify-between gap-0 below-lg:text-xs below-mobile:hidden text-header">
          <div className="w-[21%] below-lg:text-center flex items-center">
            <span>Hash</span>
          </div>
          <div className="w-[15%] below-lg:text-center flex items-center">
            <span
              className={`${
                currentSort == "number" && "underline"
              } cursor-pointer hover:brightness-95`}
              onClick={() => {
                setSort("number");
              }}
            >
              Number
            </span>
          </div>
          <div className="w-[18%] below-lg:text-center flex items-center ">
            <span
              onClick={() => {
                setSort("timestamp");
              }}
              className={`${
                currentSort == "timestamp" && "underline"
              } cursor-pointer hover:brightness-95`}
            >
              Age
            </span>
            {renderFilterElement("timestamp")}
          </div>
          <div className="w-[10%] below-lg:text-center flex items-center ">
            <span
              onClick={() => {
                setSort("txCount");
              }}
              className={`${
                currentSort == "txCount" && "underline"
              } cursor-pointer hover:brightness-95`}
            >
              Tx Count
            </span>
            {renderFilterElement("txCount")}
          </div>
          <div className="w-[18%] below-lg:text-center flex items-center">
            <span>Fee Recipient</span>
          </div>
          <div className="w-[10%] below-lg:text-center flex items-center  ">
            <span
              onClick={() => {
                setSort("totalFees");
              }}
              className={`${
                currentSort == "totalFees" && "underline"
              } cursor-pointer hover:brightness-95`}
            >
              Fee
            </span>{" "}
            {renderFilterElement("fee")}
          </div>
        </div>
      </>
    );
  };
  // console.log(blocks);
  // console.log(new Date(Date.now()).toISOString());
  const renderBlockList = () => {
    const blockCards = blocks.map((block) => {
      return (
        <div
          key={Math.random()}
          className="  below-mobile:!hidden !gap-0 card font-light !text-xs"
        >
          <div className="w-[21%] overflow-hidden text-ellipsis flex gap-1 items-center ">
            <Link
              to={`/block/${block.hash}`}
              className="text-link underline-offset-2"
            >
              {` ${block.hash.slice(0, 7)}..........${block.hash.slice(
                block.hash.length - 9
              )}`}
            </Link>
            <Copy string={block.hash} className="!mb-0 dark:text-textDark2" />
          </div>
          <div className="w-[15%]">
            <div className="button-purple w-min px-5 py-2 h-full text-header">
              {block.number}
            </div>
          </div>
          <div className="w-[18%] text-dark">{timeSince(block.timestamp)}</div>
          <div className="w-[10%] text-dark">{block.txCount}</div>
          <div className="w-[18%] text-link overflow-hidden text-ellipsis">
            {` ${block.feeRecipient.slice(
              0,
              7
            )}..........${block.feeRecipient.slice(
              block.feeRecipient.length - 6
            )}`}
          </div>
          <div className="w-[10%] button-orange !max-w-none text-[10px] ">
            {block.totalFees}
          </div>
        </div>
      );
    });

    return blockCards;
  };
  const renderMobileBlockList = () =>
    blocks.map((block) => (
      <Link
        to={`/block/${block.hash}`}
        key={Math.random()}
        className="!hidden below-mobile:!flex card font-light !text-xs"
      >
        <div className="flex flex-col gap-2">
          <div className="button-purple w-min px-3 py-2 h-full text-nowrap">
            Block : {block.number}
          </div>

          <div className="flex gap-2">
            <div className="text-header">Block # :</div>
            <div className="text-link">
              {`${block.hash.slice(0, 5)}..........${block.hash.slice(
                block.hash.length - 7
              )}`}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="text-header">Age :</div>
            <div className="text-dark">{`${timeSince(block.timestamp)}`}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-header">Total Fees :</div>
            <div className=" button-orange !max-w-none !px-1 !py-1 !text-[10px] !rounded-md">
              {block.totalFees} TST
            </div>
          </div>
        </div>
      </Link>
    ));

  const errorCard = () => {
    return (
      <div className="primary-box w-full flex items-center justify-center h-[350px]">
        Couldn't fetch blocks. Please try again later
      </div>
    );
  };

  const loadingSkeleton = () => {
    const itemCount = blocks?.length ? blocks.length : 10;

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
