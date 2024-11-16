import React, { useEffect, useState } from "react";
import styles from "./style/index.module.css";

import {
  fetchBitgetPositions,
  fetchBitgetOpenOrders,
  fetchBitgetWalletBalance,
} from "api/Coin/Bitget/Bitget_api";

import {
  fetchBinanceFuturePositions,
  fetchBinanceWalletBalance,
  fetchBinanceFutureTs,
} from "api/Coin/Binance/Binance_api";

import Headnav from "components/Header";
import CoinWalletTable from "./FutureTable/index.futureTable";
import { CoinFuturePosition } from "types/coin";
function CoinWallet() {
  // BITGET
  const [bitgetPositions, setBitgetPositions] = useState<CoinFuturePosition[]>(
    []
  );
  const [walletBitgetBalance, setWalletBitgetBalance] = useState([]);

  // BINANCE
  const [binancePositions, setBinancePositions] = useState<
    CoinFuturePosition[]
  >([]);
  const [walletBinanceBalance, setWalletBinanceBalance] = useState([]);
  const [openBinanceTs, setOpenBinanceTs] = useState([]);

  useEffect(() => {
    // BITGET
    fetchBitgetPositions().then((res) =>
      setBitgetPositions(res as CoinFuturePosition[])
    );
    fetchBitgetWalletBalance("future").then((res) =>
      setWalletBitgetBalance(res as any)
    );

    // BINANCE
    fetchBinanceFuturePositions().then((res) =>
      setBinancePositions(res as CoinFuturePosition[])
    );
    fetchBinanceWalletBalance("future").then((res) =>
      setWalletBinanceBalance(res as any)
    );
  }, []);

  return (
    <div className={styles.Wallet}>
      <Headnav />
      <br />
      <br />
      <div className={styles.WalletBox}>
        <div className={styles.Header}>
          <h2>코인</h2>
        </div>
        <br />
        <div className={styles.WalletBoxContent}>
          <CoinWalletTable data={bitgetPositions} name="BITGET" />
        </div>
        <br />
        <div className={styles.line} />
        <br />
        <br />
        <div className={styles.WalletBoxContent}>
          <CoinWalletTable data={binancePositions} name="BINANCE" />
        </div>
        <br />
      </div>
      <br />
      <br />
    </div>
  );
}

export default CoinWallet;
