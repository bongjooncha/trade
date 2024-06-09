import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/index";
import Upbit from "pages/Upbit";
import UpWallet from "pages/Upbit/Wallet";
import UpTrade from "pages/Upbit/Trade";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upbit" element={<Upbit />} />
          <Route path="/upbit/wallet" element={<UpWallet />} />
          <Route path="/upbit/trade" element={<UpTrade />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
