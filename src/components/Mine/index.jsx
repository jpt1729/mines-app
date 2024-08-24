import { createSignal } from "solid-js";

import styles from "./Mine.module.css";

export default function Mine({ value, mineMap, updateMineMap, position }) {
  const [clicked, setClicked] = createSignal(false)
  return (
    <>
        <button
            class={styles.mine}
            onClick={() => {
                setClicked(true);
                let newMineMap = [...mineMap()]
                newMineMap[position[0]][position[1]].clicked = true
                updateMineMap(mineMap)
                console.log(mineMap())
            }}
            disabled={clicked()}
            >
            <div
                class={styles.innerMine}
                style={{ transform: clicked() && "rotateY(180deg)" }}
            >
                <div class={styles.frontMine}></div>
                <div class={styles.backMine}>
                    {value === 0 ? <span>💎</span> : <span>💣</span>}
                </div>
            </div>
        </button>

    </>
  );
}
