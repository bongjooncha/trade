import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./queryClient";

import Home from "./pages/Home";
import CoinWallet from "./pages/CoinWallet";

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet/coin" element={<CoinWallet />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
