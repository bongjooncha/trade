import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import CoinWallet from "./pages/CoinWallet";

const queryClient = new QueryClient();

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
      </QueryClientProvider>
    </div>
  );
}

export default App;
