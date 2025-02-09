import { useState, useEffect, useRef } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import { BsSortUp, BsSortUpAlt } from "react-icons/bs";

export const useListFilter = () => {
  const [filters, setFilters] = useState({});

  const renderFilterElement = (type) => {
    const useOutsideClick = (ref, callback) => {
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            callback();
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref, callback]);
    };
    const filterLogo = (filterOpenState, filterOpenSetter) => {
      return (
        <MdOutlineFilterAlt
          onClick={() => {
            filterOpenSetter(!filterOpenState);
          }}
          className="button-orange min-h-[15px] min-w-[15px] !p-[2px] !rounded-sm ml-1 "
        />
      );
    };

    const renderTimeFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] w-[250px] primary-box !p-3 z-50 !rounded-md flex flex-col dark:backdrop-blur-[3px]`}
          >
            <div className="text-header text-[10px] pb-1 border-b border-purpleOp50 flex justify-between ">
              Duration
              <div
                onClick={() => {
                  setFilters({
                    ...filters,
                    startTimestamp: "",
                    endTimestamp: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex text-[8px] gap-1">
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 // Subtract 1 hour
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 1H
                </div>
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 // Subtract 24 hours
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 24H
                </div>
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * 7 // Subtract 7 days
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 7D
                </div>
              </div>
              <div className="flex text-[8px] gap-1">
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * 30 // Subtract 1 month (~30 days)
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 1M
                </div>
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * 30 * 3 // Subtract 3 months (~90 days)
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 3M
                </div>
                <div
                  onClick={() => {
                    setFilters({
                      ...filters,
                      endTimestamp: new Date(Date.now()).toISOString(),
                      startTimestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 24 * 30 * 6 // Subtract 6 months (~180 days)
                      ).toISOString(),
                    });
                    setIsFilterOpen(false);
                  }}
                  className="border px-2 rounded-full bg-bgDark3 border-pinkOp cursor-pointer duration-200 hover:bg-bgLight1 hover:border-purpleOp50"
                >
                  Last 6M
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

    const renderFeeFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [minFilter, setMinFilter] = useState("");
      const [maxFilter, setMaxFilter] = useState("");
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] -left-[100px] w-[250px] primary-box dark:backdrop-blur-[3px] !p-3 z-50 !rounded-md flex flex-col`}
          >
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between items-center">
              Min Fee Amount{" "}
              <div
                onClick={() => {
                  setMaxFilter("");
                  setMinFilter("");
                  setFilters({
                    ...filters,
                    maxTotalFees: "",
                    minTotalFees: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </h1>
            <input
              placeholder={minFilter}
              value={minFilter}
              onChange={(e) => {
                setMinFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between">
              Max Fee Amount
            </h1>
            <input
              placeholder={maxFilter}
              value={maxFilter}
              onChange={(e) => {
                setMaxFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <div className="flex w-full gap-2 pt-2">
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    maxTotalFees: maxFilter,
                    minTotalFees: minFilter,
                  });
                }}
                className="button-green dark:bg-pastelGreen !py-[2px] text-[10px] !font-normal"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="button-orange dark:bg-pastelOrange !py-[2px] text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    };
    const renderTxCountFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [minFilter, setMinFilter] = useState("");
      const [maxFilter, setMaxFilter] = useState("");
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] -left-[100px] w-[250px] primary-box dark:backdrop-blur-[3px] !p-3 z-50 !rounded-md flex flex-col`}
          >
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between items-center">
              Min Transaction Amount
              <div
                onClick={() => {
                  setMaxFilter("");
                  setMinFilter("");
                  setFilters({
                    ...filters,
                    maxTxCount: "",
                    minTxCount: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </h1>
            <input
              placeholder={minFilter}
              value={minFilter}
              onChange={(e) => {
                setMinFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between">
              Max Transaction Amount
            </h1>
            <input
              placeholder={maxFilter}
              value={maxFilter}
              onChange={(e) => {
                setMaxFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <div className="flex w-full gap-2 pt-2">
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    maxTxCount: maxFilter,
                    minTxCount: minFilter,
                  });
                }}
                className="button-green dark:bg-pastelGreen !py-[2px] text-[10px] !font-normal"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="button-orange !font-normal dark:bg-pastelOrange !py-[2px] text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    };
    const renderTxFeeFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [minFilter, setMinFilter] = useState("");
      const [maxFilter, setMaxFilter] = useState("");
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] -left-[100px] w-[250px] primary-box dark:backdrop-blur-[3px] !p-3 z-50 !rounded-md flex flex-col`}
          >
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between items-center">
              Min Fee Amount{" "}
              <div
                onClick={() => {
                  setMaxFilter("");
                  setMinFilter("");
                  setFilters({
                    ...filters,
                    maxTransactionFee: "",
                    minTransactionFee: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </h1>
            <input
              placeholder={minFilter}
              value={minFilter}
              onChange={(e) => {
                setMinFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between">
              Max Fee Amount
            </h1>
            <input
              placeholder={maxFilter}
              value={maxFilter}
              onChange={(e) => {
                setMaxFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <div className="flex w-full gap-2 pt-2">
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    maxTransactionFee: maxFilter,
                    minTransactionFee: minFilter,
                  });
                }}
                className="button-green dark:bg-pastelGreen !py-[2px] text-[10px] !font-normal"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="button-orange !font-normal dark:bg-pastelOrange !py-[2px] text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    };
    const renderIndexFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [minFilter, setMinFilter] = useState("");
      const [maxFilter, setMaxFilter] = useState("");
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] -left-[100px] w-[250px] primary-box dark:backdrop-blur-[3px] !p-3 z-50 !rounded-md flex flex-col`}
          >
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between items-center">
              Min Index
              <div
                onClick={() => {
                  setMaxFilter("");
                  setMinFilter("");
                  setFilters({
                    ...filters,
                    maxIndex: "",
                    minIndex: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </h1>
            <input
              placeholder={minFilter}
              value={minFilter}
              onChange={(e) => {
                setMinFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between">
              Max Index
            </h1>
            <input
              placeholder={maxFilter}
              value={maxFilter}
              onChange={(e) => {
                setMaxFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <div className="flex w-full gap-2 pt-2">
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    maxIndex: maxFilter,
                    minIndex: minFilter,
                  });
                }}
                className="button-green dark:bg-pastelGreen !py-[2px] text-[10px] !font-normal"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="button-orange  !font-normal dark:bg-pastelOrange !py-[2px] text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    };
    const renderBlockNumberFilter = () => {
      const [isFilterOpen, setIsFilterOpen] = useState(false);
      const [minFilter, setMinFilter] = useState("");
      const [maxFilter, setMaxFilter] = useState("");
      const filterRef = useRef(null);

      useOutsideClick(filterRef, () => setIsFilterOpen(false));
      return (
        <>
          {filterLogo(isFilterOpen, setIsFilterOpen)}
          <div
            ref={filterRef}
            className={`${
              !isFilterOpen && "!hidden"
            } absolute top-[25px] -left-[100px] w-[250px] primary-box dark:backdrop-blur-[3px] !p-3 z-50 !rounded-md flex flex-col`}
          >
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between items-center">
              Min Block Number
              <div
                onClick={() => {
                  setMaxFilter("");
                  setMinFilter("");
                  setFilters({
                    ...filters,
                    maxBlockNumber: "",
                    minBlockNumber: "",
                  });
                  setIsFilterOpen(false);
                }}
                className="text-link cursor-pointer dark:!text-pastelBlue !text-shadow-none"
              >
                Clear
              </div>
            </h1>
            <input
              placeholder={minFilter}
              value={minFilter}
              onChange={(e) => {
                setMinFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <h1 className="text-header font-light text-[10px] pb-1 border-b border-purpleOp50 flex justify-between">
              Max Block Number
            </h1>
            <input
              placeholder={maxFilter}
              value={maxFilter}
              onChange={(e) => {
                setMaxFilter(e.target.value);
              }}
              className="input !h-[20px] !text-[10px]"
            ></input>
            <div className="flex w-full gap-2 pt-2">
              <button
                onClick={() => {
                  setFilters({
                    ...filters,
                    maxBlockNumber: maxFilter,
                    minBlockNumber: minFilter,
                  });
                }}
                className="button-green dark:bg-pastelGreen !py-[2px] text-[10px] !font-normal"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                }}
                className="button-orange !font-normal dark:bg-pastelOrange !py-[2px] text-[10px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      );
    };
    return (
      <div className="relative ">
        {type == "timestamp" && renderTimeFilter()}
        {type == "fee" && renderFeeFilter()}
        {type == "txCount" && renderTxCountFilter()}
        {type == "txFee" && renderTxFeeFilter()}
        {type == "index" && renderIndexFilter()}
        {type == "blockNumber" && renderBlockNumberFilter()}
      </div>
    );
  };
  //sort types = timestamp, number,totalFees,blockNumber,index,transactionFee
  const setSort = (type) => {
    setFilters({
      ...filters,
      sort: type,
      order:
        filters?.sort === type
          ? filters.order === "desc"
            ? "asc"
            : "desc"
          : "desc",
    });
  };

  return {
    renderFilterElement,
    filters,
    setSort,
    currentSort: filters?.sort,
  };
};
