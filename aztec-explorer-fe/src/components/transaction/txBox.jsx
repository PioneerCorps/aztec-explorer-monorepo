import { SearchBar } from "../landing/searchBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBlockByNumber, getTransactionByHash } from "../../api/api";
import LoadingCard from "../common/loadingCard";
import { Copy } from "../common/copyToClipboard";
export const TxBox = () => {
  const { hash } = useParams();

  const [block, setBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(transaction);
  const fieldLabels = {
    blockNumber: "Included in Block",
    hash: "Transaction Hash",
    revertCode: "Status",
    index: "Index",
    transactionFee: "Transaction Fee",
    noteHashes: "Note Hashes",
    l2ToL1Msgs: "L2 to L1 Messages",
    publicDataWrites: "Public Data Writes",
    nullifiers: "Nullifiers",
    uneencryptedLogs: "Unencrypted Logs",
  };

  useEffect(() => {
    if (!hash) return;
    const fetchTx = async () => {
      setLoading(true);
      setError(null);
      try {
        const tx = await getTransactionByHash(hash);
        const block = await getBlockByNumber(tx.blockNumber);

        setBlock(block);
        setTransaction(tx);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, [hash]);

  const renderTransactionInfo = () => {
    if (!hash)
      return (
        <div className="h-full flex justify-center items-center">
          Transaction Not Found :(
        </div>
      );

    const infoFields = Object.keys(fieldLabels).map((field) => {
      if (field === "nullifiers") {
        return (
          <div
            className="flex gap-24 justify-between text-sm below-lg:flex-col below-lg:gap-3 below-lg:border-b below-lg:border-bgLight1 below-lg:pb-2 "
            key={field}
          >
            <div className="min-w-[250px] font-light text-nowrap text-header ">
              {fieldLabels[field]}:
            </div>
            <div className="w-full">
              <textarea
                className="w-[70%] h-32 p-3 font-light border border-bgLight1 bg-bgLight1OP rounded-lg resize-y leading-7 text-dark font-monospace focus:outline-none below-lg:w-full "
                value={
                  transaction[field]
                    ? transaction[field]
                        .split(",")
                        .map((item, index) => `${index + 1}: ${item.trim()}`)
                        .join("\n")
                    : ""
                }
                readOnly
              />
            </div>
          </div>
        );
      }

      if (field === "uneencryptedLogs") {
        console.log(transaction[field]);
        const logObj = JSON.parse(
          transaction[field] ? transaction[field] : "{}"
        );

        const formattedLogs = JSON.stringify(logObj, null, 2);

        return (
          <div
            className="flex gap-24 justify-between text-sm below-lg:flex-col below-lg:gap-3 below-lg:border-b below-lg:border-bgLight1 below-lg:pb-2"
            key={field}
          >
            <div className="min-w-[250px] font-light text-nowrap text-header">
              {fieldLabels[field]}:
            </div>
            <div className="w-full">
              <textarea
                className="w-[70%] h-32 p-3 font-light border border-bgLight1 bg-bgLight1OP rounded-lg resize-y leading-7 text-dark font-monospace focus:outline-none below-lg:w-full below-lg:gap-3"
                value={formattedLogs}
                readOnly
              />
            </div>
          </div>
        );
      }
      if (field === "publicDataWrites") {
        return (
          <div
            className="flex gap-24 justify-between text-sm below-lg:flex-col below-lg:gap-3 below-lg:border-b below-lg:border-bgLight1 below-lg:pb-2"
            key={field}
          >
            <div className="min-w-[250px] font-light text-nowrap text-header">
              {fieldLabels[field]}:
            </div>
            <div className="w-full">
              <textarea
                className="w-[70%] h-32 p-3 font-light border border-bgLight1 bg-bgLight1OP rounded-lg resize-y leading-7 text-white1 text-dark font-monospace focus:outline-none below-lg:w-full overflow-y-scroll "
                value={
                  transaction[field]
                    ? transaction[field]
                        .split(",")
                        .map((item, index) => `${index + 1}: ${item.trim()}`)
                        .join("\n")
                    : ""
                }
                readOnly
              />
            </div>
          </div>
        );
      }

      return (
        <div
          className="flex gap-24 justify-between text-sm below-lg:flex-col below-lg:gap-2 below-lg:border-b below-lg:border-bgLight1 below-lg:pb-2 "
          key={field}
        >
          <div className="min-w-[250px] font-light text-nowrap text-header">
            {fieldLabels[field]}:
          </div>
          <div className="w-full overflow-hidden text-ellipsis font-extralight below-mobile:break-all">
            {loading ? (
              <LoadingCard className={"!h-[20px] !w-1/4 "} />
            ) : (
              <div className="flex items-center gap-2 text-dark">
                {transaction[field] !== "" ? transaction[field] : "None"}
                {field == "hash" ? (
                  <Copy
                    className="!mb-0 !text-white1"
                    string={transaction[field]}
                  />
                ) : null}
              </div>
            )}
          </div>
        </div>
      );
    });

    return (
      <div className="flex flex-col">
        <div className="secondary-box !gap-8">{infoFields}</div>
      </div>
    );
  };

  return (
    <>
      <SearchBar className="hidden below-lg:flex" />
      <div className="primary-box below-lg:mt-8">
        <div className="flex justify-between items-center pb-4">
          <h1 className="headerExa w-full">Transaction Details</h1>

          <SearchBar className={"below-lg:hidden"} />
        </div>
        {renderTransactionInfo()}
      </div>
    </>
  );
};
