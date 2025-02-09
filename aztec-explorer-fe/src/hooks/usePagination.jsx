import { useState } from "react";

export const usePagination = (maxItems) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pageBounce, setPageBounce] = useState();
  const [limitBounce, setLimitBounce] = useState();

  const maxPages = Math.ceil(maxItems / limit);
  const renderPaginationButtons = () => {
    return (
      <div className="flex  pt-2 w-full justify-between text-xs font-light below-mobile:flex-col-reverse below-mobile:gap-3 below-mobile:justify-end below-mobile:items-end">
        <div className="flex gap-2">
          <div className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 outline  flex items-center justify-center text-white px-3 h-7 rounded-lg">
            Show rows :
          </div>
          <input
            placeholder={limit}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d+$/.test(value) && Number(value) > 0) {
                setLimitBounce(value);
              }
            }}
            onBlur={() => setLimit(Number(limitBounce))}
            className="bg-purpleOp50 dark:outline-bgLight1OP outline-2 outline-pastelPurple outline  flex items-center justify-center text-white px-3 h-7 rounded-lg w-12"
          ></input>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <div className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 dark:outline-borderOP outline  flex items-center justify-center text-white px-3 h-7 rounded-lg">
              Go To :
            </div>
            <input
              placeholder={page}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d+$/.test(value) && Number(value) > 0) {
                  setPageBounce(value <= maxPages ? value : maxPages);
                }
              }}
              onBlur={() => setPage(Number(pageBounce))}
              className="bg-purpleOp50 outline-2 outline-pastelPurple dark:outline-borderOP outline  flex items-center justify-center text-white px-3  rounded-lg w-12"
            ></input>
          </div>
          <div
            onClick={() => setPage(1)}
            className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 dark:outline-borderOP outline flex items-center justify-center text-white w-7 h-7 rounded-lg cursor-pointer"
          >{`<<`}</div>
          <div
            onClick={() => setPage(page - 1 <= 0 ? 1 : page - 1)}
            className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 outline flex items-center justify-center text-white w-7 h-7 rounded-lg cursor-pointer"
          >{`<`}</div>
          <div className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 dark:outline-borderOP outline flex items-center justify-center text-white px-2 h-7 rounded-lg">{`${page} of ${
            maxPages ? maxPages : ""
          }`}</div>
          <div
            onClick={() => {
              page + 1 <= maxPages ? setPage(page + 1) : null;
            }}
            className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 dark:outline-borderOP outline  flex items-center justify-center text-white w-7 h-7 rounded-lg cursor-pointer"
          >{`>`}</div>
          <div
            onClick={() => {
              setPage(maxPages);
            }}
            className="bg-pastelPurple dark:bg-bgLight1OP outline-2 outline-purpleOp50 dark:outline-borderOP outline  flex items-center justify-center text-white w-7 h-7 rounded-lg cursor-pointer"
          >{`>>`}</div>
        </div>
      </div>
    );
  };

  return { page, limit, renderPaginationButtons };
};
