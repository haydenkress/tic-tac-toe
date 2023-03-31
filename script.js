function Player(name) {
  let cells = [];
  return { name, cells };
}

const currentPlayer = document.querySelector(".current-player");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const playerOne = Player("PlayerOne");
const playerTwo = Player("PlayerTwo");

const cells = document.querySelectorAll(".cell");
let count = 0;

cells.forEach((cell) => {
  let attributeValue = cell.getAttribute("cell-id");
  cell.addEventListener("click", function () {
    if (count % 2 === 0 && cell.textContent === "") {
      cell.textContent = "X";
      count++;
      playerOne.cells.push(Number(attributeValue));
      const win = checkWin(playerOne.cells);
      if (win === true) {
        console.log("player one has won");
      }
    } else if (count % 2 !== 0 && cell.textContent === "") {
      cell.textContent = "O";
      count++;
      playerTwo.cells.push(Number(attributeValue));
      const win = checkWin(playerTwo.cells);
      if (win === true) {
        console.log("player two has won");
      }
    }
  });
});

function checkWin(parentArray) {
  const isSubset = (parentArray, subsetArray) =>
    subsetArray.every((item) => parentArray.includes(item));

  let isWinningCombination = false;

  winningCombinations.forEach((combination) => {
    const result = isSubset(parentArray, combination);
    if (result === true) {
      isWinningCombination = true;
    }
  });

  return isWinningCombination;
}
const resetBtn = document.querySelector(".restart");
resetBtn.addEventListener("click", function () {
  clear();
});

function clear() {
  // clear board
  cells.forEach((cell) => (cell.textContent = ""));
  playerOne.cells = [];
  playerTwo.cells = [];
  count = 0;
}
