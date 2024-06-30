import { Button } from "@/components";
import { Input } from "@/components/ui/input";
import { useBanana } from "@/hooks/useBanana";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formatUnits } from "viem";
import { useAccount, deserialize } from "wagmi";

export function Mint() {
  const { isConnected } = useAccount();
  const [number, setNumber] = useState<number>(0);
  const navigate = useNavigate();
  const { mintBananas, contract, totalSupply } = useBanana();

  if (!isConnected) {
    return <Navigate to="/" />;
  }
  console.log(totalSupply.data);
  return (
    <section className="flex flex-col gap-4 items-center max-w-[500px] text-2xl mx-auto">
      Mint
      <Input
        onChange={(event) => setNumber(Number(event.target.value))}
        type="number"
        placeholder="How much do you want?"
      />
      <Button
        className="bg-cyan-950 hover:bg-cyan-900 w-full text-2xl py-6"
        onClick={() => mintBananas(number)}
      >
        {!contract.isPending && "MINT $BANANA"}
        {contract.isPending && "MINTING"}
      </Button>
      <p>
        The supply is{" "}
        {totalSupply.data !== undefined &&
          formatUnits(totalSupply.data as bigint, 18).split(".")[0]}
      </p>
    </section>
  );
}
