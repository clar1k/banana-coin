import React, { useEffect } from "react";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { Button } from "@/components";
import { Banana } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { walletInfo } = useWalletInfo();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const result = useBalance({
    address,
    unit: "ether",
  });
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  useEffect(() => {
    if (isConnected) {
      return navigate("/mint");
    }
  }, [isConnected]);
  return (
    <section className="text-3xl my-0 mx-auto max-w-[500px] flex flex-col justify-center items-center gap-4">
      {!isConnected && (
        <>
          Connect your wallet to proceed
          <Button
            className="bg-yellow-400 hover:bg-yellow-400/75 flex gap-2 text-xl py-6 justify-center items-center"
            onClick={() => open()}
          >
            {!isConnecting && "Connect wallet"}
            {isConnecting && "Connecting"}
            <Banana className={cn("w-6 h-6", isConnecting && "animate-spin")} />
          </Button>
        </>
      )}
    </section>
  );
}
