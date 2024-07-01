import { Banana } from "lucide-react";
import { useDisconnect } from "wagmi";
import { Button } from "@/components";
import { useBanana } from "@/hooks/useBanana";
import { formatUnits } from "viem";

export function Account() {
  const { disconnect } = useDisconnect();
  const { balance } = useBanana();
  return (
    <div className="bg-yellow-400 p-2 rounded-md text-xl flex gap-2 justify-center items-center ">
      {balance.data?.value !== undefined && formatUnits(balance.data.value, 18)}{" "}
      <Banana />
    </div>
  );
}
