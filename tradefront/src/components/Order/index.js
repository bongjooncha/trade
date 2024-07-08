import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderBuy from "./index.buy";
import style from "./style/style.module.css";
import { fetchAccount, fetchPrice } from "api/Upbit/Upbit_api";

const Order = ({ market }) => {
  const [coinData, setCoinData] = useState(null);
  const [assetData, setAssetData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPrice(market);
      if (data) {
        setCoinData(data[0]);
      }
    };
    getData();
  }, []);

  return (
    <div className={style.orderParent}>
      <Tabs
        defaultActiveKey="buy"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="buy" title="매수">
          <OrderBuy coin={coinData} />
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
