import { useEffect, useState, useRef } from "react";
import { usePagination } from "../../hooks/usePagination";
import { SearchBar } from "../landing/searchBar";
import { useListFilter } from "../../hooks/useListFilter";
import LoadingCard from "../common/loadingCard";
import {
  getAccountCount,
  getAddresses,
  getLatestBlockNumber,
} from "../../api/api";
import { AddressTable } from "./addressTable";
export const AddressList = () => {
  const [accounts, setAccounts] = useState([]);
  const [totalAddresses, setLatestBlockNumber] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addressesCache = useRef({});

  const { renderFilterElement, filters, setSort, currentSort } =
    useListFilter();
  const { page, limit, renderPaginationButtons } =
    usePagination(totalAddresses);

  useEffect(() => {
    addressesCache.current = {}; // Clear the cache when filters change
  }, [filters]);

  useEffect(() => {
    const fetchBlocks = async () => {
      setLoading(true);
      setError(null);

      const maxPages = Math.ceil(totalAddresses / limit);
      const lastPageItemCount = totalAddresses % limit;

      if (
        addressesCache.current[page] &&
        (addressesCache.current[page].length === limit ||
          (page === maxPages &&
            addressesCache.current[page].length === lastPageItemCount))
      ) {
        setAccounts(addressesCache.current[page]);
        setLoading(false);
        return;
      }

      try {
        const data = await getAddresses(page, limit, filters);
        const totalAddressesIndexed = await getAccountCount();

        const filterMaxItems = data?.total;
        const defaultMaxItems = totalAddressesIndexed?.count;
        console.log("data", data);
        setLatestBlockNumber(filterMaxItems ? filterMaxItems : defaultMaxItems);
        setAccounts(data.accounts);
        addressesCache.current[page] = data.accounts;
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
        setError("Failed to fetch accounts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [page, limit, filters]);

  useEffect(() => {
    return () => {
      addressesCache.current = {};
    };
  }, []);

  return (
    <>
      <div className="px-[6.5vw] py-[73px] below-lg:py-[40px]">
        <SearchBar className="hidden below-lg:flex" />
        <div className="primary-box below-lg:mt-8">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col w-full gap-2 pb-4">
              <h1 className="headerExa w-full !text-2xl">Contracts</h1>
              <div className="text-link !no-underline">
                {totalAddresses ? (
                  `${totalAddresses} `
                ) : (
                  <LoadingCard className={"!h-[16px] !w-[30px]"} />
                )}
                Contracts found!
              </div>
            </div>
            <SearchBar className={"below-lg:hidden"} />
          </div>
          <AddressTable accounts={accounts} loading={loading} error={error} />
          {renderPaginationButtons()}
        </div>
      </div>
    </>
  );
};
