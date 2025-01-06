import CoinWalletTable from "components/CoinFutureTable/index.futureTable";
import { FutureTableProps } from "types/coin";

const BitgetFuture: React.FC<FutureTableProps> = ({ data, walletBalance }) => {
  return (
    <>
      <CoinWalletTable
        data={data}
        walletBalance={walletBalance}
        name="BITGET"
      />
    </>
  );
};

export default BitgetFuture;
