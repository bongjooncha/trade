import React, { useState } from "react";

const Accordion = ({ tickers }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {tickers.map((ticker, index) => (
        <div key={ticker}>
          <div onClick={() => handleClick(index)}>
            <h3>{ticker}</h3>
          </div>
          {activeIndex === index && (
            <div>
              <p>Details for {ticker}</p>
              {/* Add more details if needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
