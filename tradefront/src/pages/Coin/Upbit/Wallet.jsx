import React from "react";
import { useQuery } from "@tanstack/react-query";

import Headnav from "components/Header/index";
import Wallet from "components/Wallet/index";

import { fetchAccount } from "api/Coin/Upbit/Upbit_api";

function UpWallet() {
  const { data: initialData } = useQuery({
    queryKey: ["walletData"],
    queryFn: fetchAccount,
  });

  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <Wallet data={initialData} />
    </div>
  );
}

export default UpWallet;
