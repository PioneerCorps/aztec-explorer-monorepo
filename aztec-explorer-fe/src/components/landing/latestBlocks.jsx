import { Link } from "react-router-dom";
import { MdOutlineReceiptLong, MdContentCopy } from "react-icons/md";
import { ReactComponent as BlockIcon } from "../../assets/blockIcon.svg";
import { useEffect, useState } from "react";
import { getBlocks } from "../../api/api";
import { timeSince } from "../common/getTimePassed";
import LoadingCard from "../common/loadingCard";
import { Copy } from "../common/copyToClipboard";
import { LoadingSkeleton } from "../common/loadingSkeleton";
import { PiCubeFocus } from "react-icons/pi";

export const LatestBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("blocks", blocks);
  // Effect to fetch the last 10 blocks
  useEffect(() => {
    const fetchLastTenBlocks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBlocks(1, 10);

        setBlocks(data.blocks);
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLastTenBlocks();
  }, []);

  const blockData = () => {
    if (blocks.length <= 0)
      return (
        <div className="h-full flex flex-col gap-2">
          <LoadingSkeleton itemCount={10} className="!h-[56px]" />
        </div>
      );
    const blockCards = blocks.map((block) => {
      return (
        <div
          key={block.hash}
          className="card below-mobile:flex-col below-mobile:gap-3 below-mobile:py-5 below-mobile:items-start "
        >
          <div className="flex items-center gap-3 below-mobile:w-full below-mobile:border-b below-mobile:border-bgLight2 below-mobile:pb-3">
            <PiCubeFocus
              className="text-white1 dark:text-textDark1 h-7 w-7 min-w-7 min-h-7 below-mobile:hidden
            "
            />
            <div className="flex items-end justify-between gap-1 !min-w-[120px]  ">
              <div className="flex flex-col">
                <Link className="text-header" to={`/block/${block.hash}`}>
                  {block.number}
                </Link>
                <Link to={`/block/${block.hash}`} className="text-link">
                  {` ${block.hash.slice(0, 6)}.......${block.hash.slice(
                    block.hash.length - 4
                  )}`}
                </Link>
              </div>
              <Copy className="dark:text-textDark2" string={block.hash} />
            </div>
          </div>
          <div className="flex items-end justify-between gap-1 !min-w-[105px] below-mobile:w-full below-mobile:border-b below-mobile:border-bgLight2 below-mobile:pb-3 below-lg:justify-normal">
            <div className="flex flex-col font-light ">
              <div className="flex gap-1 text-header">Builder:</div>
              <div className="flex gap-1 ">
                <Link
                  to={`/address/${block.feeRecipient}`}
                  className="text-link"
                >{` ${block.feeRecipient.slice(
                  0,
                  5
                )}.......${block.feeRecipient.slice(
                  block.feeRecipient.length - 5
                )}`}</Link>
              </div>
            </div>
            <Copy className="dark:text-textDark2" string={block.feeRecipient} />
          </div>
          <Link
            to={`/block/${block.hash}`}
            className="button-green text-xs text-nowrap !min-w-[120px] px-4 py-2  "
          >
            {timeSince(block.timestamp)} ago
          </Link>
        </div>
      );
    });

    return (
      <div className="h-full gap-2 flex flex-col w-full">{blockCards}</div>
    );
  };
  return (
    <div className=" h-full primary-box w-1/2 below-lg:w-full !gap-4 shadow-box-shadow-sm ">
      <h1 className="headerExa pb-3 pl-[15px]">Latest Blocks</h1>
      {blockData()}
      <Link
        to={`/blocks`}
        className=" w-full !h-min !py-3 flex items-center justify-center secondary-box text-header text-sm font-light "
      >
        View All Blocks
      </Link>
    </div>
  );
};
