const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

const pacman = {
    x: 60, // Adjusted starting position
    y: 60, // Adjusted starting position
    radius: 20,
    speed: 2,
    direction: 'right'
};

const maze = [
    // Outer walls
    { x: 0, y: 0, width: 600, height: 10 },
    { x: 0, y: 0, width: 10, height: 600 },
    { x: 590, y: 0, width: 10, height: 600 },
    { x: 0, y: 590, width: 600, height: 10 },
    // Inner walls
    { x: 0, y: 120, width: 480, height: 10 },
    { x: 480, y: 240, width: 120, height: 10 },
    { x: 480, y: 480, width: 10, height: 120 },
    { x: 120, y: 240, width: 240, height: 10 },
    { x: 120, y: 480, width: 240, height: 10 },
    { x: 120, y: 240, width: 10, height: 120 },
    { x: 360, y: 240, width: 10, height: 240 },
    { x: 360, y: 360, width: 120, height: 10 },
    { x: 240, y: 360, width: 10, height: 240 }
];

const hearts = [
    { x: 300, y: 420, collected: false },
    { x: 300, y: 540, collected: false }
];

const dots = [];
for (let x = 60; x < canvas.width; x += 120) {
    for (let y = 60; y < canvas.height; y += 120) {
        if (!hearts.some(heart => Math.hypot(heart.x - x, heart.y - y) < 30)) {
            dots.push({ x, y, collected: false });
        }
    }
}

let showBonusText = false;
let bonusTextTimeout;
let gameOver = false;
let gameWin = false;
let points = 0;

function drawMaze() {
    ctx.fillStyle = 'blue';
    maze.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawHeart(x, y) {
    const radius = pacman.radius / 2; // Make the heart smaller
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - radius / 4, x - radius / 4, y - radius, x - radius, y - radius);
    ctx.bezierCurveTo(x - radius * 1.75, y - radius, x - radius * 1.75, y + radius / 2, x - radius * 1.75, y + radius / 2);
    ctx.bezierCurveTo(x - radius * 1.75, y + radius * 1.5, x - radius, y + radius * 2.25, x, y + radius * 3);
    ctx.bezierCurveTo(x + radius, y + radius * 2.25, x + radius * 1.75, y + radius * 1.5, x + radius * 1.75, y + radius / 2);
    ctx.bezierCurveTo(x + radius * 1.75, y + radius / 2, x + radius * 1.75, y - radius, x + radius, y - radius);
    ctx.bezierCurveTo(x + radius / 4, y - radius, x, y - radius / 4, x, y);
    ctx.closePath();
    ctx.fill();
}

function drawDots() {
    ctx.fillStyle = 'pink';
    dots.forEach(dot => {
        if (!dot.collected) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    });
}

function movePacman() {
    let nextX = pacman.x;
    let nextY = pacman.y;

    switch (pacman.direction) {
        case 'right':
            nextX += pacman.speed;
            break;
        case 'left':
            nextX -= pacman.speed;
            break;
        case 'up':
            nextY -= pacman.speed;
            break;
        case 'down':
            nextY += pacman.speed;
            break;
    }

    if (isColliding(nextX, nextY)) {
        gameOver = true;
    } else {
        pacman.x = nextX;
        pacman.y = nextY;
    }

    checkDotCollision();
    checkHeartCollision();
}

function isColliding(nextX, nextY) {
    return maze.some(wall => {
        return nextX + pacman.radius > wall.x &&
               nextX - pacman.radius < wall.x + wall.width &&
               nextY + pacman.radius > wall.y &&
               nextY - pacman.radius < wall.y + wall.height;
    });
}

function checkDotCollision() {
    dots.forEach(dot => {
        if (!dot.collected &&
            pacman.x + pacman.radius > dot.x - 5 &&
            pacman.x - pacman.radius < dot.x + 5 &&
            pacman.y + pacman.radius > dot.y - 5 &&
            pacman.y - pacman.radius < dot.y + 5) {
            dot.collected = true;
            points += 5;
        }
    });
}

function checkHeartCollision() {
    hearts.forEach(heart => {
        if (!heart.collected &&
            pacman.x + pacman.radius > heart.x - 20 &&
            pacman.x - pacman.radius < heart.x + 20 &&
            pacman.y + pacman.radius > heart.y - 20 &&
            pacman.y - pacman.radius < heart.y + 20) {
            heart.collected = true;
            points += 100;
            showBonusText = true;
            clearTimeout(bonusTextTimeout);
            bonusTextTimeout = setTimeout(() => {
                showBonusText = false;
            }, 5000);
        }
    });

    if (hearts.every(heart => heart.collected)) {
        gameWin = true;
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowRight':
            pacman.direction = 'right';
            break;
        case 'ArrowLeft':
            pacman.direction = 'left';
            break;
        case 'ArrowUp':
            pacman.direction = 'up';
            break;
        case 'ArrowDown':
            pacman.direction = 'down';
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawDots();
    drawPacman();
    hearts.forEach(heart => {
        if (!heart.collected) {
            drawHeart(heart.x, heart.y);
        }
    });
    if (showBonusText) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Courier';
        ctx.fillText('love bonus achieved <3 +100', pacman.x - 60, pacman.y - 30);
    }
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Courier';
        ctx.fillText('GAME OVER :(', pacman.x - 60, pacman.y - 60);
        ctx.fillText(`Score: ${points}`, pacman.x - 60, pacman.y + 60);
        return;
    }
    if (gameWin) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Courier';
        ctx.fillText('LOVE WINS :)', pacman.x - 60, pacman.y - 60);
        ctx.fillText(`Score: ${points}`, pacman.x - 60, pacman.y + 60);
        return;
    }
    ctx.fillStyle = 'pink';
    ctx.font = '20px Courier';
    ctx.fillText(`${points}`, pacman.x+10, pacman.y+5);
    movePacman();
    requestAnimationFrame(gameLoop);
}

gameLoop();