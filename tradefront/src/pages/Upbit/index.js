import React from "react";
import { Link } from "react-router-dom";
import Headnav from "components/Header/index";

function Upbit() {
  return (
    <div className="Home">
      <Headnav />
      <Link to="/upbit/trade">
        <button>거래</button>
      </Link>
      <Link to="/upbit/wallet">
        <button>보유자산</button>
      </Link>
    </div>
  );
}

export default Upbit;
