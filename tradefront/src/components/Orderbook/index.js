import React, { useEffect, useState } from "react";

import { fetchAccount } from "api/Upbit/Upbit_api";

const Wallet = () => {
  const [data, setData] = useState(null);
  const [assetData, setAssetData] = useState([]);

  return <div className="orderBook"></div>;
};

export default Wallet;
