import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { abi } from "@/abi";
import { sepolia } from "viem/chains";

export const useBanana = () => {
  const account = useAccount();
  const balance = useBalance({
    address: account.address,
    token: "0x4430C5C5e246890aC8eaaD3Fd45B5432827B6DAB",
    chainId: sepolia.id,
  });
  const contract = useWriteContract();

  const totalSupply = useReadContract({
    abi,
    address: "0x4430C5C5e246890aC8eaaD3Fd45B5432827B6DAB",
    functionName: "totalSupply",
  });

  const mintBananas = (value: number) => {
    if (account.address === undefined) {
      return;
    }
    contract.writeContract({
      abi,
      address: "0x4430C5C5e246890aC8eaaD3Fd45B5432827B6DAB",
      functionName: "mint",
      args: [account.address, value],
      chain: sepolia,
    });
  };

  return {
    balance,
    mintBananas,
    contract,
    totalSupply,
  };
};
