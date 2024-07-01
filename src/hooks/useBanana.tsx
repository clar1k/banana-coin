import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { abi } from "@/abi";
import { sepolia } from "viem/chains";
import { AllowanceFormData } from "@/types";

const CONTRACT_ADRESS = "0xFaC1b9252d3cCb7BA0940571ca6f9C1DEDadb90C";

export const useBanana = () => {
  const account = useAccount();
  const balance = useBalance({
    address: account.address,
    token: CONTRACT_ADRESS,
    chainId: sepolia.id,
  });

  const contract = useWriteContract();
  const totalSupply = useReadContract({
    abi,
    address: CONTRACT_ADRESS,
    functionName: "totalSupply",
  });

  const mintBananas = (value: number) => {
    if (account.address === undefined) {
      return;
    }

    contract.writeContract({
      abi,
      address: CONTRACT_ADRESS,
      functionName: "mint",
      args: [account.address, value],
      chain: sepolia,
    });
  };

  const approveBananas = ({ wallet_address, value }: AllowanceFormData) => {
    contract.writeContract({
      abi,
      address: CONTRACT_ADRESS,
      functionName: "approve",
      args: [wallet_address, value],
      chain: sepolia,
    });
  };

  const burn = (value: number) => {
    contract.writeContract({
      abi,
      address: CONTRACT_ADRESS,
      chain: sepolia,
      functionName: "burn",
      args: [value],
    });
  };

  return {
    balance,
    mintBananas,
    approveBananas,
    burn,
    contract,
    totalSupply,
  };
};
