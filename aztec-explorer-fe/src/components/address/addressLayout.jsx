import { AddressSummary } from "./addressSummary";
import { SearchBar } from "../landing/searchBar";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAddress } from "../../api/api";
import { AddressTabs } from "./addressTabs";
export const Address = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { hash } = useParams();

  // const tabs = ["public", "private", "contract", "read", "write"];
  const tabs = ["bytecode", "read", "write"];
  const location = useLocation();
  const navigate = useNavigate();

  const [tab, setTab] = useState("bytecode");

  useEffect(() => {
    const currentHash = location.hash.replace("#", "");

    if (!currentHash) {
      navigate("#bytecode", { replace: true });
      setTab("bytecode");
    } else if (tabs.includes(currentHash)) {
      setTab(currentHash);
    } else {
      navigate("#bytecode", { replace: true });
      setTab("bytecode");
    }
  }, [location, navigate, tabs]);

  useEffect(() => {
    if (!hash) return;
    const fetchAddress = async () => {
      setLoading(true);
      setError(null);
      try {
        const addressInfo = await getAddress(hash);

        setAddress(addressInfo);
      } catch (err) {
        console.error("Failed to fetch address:", err);
        setError("Failed to fetch address. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [hash]);
  console.log(address);
  const renderTabs = () => {
    return (
      <div className="flex gap-3 py-4">
        {tabs.map((tabName) => (
          <div
            key={tabName}
            className={`button-orange py-2 text-xs cursor-pointer ${
              tab === tabName ? "active !bg-pastelOrange saturate-[0.8]" : ""
            }`}
            onClick={() => navigate(`#${tabName}`)}
          >
            {tabName}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="px-[6.5vw] py-[73px]">
      <div className="primary-box">
        <div className="flex items-center">
          <div className="flex-col gap-2 w-full pb-6">
            <div className="headerExa w-full !text-2xl">Address</div>
            {/* <div className="text-link ">{address.address}</div> */}
          </div>
          <SearchBar />
        </div>
        <AddressSummary addressInfo={address} />
        {renderTabs()}
        <AddressTabs tab={tab} addressInfo={address} />
      </div>
    </div>
  );
};
