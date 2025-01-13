import React from "react";
import styles from "./style/index.module.css";

import Headnav from "components/Header";
import BitgetFuture from "./index.bitget";
import BinanceFuture from "./index.binance";

function CoinWallet() {
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
        <div className={styles.WalletBoxContent}>{/* <BitgetFuture /> */}</div>
        <br />
        <div className={styles.line} />
        <br />
        <br />
        <div className={styles.WalletBoxContent}>
          <BinanceFuture />
        </div>
        <br />
      </div>
      <br />
      <br />
    </div>
  );
}

export default CoinWallet;
