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
  const { mintBananas, burn, contract, totalSupply } = useBanana();

  if (!isConnected) {
    return <Navigate to="/" />;
  }
  return (
    <section className="flex flex-col gap-4 items-center max-w-[500px] text-2xl mx-auto">
      <div className="flex gap-4 flex-grow w-full">
        <div className="flex flex-col gap-4 justify-center items-center flex-grow">
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
        </div>
        <div className="flex flex-col gap-4 justify-center items-center flex-grow">
          Burn
          <Input
            onChange={(event) => setNumber(Number(event.target.value))}
            type="number"
            placeholder="How much do you want to burn?"
          />
          <Button
            className="bg-cyan-950 hover:bg-cyan-900 w-full text-2xl py-6"
            onClick={() => burn(number)}
          >
            {!contract.isPending && "BURN $BANANA"}
            {contract.isPending && "BURNING"}
          </Button>
        </div>
      </div>
      <p>
        The supply is
        {totalSupply.data !== undefined &&
          " " + formatUnits(totalSupply.data as bigint, 18).split(".")[0]}
      </p>
    </section>
  );
}
