import React from "react";
import { Link } from "react-router-dom";
import Headnav from "components/Header/index";

function Kiwoom() {
  return (
    <div className="Home">
      <Headnav />
      <Link to="/kiwoom/trade">
        <button>거래</button>
      </Link>
      <Link to="/kiwoom/wallet">
        <button>보유자산</button>
      </Link>
    </div>
  );
}

export default Kiwoom;
