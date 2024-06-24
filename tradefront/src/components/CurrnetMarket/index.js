import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { fetchTickers, fetchPrice } from "api/Upbit/Upbit_api";
import styles from "./style/currentMarket.module.css";

function CurrentMarket({ current_markets, onMarketChange }) {
  const markets = current_markets;
  const [selectedMarket, setSelectedMarket] = useState("KRW");
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadTickers = async () => {
      const response = await fetchTickers(selectedMarket);
      const priceDatas = await fetchPrice(response);
      setData(priceDatas);
    };

    loadTickers();
    // 1초마다 데이터를 불러오기 위한 interval 설정
    const interval = setInterval(loadTickers, 5000);

    // 컴포넌트가 언마운트될 때 interval을 정리
    return () => clearInterval(interval);
  }, [selectedMarket]);

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
  };

  const handleCoinClick = (market, ticker) => {
    onMarketChange(`${market}-${ticker}`);
  };

  return (
    <div id={styles.currentMarket}>
      <Tabs
        id="market-tabs"
        activeKey={selectedMarket}
        onSelect={handleMarketChange}
        className={`mb-3 ${styles.tabContainer}`}
      >
        {markets.map((market) => (
          <Tab
            key={market}
            eventKey={market}
            title={market}
            id={styles.box}
            className={styles.tabContent}
          >
            {data ? (
              data.map((coin) => (
                <div
                  key={coin.market}
                  id={styles.box}
                  onClick={() =>
                    handleCoinClick(
                      selectedMarket,
                      coin.market.replace(`${selectedMarket}-`, "")
                    )
                  }
                  style={{ cursor: "pointer" }} // 마우스를 포인터로 변경
                >
                  <p>
                    {coin.market}: {coin.trade_price}
                    <br />
                    {coin.signed_change_rate * 100}
                  </p>
                </div>
              ))
            ) : (
              <p>데이터 로딩 중...</p>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default CurrentMarket;
