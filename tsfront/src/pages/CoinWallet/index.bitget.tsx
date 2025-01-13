import CoinWalletTable from "components/CoinFutureTable/index.futureTable";
import { useBitgetWalletBalance } from "hooks/coinHooks/bitget/bitgetPriceHooks";

const BitgetFuture: React.FC = () => {
  const { walletBalance, positions, positionsError, walletBalanceError } =
    useBitgetWalletBalance("SHORT");
  if (positionsError || walletBalanceError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }
  if (!positions) {
    return <div>포지션 관련 정보 로딩 중...</div>;
  } else if (!walletBalance) {
    return <div>지갑 관련 정보 로딩 중...</div>;
  }
  return (
    <>
      <CoinWalletTable
        data={positions}
        walletBalance={walletBalance}
        name="BITGET"
        subname="short"
      />
    </>
  );
};

export default BitgetFuture;
