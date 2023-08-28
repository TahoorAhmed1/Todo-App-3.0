import { create } from "zustand";

export const userContactStore = create((set) => ({
  web3: "",
  contract: "",
  account: "",
  setContractStatus: (_web3, _contact, _account) =>
    set({ web3: _web3, contract: _contact, account: _account }),
}));
