import { createSignal } from "solid-js";

import styles from "./App.module.css";
import Mine from "./components/Mine";
import { mineMapTest, countDiamonds } from "./components/Mine/mine-map";

import { calculateMultiplier, formatRoundedDown } from "./components/gambling";

function App() {
  const [game, setGame] = createSignal({
    running: true,
  })
  const [mineMap, setMineMap] = createSignal(mineMapTest)
  const [multiplier, setMultiplier] = createSignal(0)
  let numDiamonds = 0;
  const onClick = (_i, _j) => {
    let newMineMap = [...mineMap()]
    newMineMap[_i][_j].clicked = true
    setMineMap(mineMap)
    if (mineMap()[_i][_j].value === 1){
      let updatedGame = {...game()}
      updatedGame.running = false
      console.log(updatedGame)
      setGame(updatedGame)
    }
    numDiamonds = countDiamonds(mineMap())
    setMultiplier(calculateMultiplier(4, numDiamonds, 5))
  }
  return (
    <main class={styles.App}>
      <div>
        <h3>{formatRoundedDown(multiplier())}x</h3>
      </div>
      <div id={styles.Mines}>
        {mineMap() &&
          mineMap().map((mineRow, _i) => {
            return mineRow.map((mineValue, _j) => {
              return <Mine value={mineValue.value} onClick = {() => {
                onClick(_i, _j)
                 
              }} gameRunning={game} />;
            });
          })}
      </div>
    </main>
  );
}

export default App;
