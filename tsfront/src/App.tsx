import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import CoinWallet from "./pages/CoinWallet";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet/coin" element={<CoinWallet />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
