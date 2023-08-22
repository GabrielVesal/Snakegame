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
        newHead.x > 19 ||  // Corrigido para ficar dentro do grid 20x20
        newHead.y < 0 ||
        newHead.y > 19 ||  // Corrigido para ficar dentro do grid 20x20
        snake.slice(1).some(segment => newHead.x === segment.x && newHead.y === segment.y)
    ) {
        document.getElementById("gameOver").style.display = "block";
        clearInterval(gameInterval);
        return false; 
    }

    snake.unshift(newHead);
    snake.pop();
    return true; 
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    foodCollectedCount++;
    food = placeFoodInsideGrid();
    snake.push({ ...snake[snake.length - 1] });
  }
}

function placeFoodInsideGrid() {
  let foodPosition;
  while (true) {
    foodPosition = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    };
    if (!snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y)) {
      break;
    }
  }
  return foodPosition;
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