let canvas, ctx;
let player, obstacles, score, isGameOver;

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    player = { x: 50, y: 150, width: 50, height: 50, dy: 0 };
    obstacles = [];
    score = 0;
    isGameOver = false;
    document.addEventListener('keydown', handleInput);
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!isGameOver) {
        update();
        render();
        requestAnimationFrame(gameLoop);
    } else {
        showGameOver();
    }
}

function handleInput(event) {
    if (event.key === ' ') {
        jump();
    }
}

function jump() {
    player.dy = -10;
}

function update() {
    movePlayer();
    updateObstacles();
    checkCollision();
    updateScore();
}

function movePlayer() {
    player.y += player.dy;
    player.dy += 0.5; // Gravity
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }
}

function spawnObstacle() {
    let obstacle = { x: canvas.width, y: canvas.height - 50, width: 50, height: 50 };
    obstacles.push(obstacle);
}

function updateObstacles() {
    for (let obstacle of obstacles) {
        obstacle.x -= 5;
    }
    if (Math.random() < 0.02) {
        spawnObstacle();
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            isGameOver = true;
        }
    }
}

function updateScore() {
    score++;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    drawScore();
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = 'black';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
}

function showGameOver() {
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over! Score: ' + score, canvas.width / 2 - 50, canvas.height / 2);
}

init();