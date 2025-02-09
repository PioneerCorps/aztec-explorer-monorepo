import { Contract } from "@aztec/aztec.js";
import { createPXEClient } from "@aztec/aztec.js";

export const useInteractContract = (contractInfo) => {
  const pxeUrl = "http://188.40.109.171:8080/";

  const readContract = async () => {
    const pxe = await createPXEClient(pxeUrl);
    const contract = await pxe.getContractArtifact(
      "0x29022b95dec76fd6851092ed6dc917c38f5d5a35576e4e750b220f9ac23a66cd"
    );
    console.log(contract);
    const { l1ChainId } = await pxe.getNodeInfo();
    console.log(`Connected to chain ${l1ChainId}`);
    console.log("UserAccounts:", await pxe.getRegisteredAccounts());
  };

  return { readContract };
};
