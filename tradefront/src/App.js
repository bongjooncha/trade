import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/main";
// Upbit
import Upbit from "pages/Upbit";
import UpWallet from "pages/Upbit/Wallet";
import UpTrade from "pages/Upbit/Trade";
// 키움
import Kiwoom from "pages/Kiwoom";
import KiWallet from "pages/Kiwoom/Wallet";

import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Upbit */}
          <Route path="/upbit" element={<Upbit />} />
          <Route path="/upbit/wallet" element={<UpWallet />} />
          <Route path="/upbit/trade" element={<UpTrade />} />
          {/* Kiwoom */}
          <Route path="/kiwoom" element={<Kiwoom />} />
          <Route path="/kiwoom/wallet" element={<KiWallet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
