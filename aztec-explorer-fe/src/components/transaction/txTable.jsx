import { Link } from "react-router-dom";
import LoadingCard from "../common/loadingCard";
import { timeSince } from "../common/getTimePassed";
import { Copy } from "../common/copyToClipboard";

export const TxTable = ({
  transactions,
  loading,
  error,
  loaderLength = 10,
  renderFilterElement,
  setSort,
  currentSort,
}) => {
  console.log(transactions);
  const renderFields = () => (
    <>
      <h1 className="!hidden below-mobile:flex">Transactions</h1>
      <div className="flex px-[16px] pb-2 font-medium justify-between gap-5 text-sm text-header below-lg:text-xs below-mobile:hidden ">
        <div className="w-[22%] elow-lg:text-center flex items-center">
          <span>Hash</span>
        </div>
        <div className="w-[10%] elow-lg:text-center flex items-center">
          <span
            onClick={() => {
              setSort("blockNumber");
            }}
            className={`${
              currentSort == "blockNumber" && "underline"
            } cursor-pointer hover:brightness-95`}
          >
            Block
          </span>
          {renderFilterElement("blockNumber")}
        </div>
        <div className="w-[18%] elow-lg:text-center flex items-center">
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
        <div className="w-[10%] elow-lg:text-center flex items-center">
          <span
            onClick={() => {
              // setSort("index");
            }}
            className={`${
              currentSort == "transactionFee" && "underline"
            } cursor-pointer hover:brightness-95`}
          >
            Index
          </span>
          {renderFilterElement("index")}
        </div>
        <div className="w-[22%] elow-lg:text-center flex items-center">
          <span>Nullifier</span>
        </div>
        <div className="w-[10%] elow-lg:text-center flex items-center">
          <span
            onClick={() => {
              setSort("transactionFee");
            }}
            className={`${
              currentSort == "transactionFee" && "underline"
            } cursor-pointer hover:brightness-95`}
          >
            Fee
          </span>
          {renderFilterElement("txFee")}
        </div>
      </div>
    </>
  );

  const renderTxList = () =>
    transactions.map((tx) => (
      <div
        key={Math.random()}
        className="below-mobile:!hidden card font-light !text-xs"
      >
        <div className="w-[22%] text-link overflow-hidden text-ellipsis">
          <Link className="text-link" to={`/tx/${tx.hash}`}>
            {` ${tx.hash.slice(0, 7)}..........${tx.hash.slice(
              tx.hash.length - 9
            )}`}
          </Link>
          <Copy className="dark:text-textDark2" string={tx.hash} />
        </div>
        <div className="w-[10%]">
          <Link
            to={`/tx/${tx.hash}`}
            className="button-purple w-min px-5 py-2 h-full"
          >
            {tx.blockNumber}
          </Link>
        </div>
        <div className="w-[18%] text-dark">{`${timeSince(tx.timestamp)}`}</div>
        <div className="w-[10%] text-dark">{tx.index}</div>
        <div className="w-[22%] text-link overflow-hidden text-ellipsis">
          {` ${tx.hash.slice(0, 5)}..........${tx.hash.slice(
            tx.hash.length - 7
          )}`}
        </div>
        <div className="w-[10%] button-orange !max-w-none text-[10px]">
          {tx.transactionFee}
        </div>
      </div>
    ));

  const renderMobileTxList = () =>
    transactions.map((tx) => (
      <Link
        to={`/tx/${tx.hash}`}
        key={Math.random()}
        className="!hidden below-mobile:!flex card font-light !text-xs !py-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="text-header">Tx # :</div>
            <div className="text-link">{`${tx.hash.slice(
              0,
              5
            )}..........${tx.hash.slice(tx.hash.length - 7)}`}</div>
          </div>
          <div className="flex gap-2">
            <div className="text-header">Age :</div>
            <div className="text-dark">{`${timeSince(tx.timestamp)}`}</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-header">Fee :</div>
            <div className=" button-orange !max-w-none !px-1 !py-1 !text-[10px] !rounded-md">
              {tx.transactionFee} TST
            </div>
          </div>
        </div>
      </Link>
    ));
  const errorCard = () => {
    return (
      <div className="primary-box w-full flex items-center justify-center h-[350px]">
        Couldn't fetch transactions. Please try again later
      </div>
    );
  };

  const loadingSkeleton = () => {
    const itemCount = transactions?.length ? transactions.length : loaderLength;

    return (
      <>
        {Array.from({ length: itemCount }, (_, index) => (
          <LoadingCard key={index} className={"h-[48px]"} />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col w-full  secondary-box ">
      {renderFields()}

      {error ? (
        errorCard()
      ) : (
        <div className="relative flex flex-col gap-[10px]">
          {loading ? (
            loadingSkeleton()
          ) : (
            <>
              {renderTxList()}
              {renderMobileTxList()}
            </>
          )}
        </div>
      )}
    </div>
  );
};
