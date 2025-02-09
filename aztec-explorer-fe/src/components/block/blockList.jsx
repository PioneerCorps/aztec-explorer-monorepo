import { useEffect, useState, useRef } from "react";
import { getBlocks, getLatestBlockNumber } from "../../api/api";
import { usePagination } from "../../hooks/usePagination";
import { SearchBar } from "../landing/searchBar";
import { BlockTable } from "./blockTable";
import { useListFilter } from "../../hooks/useListFilter";
import LoadingCard from "../common/loadingCard";
export const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [latestBlockNumber, setLatestBlockNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const blocksCache = useRef({});

  const { renderFilterElement, filters, setSort, currentSort } =
    useListFilter();
  const { page, limit, renderPaginationButtons } =
    usePagination(latestBlockNumber);

  useEffect(() => {
    blocksCache.current = {}; // Clear the cache when filters change
  }, [filters]);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      setError(null);

      const maxPages = Math.ceil(latestBlockNumber / limit);
      const lastPageItemCount = latestBlockNumber % limit;

      if (
        blocksCache.current[page] &&
        (blocksCache.current[page].length === limit ||
          (page === maxPages &&
            blocksCache.current[page].length === lastPageItemCount))
      ) {
        setBlocks(blocksCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getBlocks(page, limit, filters);
        const latestBlockNum = await getLatestBlockNumber();
        console.log(data);
        const filterMaxItems = data?.total;
        const defaultMaxItems = latestBlockNum?.count;
        console.log("data", data);
        setLatestBlockNumber(filterMaxItems ? filterMaxItems : defaultMaxItems);
        setBlocks(data.blocks);
        blocksCache.current[page] = data.blocks;
      } catch (err) {
        console.error("Failed to fetch blocks:", err);
        setError("Failed to fetch blocks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => {
      blocksCache.current = {};
    };
  }, []);

  return (
    <>
      <div className="px-[6.5vw] py-[73px] below-lg:py-[40px]">
        <SearchBar className="hidden below-lg:flex" />
        <div className="primary-box below-lg:mt-8">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col w-full gap-2 pb-4">
              <h1 className="headerExa w-full !text-2xl">Blocks</h1>
              <div className="text-link !no-underline">
                {latestBlockNumber ? (
                  `${latestBlockNumber} `
                ) : (
                  <LoadingCard className={"!h-[16px] !w-[30px]"} />
                )}
                blocks found!
              </div>
            </div>
            <SearchBar className={"below-lg:hidden"} />
          </div>
          <BlockTable
            blocks={blocks}
            loading={loading}
            error={error}
            renderFilterElement={renderFilterElement}
            currentSort={currentSort}
            setSort={setSort}
          />
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};
