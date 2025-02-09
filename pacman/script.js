const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

const pacman = {
    x: 50,
    y: 50,
    radius: 20,
    speed: 2,
    direction: 'right'
};

function drawPacman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function movePacman() {
    switch (pacman.direction) {
        case 'right':
            pacman.x += pacman.speed;
            if (pacman.x + pacman.radius > canvas.width) {
                pacman.x = canvas.width - pacman.radius;
            }
            break;
        case 'left':
            pacman.x -= pacman.speed;
            if (pacman.x - pacman.radius < 0) {
                pacman.x = pacman.radius;
            }
            break;
        case 'up':
            pacman.y -= pacman.speed;
            if (pacman.y - pacman.radius < 0) {
                pacman.y = pacman.radius;
            }
            break;
        case 'down':
            pacman.y += pacman.speed;
            if (pacman.y + pacman.radius > canvas.height) {
                pacman.y = canvas.height - pacman.radius;
            }
            break;
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
    drawPacman();
    movePacman();
    requestAnimationFrame(gameLoop);
}

gameLoop();