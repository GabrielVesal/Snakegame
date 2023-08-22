const gameContainer = document.querySelector(".game-container");
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = placeFoodInsideGrid();
let gameInterval;
let foodCollectedCount = 0;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

function startGame() {
  document.getElementById("startButton").style.display = "none";
  gameInterval = setInterval(main, 150);
}

function restartGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  food = placeFoodInsideGrid();
  foodCollectedCount = 0;
  document.getElementById("gameOver").style.display = "none";
  startGame();
}

function main() {
  if (updateSnakePosition()) {
    drawGame();
    checkFoodCollision();
  }
}

function updateSnakePosition() {
    const newHead = { ...snake[0] };
    newHead.x += direction.x;
    newHead.y += direction.y;

    if (
        newHead.x < 0 ||
        newHead.x >= 20 ||
        newHead.y < 0 ||
        newHead.y >= 20 ||
        snake.slice(1).some(segment => newHead.x === segment.x && newHead.y === segment.y)
    ) {
        document.getElementById("gameOver").style.display = "block";
        clearInterval(gameInterval);
        return false; // A cobra colidiu.
    }

    snake.unshift(newHead);
    snake.pop();
    return true; // A cobra não colidiu.
}

function main() {
  if (updateSnakePosition()) {
    drawGame();
    checkGameOver();
    checkFoodCollision();
  }
}



function checkGameOver() {
    if (
        snake[0].x < 0 ||
        snake[0].x > 19 ||  // Deve ser 19, não 20
        snake[0].y < 0 ||
        snake[0].y > 19 ||  // Deve ser 19, não 20
        snake.slice(1).some(segment => snake[0].x === segment.x && snake[0].y === segment.y)
    ) {
        document.getElementById("gameOver").style.display = "block";
        clearInterval(gameInterval);
    }
}


function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    foodCollectedCount++;
    if (foodCollectedCount % 5 === 0) {
      food = placeFoodOutsideGrid();
    } else {
      food = placeFoodInsideGrid();
    }
    snake.push({ ...snake[snake.length - 1] });
  }
}

function placeFoodInsideGrid() {
  return {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
  };
}

function placeFoodOutsideGrid() {
  const side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0:
      return { x: -3, y: Math.floor(Math.random() * 20) };
    case 1:
      return { x: 23, y: Math.floor(Math.random() * 20) };
    case 2:
      return { x: Math.floor(Math.random() * 20), y: -3 };
    case 3:
      return { x: Math.floor(Math.random() * 20), y: 23 };
    default:
      return placeFoodInsideGrid();
  }
}

function drawGame() {
  gameContainer.innerHTML = "";
  for (let segment of snake) {
    const div = document.createElement("div");
    div.style.gridRowStart = segment.y + 1;
    div.style.gridColumnStart = segment.x + 1;
    div.classList.add("snake");
    gameContainer.appendChild(div);
  }

  const foodDiv = document.createElement("div");
  foodDiv.style.gridRowStart = food.y + 1;
  foodDiv.style.gridColumnStart = food.x + 1;
  foodDiv.classList.add("food");
  gameContainer.appendChild(foodDiv);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});
