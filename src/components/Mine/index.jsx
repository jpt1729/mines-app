import { createSignal } from "solid-js";

import styles from "./Mine.module.css";

export default function Mine({ value, onClick, gameRunning }) {
  const [clicked, setClicked] = createSignal(false);
  return (
    <>
      <button
        class={styles.mine}
        onClick={() => {
          if (gameRunning().running) {
            setClicked(true);
            onClick();
          }
        }}
        disabled={clicked()}
      >
        <div
          class={styles.innerMine}
          style={{ transform: clicked() && "rotateY(180deg)" }}
        >
          <div class={styles.frontMine}></div>
          <div class={styles.backMine}>
            {value === 0 && clicked() ? <span>💎</span> : <span>💣</span>}
          </div>
        </div>
      </button>
    </>
  );
}
