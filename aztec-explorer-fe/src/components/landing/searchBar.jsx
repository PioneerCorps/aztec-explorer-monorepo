import { useEffect, useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { getSearchResults } from "../../api/api";
import makeBlockie from "ethereum-blockies-base64";
import { Link } from "react-router-dom";
import { LoadingSkeleton } from "../common/loadingSkeleton";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";

export const SearchBar = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [emptyResult, setEmptyResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onceLoaded, setOnceLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const searchResultsRef = useRef(null);
  console.log(searchResult);
  useEffect(() => {
    if (!inputValue || Number(inputValue == 0)) return;

    const debounceTimer = setTimeout(() => {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(false);
        setEmptyResult(false);
        try {
          const searchRes = await getSearchResults(inputValue.toLowerCase());
          setSearchResult(searchRes);
          setOnceLoaded(true);
          if (
            !searchRes ||
            (!searchRes.accounts.length &&
              !searchRes.blocks.length &&
              !searchRes.transactions.length)
          ) {
            setEmptyResult(true);
          }
        } catch (err) {
          console.error("Failed to fetch search results:", err);
          setError(true);
          setOnceLoaded(true);
        } finally {
          setLoading(false);
          setIsVisible(true);
        }
      };

      fetchSearchResults();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSearchResults = () => {
    // console.log(searchResult);

    const renderResults = (type) => {
      if (!searchResult || searchResult?.[type]?.length === 0) {
        return null;
      }
      const resultTag = searchResult[type];
      const limitResults = resultTag.slice(0, 2);

      const routingList = {
        blocks: "block",
        transactions: "tx",
        accounts: "address",
      };

      return (
        <div className={`flex flex-col gap-3`}>
          <h1 className="text-header text-white text-xs border-b pb-1 border-borderOP dark:border-white1 ">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </h1>
          {limitResults.map((result, index) => {
            if (!result) return null;
            console.log(result);
            return (
              <Link
                onClick={() => isVisible(false)}
                to={`/${routingList[type]}/${
                  result?.hash ? result?.hash : result?.address
                }`}
                key={index}
                className="text-white font-extralight rounded-md text-sm p-2 flex items-center gap-4 cursor-pointer hover:bg-white2 hover:bg-opacity-15 overflow-hidden"
              >
                <img
                  className="h-8 rounded-full"
                  src={makeBlockie(
                    result?.address ? result.address : result.hash
                  )}
                />
                <p className="text-header">
                  {result?.address ? result.address : result.hash}
                </p>
              </Link>
            );
          })}
        </div>
      );
    };

    const emptyCard = () => {
      return (
        <div className="font-light  text-white1">
          Search does not match any blocks, transactions or contracts!
        </div>
      );
    };
    return (
      <div
        ref={searchResultsRef}
        className={`absolute top-[44px] max-h-[300px] w-full secondary-box rounded-xl p-4 overflow-y-scroll flex flex-col gap-2  backdrop-blur-lg ${
          (!inputValue || !onceLoaded || !isVisible) && "!hidden"
        }`}
      >
        {emptyResult || error ? (
          <>{emptyCard()}</>
        ) : loading ? (
          <LoadingSkeleton itemCount={5} />
        ) : (
          <>
            {renderResults("accounts")}
            {renderResults("blocks")}
            {renderResults("transactions")}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex justify-start relative w-full z-50 shadow-box-shadow-sm dark:shadow-box-shadow-md rounded-xl  ${className}`}
    >
      <div className="input !w-min !px-3 !rounded-r-none !border-r-0 flex items-center justify-center z-20">
        <MdSearch className="h-6 w-6 fill-bgLight1OP" />
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by Address, Tx Hash, Block, Token, Contract, Domain"
        className="relative input !border-l-0 !rounded-l-none tracking-wide z-10 -ml-[1px]"
        onFocus={() => setIsVisible(true)}
      />
      {loading ? (
        <CgSpinner className="absolute right-[10px] top-[4px] text-textDark1 h-[25px] w-[25px] z-30 animate-spin" />
      ) : (
        <MdOutlineClose
          onClick={() => setInputValue("")}
          className="absolute right-[10px] top-[7px] text-textDark1 h-[20px] w-[20px] z-30 hover:bg-bgLight1OP rounded-full duration-200"
        />
      )}
      {renderSearchResults()}
    </div>
  );
};
