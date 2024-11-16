import React from "react";
import styles from "../style/index.module.css";

import FutureTableHead from "./index.futureTableHead";
import FutureTableTotal from "./index.futureTableTotal";
import FutureTableBody from "./index.futureTableBody";

import { CoinFuturePosition } from "types/coin";

interface CoinWalletTableProps {
  data: CoinFuturePosition[];
  name: string;
}

const CoinWalletTable = ({ data, name }: CoinWalletTableProps) => {
  return (
    <div>
      <h4>
        {name} <span className={styles.small}>future</span>
      </h4>
      <table className={styles.WalletTable}>
        <FutureTableHead />
        <FutureTableBody data={data} />
      </table>
      <FutureTableTotal data={data} />
    </div>
  );
};

export default CoinWalletTable;
