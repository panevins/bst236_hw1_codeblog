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
    { x: 0, y: 0, width: 800, height: 10 },
    { x: 0, y: 0, width: 10, height: 800 },
    { x: 790, y: 0, width: 10, height: 800 },
    { x: 0, y: 790, width: 800, height: 10 },
    // Inner walls
    { x: 50, y: 50, width: 700, height: 10 },
    { x: 50, y: 50, width: 10, height: 200 },
    { x: 740, y: 50, width: 10, height: 200 },
    { x: 50, y: 240, width: 700, height: 10 },
    { x: 50, y: 300, width: 200, height: 10 },
    { x: 550, y: 300, width: 200, height: 10 },
    { x: 50, y: 300, width: 10, height: 200 },
    { x: 740, y: 300, width: 10, height: 200 },
    { x: 50, y: 490, width: 700, height: 10 },
    { x: 50, y: 450, width: 200, height: 10 },
    { x: 550, y: 450, width: 200, height: 10 },
    { x: 300, y: 50, width: 10, height: 200 },
    { x: 490, y: 50, width: 10, height: 200 },
    { x: 300, y: 250, width: 200, height: 10 },
    { x: 300, y: 300, width: 10, height: 200 },
    { x: 490, y: 300, width: 10, height: 200 },
    { x: 300, y: 490, width: 200, height: 10 },
    { x: 150, y: 550, width: 500, height: 10 },
    { x: 150, y: 550, width: 10, height: 200 },
    { x: 640, y: 550, width: 10, height: 200 },
    { x: 150, y: 740, width: 500, height: 10 },
    { x: 200, y: 600, width: 400, height: 10 },
    { x: 200, y: 600, width: 10, height: 100 },
    { x: 590, y: 600, width: 10, height: 100 },
    { x: 200, y: 690, width: 400, height: 10 }
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