import React from "react";
import styles from "./style/index.module.css";

import Headnav from "components/Header";
import CoinWalletTable from "./FutureTable/index.futureTable";

import useCoinWallet from "hooks/useCoinWallet";

function CoinWallet() {
  const {
    bitgetPositions,
    walletBitgetBalance,
    binancePositions,
    walletBinanceBalance,
  } = useCoinWallet();

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
          <CoinWalletTable
            data={bitgetPositions}
            walletBalance={walletBitgetBalance}
            name="BITGET (main)"
          />
        </div>
        <br />
        <div className={styles.line} />
        <br />
        <br />
        <div className={styles.WalletBoxContent}>
          <CoinWalletTable
            data={binancePositions}
            walletBalance={walletBinanceBalance}
            name="BINANCE"
          />
        </div>
        <br />
      </div>
      <br />
      <br />
    </div>
  );
}

export default CoinWallet;
