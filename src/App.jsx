import { createSignal } from "solid-js";

import styles from "./App.module.css";
import Mine from "./components/Mine";
import { mineMapTest, countDiamonds, generateMineMap } from "./components/Mine/mine-map";

import { calculateMultiplier, formatRoundedDown } from "./components/gambling";

import Stake from './assets/Stake_logo.svg'

function App() {
  const [game, setGame] = createSignal({
    size: 5,
    mines: 4,
    running: true,
    win: false,
  });
  const [mineMap, setMineMap] = createSignal(mineMapTest);
  const [multiplier, setMultiplier] = createSignal(
    calculateMultiplier(4, 0, 5)
  );
  const [locked, setLocked] = createSignal(false);
  let numDiamonds = 0;
  const resetGame = () => {
    setMineMap(generateMineMap(game().size, game().mines))
    setMultiplier(calculateMultiplier(game().mines, 0, game().size))
    setGame({
      running: true,
      win: false,
    })
  };
  const onClick = async (_i, _j) => {
    setLocked(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLocked(false);

    let newMineMap = [...mineMap()];
    newMineMap[_i][_j].clicked = true;
    setMineMap(mineMap);
    if (mineMap()[_i][_j].value === 1) {
      let updatedGame = { ...game() };
      updatedGame.running = false;
      updatedGame.win = false;
      setGame(updatedGame);
    }
    numDiamonds = countDiamonds(mineMap());
    setMultiplier(calculateMultiplier(4, numDiamonds, 5));
    if (numDiamonds === 5 ** 2 - 4) {
      let updatedGame = { ...game() };
      updatedGame.running = false;
      updatedGame.win = true;
      setGame(updatedGame);
    }
  };
  return (
    <>
      <header>
        <h1>WELCOME TO JOHN'S MINES!</h1>
        <div style={{display:'flex', "justify-content": 'space-between'}}>
          <div style={{display:'flex'}}>
            <p>
              The goal of this project is to serve as training for people who want to play mines on
            </p>
            <img src={Stake} width={100}/>
          </div>
          <form onSubmit={(e) => {e.preventDefault()}}>
            <label>Customize Game</label><br/>
            <input type='number' placeholder="Map Size" value={5}/><br/>
            <input type='number' placeholder="Number of mines" value={4}/><br/>
            <input type='submit'/>
          </form>
        </div>
      </header>
      <main class={styles.App}>
        <div>
          <h3>{formatRoundedDown(multiplier())}x</h3>
        </div>
        <div id={styles.Mines}>
          {mineMap() &&
            mineMap().map((mineRow, _i) => {
              return mineRow.map((mineValue, _j) => {
                return (
                  <Mine
                    value={mineValue.value}
                    onClick={() => {
                      onClick(_i, _j);
                    }}
                    gameRunning={game}
                    locked={locked}
                  />
                );
              });
            })}
        </div>
        <button onClick={() => {
          setGame({...game(), running: false, win: true})
        }}>Cash Out</button>
      </main>
      {!game().running && (
        <div id={styles.modalBg}>
          {!game().win && (
            <div id={styles.modal}>
              <h1>Oof you clicked a 💣</h1>
              <button onClick={() => {resetGame();}}>
                <span>Play again?</span>
              </button>
            </div>
          )}
          {game().win && (
            <div id={styles.modal}>
              <h1>You won!</h1>
              <p>Bet amount: $500</p>
              <p>Amount won: ${formatRoundedDown(500*multiplier())}</p>
              <button onClick={() => {resetGame();}}>
                <span>Play again?</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
