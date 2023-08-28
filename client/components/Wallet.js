"use client";

import Web3 from "web3";
import ABI from "../ABI.json";
import { userContactStore } from "@/store/userContactStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Wallet() {
  const router = useRouter();
  const [setContractStatus] = userContactStore((state) => [
    state.setContractStatus,
  ]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const contractAddres = "0x7ca47e1b442493a67a61c2b382131489ba52f15c";
        const contract = new web3.eth.Contract(ABI, contractAddres);
        setContractStatus(web3, contract, account[0]);

        router.push("/viewAllTask");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={connectWallet}
          className="bg-slate-600/30 p-4 rounded text-slate-200"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default Wallet;
