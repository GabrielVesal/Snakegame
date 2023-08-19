const gameContainer = document.querySelector('.game-container');
let snakeSegments = [{ x: 10, y: 10 }];
let direction = 'right';
let foodPosition = getRandomPosition();
let gameInterval;

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('DOMContentLoaded', function() {
    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    gameContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, false);

    gameContainer.addEventListener('touchmove', (e) => {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                if (direction !== 'right') direction = 'left';
            } else {
                if (direction !== 'left') direction = 'right';
            }
        } else {
            if (diffY > 0) {
                if (direction !== 'down') direction = 'up';
            } else {
                if (direction !== 'up') direction = 'down';
            }
        }
        e.preventDefault();
    }, false);

    document.getElementById('startButton').addEventListener('click', () => {
        gameInterval = setInterval(updateGame, 100);
        document.getElementById('startButton').disabled = true;
    });
});

function updateGame() {
    moveSnake();
    checkCollision();
    renderGame();
}

function moveSnake() {
    const newHead = { ...snakeSegments[0] };

    switch (direction) {
        case 'right':
            newHead.x++;
            break;
        case 'left':
            newHead.x--;
            break;
        case 'up':
            newHead.y--;
            break;
        case 'down':
            newHead.y++;
            break;
    }

    snakeSegments.unshift(newHead);

    if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        foodPosition = getRandomPosition();
    } else {
        snakeSegments.pop();
    }
}

function checkCollision() {
    const head = snakeSegments[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        endGame();
    }
    
    for (let i = 1; i < snakeSegments.length; i++) {
        if (head.x === snakeSegments[i].x && head.y === snakeSegments[i].y) {
            endGame();
        }
    }
}

function renderGame() {
    gameContainer.innerHTML = '';

    snakeSegments.forEach(segment => {
        const snakeElem = document.createElement('div');
        snakeElem.style.gridColumnStart = segment.x + 1;
        snakeElem.style.gridRowStart = segment.y + 1;
        snakeElem.classList.add('snake');
        gameContainer.appendChild(snakeElem);
    });

    const foodElem = document.createElement('div');
    foodElem.style.gridColumnStart = foodPosition.x + 1;
    foodElem.style.gridRowStart = foodPosition.y + 1;
    foodElem.classList.add('food');
    gameContainer.appendChild(foodElem);
}

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    };
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over!');
    resetGame();
    renderGame();
}

function resetGame() {
    snakeSegments = [{ x: 10, y: 10 }];
    direction = 'right';
    foodPosition = getRandomPosition();
    document.getElementById('startButton').disabled = false;
}
