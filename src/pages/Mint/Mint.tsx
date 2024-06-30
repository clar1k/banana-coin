import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export function Mint() {
  const { isConnected, isConnecting } = useAccount();
  const navigate = useNavigate();
  if (!isConnected) {
    return <Navigate to="/" />;
  }

  return <div>Mint</div>;
}
