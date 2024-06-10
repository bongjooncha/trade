import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { fetchTickers, fetchPrice } from "api/index";

function MarketButton() {
  const markets = ["KRW", "BTC", "USDT"];
  const [selectedMarket, setSelectedMarket] = useState("KRW");
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const loadTickers = async () => {
      const response = await fetchTickers(selectedMarket);
      const priceDatas = await fetchPrice(response);
      setPrices(priceDatas);
    };

    // 초기 데이터를 불러오기 위해 한 번 실행
    loadTickers();

    // 1초마다 데이터를 불러오기 위한 interval 설정
    const interval = setInterval(loadTickers, 1000);

    // 컴포넌트가 언마운트될 때 interval을 정리
    return () => clearInterval(interval);
  }, [selectedMarket]);

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
  };

  return (
    <div>
      <Tabs
        id="market-tabs"
        activeKey={selectedMarket}
        onSelect={handleMarketChange}
        className="mb-3"
      >
        {markets.map((market) => (
          <Tab key={market} eventKey={market} title={market} id="market_info">
            {Object.entries(prices)
              .sort(([, price1], [, price2]) => price2 - price1)
              .map(([ticker, price]) => (
                <div key={ticker}>
                  {price >= 0 ? (
                    <div>
                      {ticker.replace(`${selectedMarket}-`, "")}:
                      {Number(price).toLocaleString()}
                    </div>
                  ) : (
                    <>
                      {ticker.replace(`${selectedMarket}-`, "")}: {price}
                    </>
                  )}
                </div>
              ))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default MarketButton;
