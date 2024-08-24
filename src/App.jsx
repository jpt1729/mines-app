import { createSignal } from "solid-js";

import styles from "./App.module.css";
import Mine from "./components/Mine";
import { mineMapTest } from "./components/Mine/mine-map";

function App() {
  const [mineMap, setMineMap] = createSignal(mineMapTest)
  return (
    <main class={styles.App}>
      <div id={styles.Mines}>
        {mineMap() &&
          mineMap().map((mineRow, _i) => {
            return mineRow.map((mineValue, _j) => {
              return <Mine value={mineValue.value} mineMap={mineMap} updateMineMap={setMineMap} position={[_i, _j]} key={_i} />;
            });
          })}
      </div>
    </main>
  );
}

export default App;
