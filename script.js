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
      checkWin(playerOne.cells);
    } else if (count % 2 !== 0 && cell.textContent === "") {
      cell.textContent = "O";
      count++;
      playerTwo.cells.push(Number(attributeValue));
      checkWin(playerTwo.cells);
    }
  });
});

function checkWin(parentArray) {
  const isSubset = (parentArray, subsetArray) =>
    subsetArray.every((item) => parentArray.includes(item));

  winningCombinations.forEach((combination) => {
    const result = isSubset(parentArray, combination);
    if (result === true) {
      console.log("hello");
    }
  });
}
