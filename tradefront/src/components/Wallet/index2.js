import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { fetchAccountsNum, fetchAccount } from "api/Kiwoom_api";

const Wallet = () => {
  const [data, setData] = useState([]); // 전체 계좌 data
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accountData, setAccountData] = useState(null);

  const fetchData = async () => {
    try {
      const rawData = await fetchAccountsNum();
      setData(rawData);
      setSelectedAccount(rawData[0]); // 첫 번째 계좌를 기본 선택
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccountData = async (account) => {
    try {
      const data = await fetchAccount(account);
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      fetchAccountData(selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <div>
      <Tabs
        defaultActiveKey={data[0]}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {data.map((account, index) => (
          <Tab eventKey={account} title={account} key={index}>
            {accountData ? (
              <div>
                <h3>Account Data for {account}</h3>
                <pre>{JSON.stringify(accountData, null, 2)}</pre>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Wallet;
