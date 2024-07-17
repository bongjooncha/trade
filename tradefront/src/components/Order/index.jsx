import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderBuy from "./index.buy";
import style from "./style/style.module.css";

const Order = ({ market, wallet }) => {
  return (
    <div className={style.orderParent}>
      <Tabs
        defaultActiveKey="buy"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="buy" title="매수">
          <OrderBuy market={market} wallet={wallet} />
        </Tab>
        <Tab eventKey="sell" title="매도">
          Tab content for Profile
        </Tab>
        <Tab eventKey="auto" title="자동">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
};

export default Order;
