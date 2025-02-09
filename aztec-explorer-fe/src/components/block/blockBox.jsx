import { SearchBar } from "../landing/searchBar";
import { Link, useParams } from "react-router-dom";
import { MdOutlineAccessTime } from "react-icons/md";

import { getBlockByHash, getTransactionsByBlockNumber } from "../../api/api";
import { useEffect, useState } from "react";
import { formatDate, timeSince } from "../common/getTimePassed";
import { TxTable } from "../transaction/txTable";
import { Copy } from "../common/copyToClipboard";
import LoadingCard from "../common/loadingCard";
import { useListFilter } from "../../hooks/useListFilter";

export const BlockBox = () => {
  const [block, setBlock] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { hash } = useParams();
  console.log(block);

  const { renderFilterElement, filters, setSort, currentSort } =
    useListFilter();

  const fieldLabels = {
    number: "Block Number",
    hash: "Block Hash",
    timestamp: "Timestamp",
    txCount: "Transaction Count",
    size: "Block Size",
    feeRecipient: "Fee Recipient",
    coinbaseAccount: "Coinbase Account",
    totalFees: "Total Fees",
    feePerDaGas: "Fee Per DA Gas",
    feePerL2Gas: "Fee Per L2 Gas",
  };

  const renderBlockInfo = () => {
    if (!hash)
      return (
        <div className="h-full flex justify-center items-center">
          Block Not Found :(
        </div>
      );

    const infoFields = Object.keys(fieldLabels).map((field) => {
      return (
        <div className=" flex below-lg:flex-col below-lg:gap-2 gap-24 justify-between text-sm below-lg:border-b below-lg:border-bgLight1 below-lg:dark:border-bgLight1OP below-lg:pb-2 ">
          <div className="min-w-[250px] below-lg:min-w-[110px] font-light text-nowrap  text-header">
            {fieldLabels[field]}:
          </div>
          <div className="w-full overflow-hidden text-ellipsis font-extralight flex items-center gap-2  below-mobile:break-all text-dark">
            {!block[field] ? (
              <LoadingCard className={"!h-[20px] !w-1/4"} />
            ) : field == "timestamp" ? (
              <>
                <MdOutlineAccessTime />
                {timeSince(block[field])} ({formatDate(block[field])})
              </>
            ) : (
              block[field]
            )}
            {field == "hash" && !loading ? (
              <Copy
                className="!mb-0 text-white1 dark:text-textDark2"
                string={block[field]}
              />
            ) : null}
          </div>
        </div>
      );
    });

    return (
      <div className="flex flex-col">
        <div className="secondary-box !gap-8 below-lg:!gap-5 ">
          {infoFields}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!hash) return;
    const fetchBlock = async () => {
      setLoading(true);
      setError(null);
      try {
        const blockInfo = await getBlockByHash(hash);
        const transactions = await getTransactionsByBlockNumber(
          blockInfo.number
        );

        setBlock(blockInfo);
        setTransactions(transactions);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlock();
  }, [hash]);

  return (
    <>
      <SearchBar className="hidden below-lg:flex" />
      <div className="primary-box below-lg:mt-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-full gap-2 pb-4">
            <h1 className="headerExa w-full !text-2xl">{`Block #${
              block.number ? block.number : ""
            }`}</h1>
            <div className="text-link">{`${
              block.txCount ? block.txCount : ""
            } Transactions found`}</div>
          </div>
          <SearchBar className={"below-lg:hidden"} />
        </div>
        {renderBlockInfo()}
        <TxTable
          transactions={transactions}
          loading={loading}
          error={error}
          renderFilterElement={renderFilterElement}
          currentSort={currentSort}
          setSort={setSort}
        />
      </div>
    </>
  );
};
