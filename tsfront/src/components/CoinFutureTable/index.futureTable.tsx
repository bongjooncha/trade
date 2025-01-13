import styles from "./style/index.module.css";

import Header from "./Header/index";
import FutureTableHead from "./index.futureTableHead";
import FutureTotal from "./index.futureTotal";
import FutureTableBody from "./index.futureTableBody";

import { CoinFuturePositionProps, CoinWalletBalanceProps } from "types/coin";

interface CoinWalletTableProps {
  data: CoinFuturePositionProps[];
  walletBalance: CoinWalletBalanceProps;
  name: string;
  subname?: string;
}

const CoinWalletTable: React.FC<CoinWalletTableProps> = ({
  data,
  walletBalance,
  name,
  subname,
}) => {
  return (
    <div>
      <Header name={name} subname={subname} data={data} />
      <br />
      <div className={styles.WalletTable}>
        <FutureTableHead />
        <FutureTableBody data={data} />
      </div>
      <FutureTotal data={data} walletBalance={walletBalance} />
    </div>
  );
};

export default CoinWalletTable;
