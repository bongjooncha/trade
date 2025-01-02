import Headnav from "components/Header";
import ExchangeChart from "pages/Home/ExchangeChart";
import IndexChart from "pages/Home/IndexChart";

function Home() {
  return (
    <div className="Home">
      <Headnav />
      <br />
      <br />
      <br />
      <ExchangeChart />
      <br />
      <br />
      <br />
      <IndexChart />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home;
