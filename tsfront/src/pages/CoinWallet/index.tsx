import React, { useEffect, useState } from "react";
import styles from "./style/index.module.css";

import {
  fetchBitgetPositions,
  fetchBitgetOpenOrders,
  fetchBitgetWalletBalance,
} from "api/Coin/Bitget/Bitget_api";

import Headnav from "components/Header";
import CoinWalletTable from "./FutureTable/index.futureTable";
import { CoinFuturePosition } from "types/coin";
function CoinWallet() {
  const [positions, setPositions] = useState<CoinFuturePosition[]>([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [walletBalance, setWalletBalance] = useState([]);

  useEffect(() => {
    fetchBitgetPositions().then((res) =>
      setPositions(res as CoinFuturePosition[])
    );
    // fetchBitgetOpenOrders().then((res) => setOpenOrders(res as any));
    fetchBitgetWalletBalance("future").then((res) =>
      setWalletBalance(res as any)
    );
  }, []);
  console.log(walletBalance);

  return (
    <div className={styles.Wallet}>
      <Headnav />
      <br />
      <br />
      <div className={styles.WalletBox}>
        <h2>코인</h2>
        <div className={styles.WalletBoxContent}>
          <CoinWalletTable data={positions} name="BITGET" />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default CoinWallet;
