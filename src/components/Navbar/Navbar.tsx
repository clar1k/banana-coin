import { Banana } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { Account, Button } from "@/components";
import { useBanana } from "@/hooks/useBanana";

export function Navbar() {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <nav className="flex w-full justify-between items-center h-16 text-3xl">
      <div className="flex justify-center items-center gap-4 ml-5">
        <div className="bg-yellow-400 p-2 rounded-md">
          <Banana className="w-9 h-9" />
        </div>
        {!account.isConnected && (
          <Link className="p-2" to="/">
            Connect
          </Link>
        )}
        <Link className="p-2" to="/mint">
          Mint
        </Link>
      </div>
      {account.isConnected && (
        <div className="flex gap-2 mr-2">
          <Account />
          <Button
            onClick={() => disconnect()}
            className="bg-yellow-400 hover:bg-yellow-400/75 flex gap-2 text-xl text-black py-6 justify-center items-center"
          >
            Disconnect
          </Button>
        </div>
      )}
    </nav>
  );
}
