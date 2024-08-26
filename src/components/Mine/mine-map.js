export const mineMapTest = [
  [
    { value: 0, clicked: false },
    { value: 1, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
  ],
  [
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 1, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
  ],
  [
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
  ],
  [
    { value: 0, clicked: false },
    { value: 1, clicked: false },
    { value: 0, clicked: false },
    { value: 1, clicked: false },
    { value: 0, clicked: false },
  ],
  [
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
    { value: 0, clicked: false },
  ],
];

export function countDiamonds(grid) {
  let zeroCount = 0;

  for (let row of grid) {
    for (let cell of row) {
      if (cell.value === 0 && cell.clicked === true) {
        zeroCount++;
      }
    }
  }

  return zeroCount;
}

export function generateMineMap(size, numberOfMines) {
  const map = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({ value: 0, clicked: false }))
  );

  let minesPlaced = 0;
  while (minesPlaced < numberOfMines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (map[row][col].value === 0) {
          map[row][col].value = 1;
          minesPlaced++;
      }
  }

  return map;
}