import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
// Upbit
import UpWallet from "pages/Coin/Upbit/Wallet";
import UpTrade from "pages/Coin/Upbit/Trade";
// Bitget
import BitgetTrade from "pages/Coin/Bitget/Trade";
// 키움
import Kiwoom from "pages/Kiwoom";
import KiWallet from "pages/Kiwoom/Wallet";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Upbit */}
          <Route path="/upbit" element={<UpTrade />} />
          <Route path="/upbit/wallet" element={<UpWallet />} />
          {/* Bitget */}
          <Route path="/bitget" element={<BitgetTrade />} />

          {/* --------- */}
          {/* Kiwoom */}
          <Route path="/kiwoom" element={<Kiwoom />} />
          <Route path="/kiwoom/wallet" element={<KiWallet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
