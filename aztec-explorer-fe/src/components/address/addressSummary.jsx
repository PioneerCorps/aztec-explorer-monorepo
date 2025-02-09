import { useEffect } from "react";
import { getAddresses, getAccountCount, getSearchResults } from "../../api/api";
import LoadingCard from "../common/loadingCard";
import { Copy } from "../common/copyToClipboard";
export const AddressSummary = ({ addressInfo }) => {
  const fieldLabels = {
    address: "Address",
    balance: "Balance",
    contractClassID: "Class ID",
    deployer: "Deployer",
    version: "Version",
  };

  return (
    <div className="flex flex-col  ">
      <div className="secondary-box !gap-8 below-lg:!gap-5  ">
        {Object.keys(fieldLabels).map((field) => {
          return (
            <div className="flex below-lg:flex-col below-lg:gap-2 gap-24 justify-between text-sm below-lg:border-b below-lg:border-bgLight1 below-lg:dark:border-bgLight1OP below-lg:pb-2  ">
              <div className="min-w-[250px] below-lg:min-w-[110px] font-light text-nowrap  text-header">
                {fieldLabels[field]}
              </div>

              <div className="w-full overflow-hidden text-ellipsis font-extralight flex items-center gap-2  below-mobile:break-all text-dark">
                {!addressInfo[field] ? (
                  <LoadingCard className={"!h-[20px] !w-1/4"} />
                ) : (
                  addressInfo[field]
                )}
                {field == "address" ? (
                  <Copy
                    className="!mb-0 text-white1 dark:text-textDark2"
                    string={addressInfo[field]}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
