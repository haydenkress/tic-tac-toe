function Player(name, goesFirst) {
  let cells = [];

  return { name, cells, goesFirst };
}

const playerName = document.querySelectorAll(".player-name");
const currentPlayer = document.querySelector(".current-player");

// double click to change name
playerName.forEach((player) => {
  player.addEventListener("dblclick", function () {
    const currentValue = player.textContent;
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = currentValue;

    inputElement.addEventListener("blur", function () {
      const newValue = inputElement.value;
      const textNode = document.createTextNode(newValue);
      player.removeChild(inputElement);
      player.appendChild(textNode);

      const playerObject = player.classList.contains("player-one")
        ? createGame.playerOne
        : createGame.playerTwo;

      function changeName(newName) {
        playerObject.name = newName;
      }

      changeName(newValue);
    });

    player.removeChild(player.firstChild);
    player.appendChild(inputElement);
    inputElement.focus();
  });
});

const createGame = (() => {
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

  const playerOne = Player("Player One", true);
  const playerTwo = Player("Player Two", false);
  let count = 0;

  return {
    winningCombinations,
    playerOne,
    playerTwo,
    count,
  };
})();

playerTurn();
function playerTurn() {
  if (createGame.count % 2 === 0) {
    currentPlayer.textContent = `${createGame.playerOne.name} is up!`;
  } else {
    currentPlayer.textContent = `${createGame.playerTwo.name} is up!`;
  }
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  let attributeValue = cell.getAttribute("cell-id");
  cell.addEventListener("click", function () {
    if (createGame.count % 2 === 0 && cell.textContent === "") {
      cell.textContent = "X";
      createGame.count++;
      playerTurn();
      createGame.playerOne.cells.push(Number(attributeValue));
      const win = checkWin(createGame.playerOne.cells);
      if (win === true) {
        currentPlayer.textContent = `${createGame.playerOne.name} has won!`;
      }
    } else if (playerTurn.count % 2 !== 0 && cell.textContent === "") {
      cell.textContent = "O";
      createGame.count++;
      playerTurn();
      createGame.playerTwo.cells.push(Number(attributeValue));
      const win = checkWin(createGame.playerTwo.cells);
      if (win === true) {
        currentPlayer.textContent = `${createGame.playerTwo.name} has won!`;
      }
    }
  });
});

function checkWin(parentArray) {
  const isSubset = (parentArray, subsetArray) =>
    subsetArray.every((item) => parentArray.includes(item));

  let isWinningCombination = false;

  createGame.winningCombinations.forEach((combination) => {
    const result = isSubset(parentArray, combination);
    if (result === true) {
      isWinningCombination = true;
    }
  });
  return isWinningCombination;
}

// reset button
const resetBtn = document.querySelector(".restart");
resetBtn.addEventListener("click", function () {
  clear();
});

function clear() {
  // clear board
  cells.forEach((cell) => (cell.textContent = ""));
  createGame.playerOne.cells = [];
  createGame.playerTwo.cells = [];
  createGame.count = 0;
  playerTurn();
}
