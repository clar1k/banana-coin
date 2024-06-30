import { Banana } from "lucide-react";
import { useDisconnect } from "wagmi";
import { Button } from "@/components";
import { useBanana } from "@/hooks/useBanana";

export function Account() {
  const { disconnect } = useDisconnect();
  const { balance } = useBanana();
  console.log(balance.data);
  return (
    <div className="bg-yellow-400 p-2 rounded-md text-xl flex gap-2 justify-center items-center ">
      {balance.data?.formatted} <Banana />
    </div>
  );
}
