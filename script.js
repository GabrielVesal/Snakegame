const gameContainer = document.querySelector(".game-container");
let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let gameInterval;
let foodCollectedCount = 0;
let placeFoodOutside = false;

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
  food = { x: 5, y: 5 };
  foodCollectedCount = 0;
  placeFoodOutside = false;
  document.getElementById("gameOver").style.display = "none";
  startGame();
}

function main() {
  updateSnakePosition();
  checkGameOver();
  checkFoodCollision();
  drawGame();
}

function updateSnakePosition() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;
  snake.unshift(head);
  snake.pop();
}

function checkGameOver() {
  for (let segment of snake) {
    if (
      segment.x < 0 ||
      segment.x >= 20 ||
      segment.y < 0 ||
      segment.y >= 20 ||
      (snake[0].x === segment.x &&
        snake[0].y === segment.y &&
        snake[0] !== segment)
    ) {
      document.getElementById("gameOver").style.display = "block";
      clearInterval(gameInterval);
    }
  }
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    foodCollectedCount++;

    if (foodCollectedCount % 10 === 0) {
      placeFoodOutside = true;
    }

    if (placeFoodOutside) {
      const side = Math.floor(Math.random() * 4);
      switch (side) {
        case 0: // left
          food = { x: -2, y: Math.floor(Math.random() * 20) };
          break;
        case 1: // right
          food = { x: 21, y: Math.floor(Math.random() * 20) };
          break;
        case 2: // top
          food = { x: Math.floor(Math.random() * 20), y: -2 };
          break;
        case 3: // bottom
          food = { x: Math.floor(Math.random() * 20), y: 21 };
          break;
      }
      placeFoodOutside = false;
    } else {
      food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
    }

    snake.push({ ...snake[snake.length - 1] });
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

  if ((food.x >= -2 && food.x <= 21) && (food.y >= -2 && food.y <= 21)) {
    const foodDiv = document.createElement("div");
    foodDiv.style.gridRowStart = food.y + 1;
    foodDiv.style.gridColumnStart = food.x + 1;
    foodDiv.classList.add("food");
    gameContainer.appendChild(foodDiv);
  }
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
