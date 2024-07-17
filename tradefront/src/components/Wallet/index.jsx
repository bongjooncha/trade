import { HighPieChart } from "./index.chart";
import { addCommas } from "utils/NumberChange";

/* data(ex) = [{
    "name": "BTC",
    "balance": 0.00339458,
    "avg_buy_price": 87850000,
    "unit_currency": "KRW",
    "current_price": 88461000,
    "total_price": 300287.94138
}]*/
const Wallet = ({ data }) => {
  if (!data) return null;
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>보유 자산 포트폴리오</h1>
        {data ? (
          <>
            <div>
              {data.map(
                (item) =>
                  item.name === "KRW" && (
                    <div>보유 KRW {addCommas(item.balance)} KRW</div>
                  )
              )}
              <div>
                총 보유 자산{"  "}
                {addCommas(
                  data.reduce((acc, item) => acc + item.total_price, 0)
                )}{" "}
                KRW
              </div>
              <HighPieChart data={data} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <h2>보유 자산 목록</h2>
              {data.map(
                (item, index) =>
                  item.name !== "KRW" && (
                    <div
                      key={index}
                      style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                      }}
                    >
                      <p>
                        <strong>자산:</strong> {item.name}
                      </p>
                      <p>
                        <strong>보유량:</strong> {addCommas(item.balance)}
                        {item.name}
                      </p>
                      <p>
                        <strong>평균 매수가:</strong>{" "}
                        {addCommas(item.avg_buy_price)} {item.unit_currency}
                      </p>
                      <p>
                        <strong>총 가치:</strong> {addCommas(item.total_price)}{" "}
                        {item.unit_currency}
                      </p>
                    </div>
                  )
              )}
            </div>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </header>
    </div>
  );
};

export default Wallet;
