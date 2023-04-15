function Player(name, goesFirst) {
  let cells = [];

  return { name, cells, goesFirst };
}

const createGame = (() => {
  const playerOne = Player("Player One", true);
  const playerTwo = Player("Player Two", false);

  return {
    playerOne,
    playerTwo,
  };
})();

const cellClick = (function () {
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
  const cells = document.querySelectorAll(".cell");
  const currentPlayer = document.querySelector(".current-player");
  let count = 0;

  function addCells() {
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  }
  addCells();

  function playerTurn() {
    if (count % 2 === 0) {
      currentPlayer.textContent = `${createGame.playerOne.name} is up!`;
    } else {
      currentPlayer.textContent = `${createGame.playerTwo.name} is up!`;
    }
  }
  playerTurn();

  function checkWin(player, playerArray) {
    const isSubset = (playerArray, subsetArray) =>
      subsetArray.every((item) => playerArray.includes(item));

    function checkPlayerWin(combination) {
      const result = isSubset(playerArray, combination);
      if (result === true) {
        currentPlayer.textContent = `${player.name} has won!`;
        disableCells();
        return true;
      }
      return false;
    }

    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];
      if (checkPlayerWin(combination) === true) {
        return;
      }
    }

    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === "") {
        return;
      }
    }

    currentPlayer.textContent =
      "It's a tie! Hit the restart button to play again.";
  }

  function handleCellClick() {
    const cell = this;
    let attributeValue = cell.getAttribute("cell-id");
    if (count % 2 === 0 && cell.textContent === "") {
      cell.textContent = "X";
      count++;
      playerTurn();
      createGame.playerOne.cells.push(Number(attributeValue));
      checkWin(createGame.playerOne, createGame.playerOne.cells);
    } else if (playerTurn.count % 2 !== 0 && cell.textContent === "") {
      cell.textContent = "O";
      count++;
      playerTurn();
      createGame.playerTwo.cells.push(Number(attributeValue));
      checkWin(createGame.playerTwo, createGame.playerTwo.cells);
    }
  }

  const resetBtn = document.querySelector(".restart");

  function clear() {
    cells.forEach((cell) => (cell.textContent = ""));
    createGame.playerOne.cells = [];
    createGame.playerTwo.cells = [];
    count = 0;
    playerTurn();
    addCells();
  }

  resetBtn.addEventListener("click", function () {
    clear();
  });

  function disableCells() {
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
    });
  }
  function updatePlayerName(playerElement, newName) {
    const playerObject = playerElement.classList.contains("player-one")
      ? createGame.playerOne
      : createGame.playerTwo;
    playerObject.name = newName;
    const textNode = document.createTextNode(newName);
    playerElement.removeChild(playerElement.firstChild);
    playerElement.appendChild(textNode);
    playerTurn();
  }

  const changeName = (function () {
    const playerName = document.querySelectorAll(".player-name");

    playerName.forEach((player) => {
      player.addEventListener("dblclick", function () {
        const currentValue = player.textContent;
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = currentValue;

        inputElement.addEventListener("blur", function () {
          const newValue = inputElement.value;
          updatePlayerName(player, newValue);
        });
        if (player.firstChild) {
          player.removeChild(player.firstChild);
        }
        player.appendChild(inputElement);
        inputElement.focus();
      });
    });
  })();
})();
