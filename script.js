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

// ... (restante do seu código JavaScript)


