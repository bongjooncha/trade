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

    loadTickers();
  }, [selectedMarket]);

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
  };

  return (
    <Tabs
      id="market-tabs"
      activeKey={selectedMarket}
      onSelect={handleMarketChange}
      className="mb-3"
    >
      {markets.map((market) => (
        <Tab key={market} eventKey={market} title={market}>
          {Object.entries(prices)
            .sort(([, price1], [, price2]) => price2 - price1)
            .map(([ticker, price]) => (
              <div key={ticker}>
                {price >= 0 ? (
                  <>
                    {ticker.replace(`${selectedMarket}-`, "")}:
                    {Number(price).toLocaleString()}
                  </>
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
  );
}

export default MarketButton;
