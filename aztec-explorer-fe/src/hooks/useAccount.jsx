import { createPXEClient } from "@aztec/aztec.js";
import { ShieldswapWalletSdk } from "@shieldswap/wallet-sdk";
export const useAccount = () => {
  const pxe = createPXEClient("http://188.40.109.171:8080/");
  const wallet = new ShieldswapWalletSdk(
    { projectId: "8349c90bc1f1b2d1fed8eb90ef2b81f4" },
    pxe
  );
  const openModal = async () => {
    console.log("click");
    // const wallet = new ShieldswapWalletSdk(() => pxe.wait());
    const account = await wallet.connect();
    console.log("connected wallet", account.getAddress().toString());
    console.log(account);
  };

  return { openModal };
};
