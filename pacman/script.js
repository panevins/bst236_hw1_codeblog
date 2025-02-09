const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

const pacman = {
    x: 50,
    y: 50,
    radius: 20,
    speed: 2,
    direction: 'right'
};

const maze = [
    // Outer walls
    { x: 0, y: 0, width: 500, height: 10 },
    { x: 0, y: 0, width: 10, height: 500 },
    { x: 490, y: 0, width: 10, height: 500 },
    { x: 0, y: 490, width: 500, height: 10 },
    // Inner walls
    { x: 50, y: 50, width: 400, height: 10 },
    { x: 50, y: 50, width: 10, height: 150 },
    { x: 440, y: 50, width: 10, height: 150 },
    { x: 50, y: 190, width: 400, height: 10 },
    { x: 50, y: 250, width: 150, height: 10 },
    { x: 300, y: 250, width: 150, height: 10 },
    { x: 50, y: 250, width: 10, height: 150 },
    { x: 440, y: 250, width: 10, height: 150 },
    { x: 50, y: 390, width: 400, height: 10 },
    { x: 50, y: 350, width: 150, height: 10 },
    { x: 300, y: 350, width: 150, height: 10 },
    { x: 200, y: 50, width: 10, height: 100 },
    { x: 290, y: 50, width: 10, height: 100 },
    { x: 200, y: 150, width: 100, height: 10 },
    { x: 200, y: 250, width: 10, height: 100 },
    { x: 290, y: 250, width: 10, height: 100 },
    { x: 200, y: 350, width: 100, height: 10 }
];

function drawMaze() {
    ctx.fillStyle = 'white';
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

    if (!isColliding(nextX, nextY)) {
        pacman.x = nextX;
        pacman.y = nextY;
    }
}

function isColliding(nextX, nextY) {
    return maze.some(wall => {
        return nextX + pacman.radius > wall.x &&
               nextX - pacman.radius < wall.x + wall.width &&
               nextY + pacman.radius > wall.y &&
               nextY - pacman.radius < wall.y + wall.height;
    });
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
    drawPacman();
    movePacman();
    requestAnimationFrame(gameLoop);
}

gameLoop();