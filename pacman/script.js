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
    {x: 0, y: 120, width: 480, height: 10},
    {x: 480, y: 240, width: 120, height: 10},
    {x: 480, y: 480, width: 10, height: 120},
    {x: 120, y: 240, width: 240, height: 10},
    {x: 120, y: 480, width: 240, height: 10},
    {x: 120, y: 240, width: 10, height: 120},
    {x: 360, y: 240, width: 10, height: 240},
    {x: 360, y: 360, width: 120, height: 10},
    {x: 240, y: 360, width: 10, height: 240}
];

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