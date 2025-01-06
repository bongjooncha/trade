import CoinWalletTable from "components/CoinFutureTable/index.futureTable";
import { useBinanceWalletBalance } from "hooks/coinHooks/binance/binancePriceHooks";

const BinanceFuture: React.FC = () => {
  const {
    walletBalance,
    positions,
    prices,
    positionsError,
    walletBalanceError,
  } = useBinanceWalletBalance();

  if (positionsError || walletBalanceError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 로딩 상태 처리
  if (!positions && !walletBalance) {
    return <div>포지션 및 지갑 관련 정보 로딩 중...</div>;
  } else if (!positions) {
    return <div>포지션 관련 정보 로딩 중...</div>;
  } else if (!walletBalance) {
    return <div>지갑 관련 정보 로딩 중...</div>;
  }
  console.log(prices);
  return (
    <>
      <CoinWalletTable
        data={positions}
        walletBalance={walletBalance}
        name="BINANCE"
      />
    </>
  );
};

export default BinanceFuture;
