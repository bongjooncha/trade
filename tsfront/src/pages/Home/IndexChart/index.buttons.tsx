import styles from "./style/index.module.css";
import Buttons from "components/IndexChart/index.button";
import { useIndex } from "hooks/indexHooks/index";
import { US, WestAsia, EU, SouthEastAsia, Item } from "./index.utils";

const IndexButtons = () => {
  const { selectedIndex, handleSelectedIndex } = useIndex();
  return (
    <div className={styles.buttonContainer}>
      <h5>US</h5>
      <div className={styles.button}>
        <Buttons
          elements={US}
          selected={selectedIndex}
          handleCheckboxChange={handleSelectedIndex}
        />
      </div>
      <br />
      <h5>WEST ASIA</h5>
      <div className={styles.button}>
        <Buttons
          elements={WestAsia}
          selected={selectedIndex}
          handleCheckboxChange={handleSelectedIndex}
        />
      </div>
      <br />
      <h5>EU</h5>
      <div className={styles.button}>
        <Buttons
          elements={EU}
          selected={selectedIndex}
          handleCheckboxChange={handleSelectedIndex}
        />
      </div>
      <br />
      <h5>SOUTH EAST ASIA</h5>
      <div className={styles.button}>
        <Buttons
          elements={SouthEastAsia}
          selected={selectedIndex}
          handleCheckboxChange={handleSelectedIndex}
        />
      </div>
      <br />
      <h5>ITEMS</h5>
      <div className={styles.button}>
        <Buttons
          elements={Item}
          selected={selectedIndex}
          handleCheckboxChange={handleSelectedIndex}
        />
      </div>
    </div>
  );
};

export default IndexButtons;
