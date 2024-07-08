import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderBuy from "./index.buy";
import style from "./style/style.module.css";
import { fetchPrice } from "api/Upbit/Upbit_api";

const Order = ({ market }) => {
  const [coinData, setCoinData] = useState(null);
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log(market);
      const data = await fetchPrice(market);
      console.log(data);
      if (data) {
        setCoinData(data[0]);
      }
    };
    getData();
  }, [market]);

  return (
    <div className={style.orderParent}>
      <Tabs
        defaultActiveKey="buy"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="buy" title="매수">
          {coinData ? <OrderBuy coin={coinData} /> : <div>Loading...</div>}
        </Tab>
        <Tab eventKey="sell" title="매도">
          Tab content for Profile
        </Tab>
        <Tab eventKey="auto" title="자동">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
};

export default Order;
