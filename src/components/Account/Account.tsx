import { Banana } from "lucide-react";
import { useDisconnect } from "wagmi";
import { Button } from "../ui";

export function Account() {
  const { disconnect } = useDisconnect();
  return (
    <div className="bg-yellow-400 p-2 rounded-md text-xl flex gap-2 justify-center items-center ">
      100 <Banana />
    </div>
  );
}
