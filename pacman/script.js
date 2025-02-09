const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

const pacman = {
    x: 50,
    y: 50,
    radius: 20,
    startAngle: 0.25 * Math.PI,
    endAngle: 1.75 * Math.PI,
    direction: 'right'
};

function drawPacman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, pacman.startAngle, pacman.endAngle);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function movePacman() {
    if (pacman.direction === 'right') {
        pacman.x += 2;
        if (pacman.x + pacman.radius > canvas.width) {
            pacman.direction = 'left';
        }
    } else {
        pacman.x -= 2;
        if (pacman.x - pacman.radius < 0) {
            pacman.direction = 'right';
        }
    }
}

function gameLoop() {
    drawPacman();
    movePacman();
    requestAnimationFrame(gameLoop);
}

gameLoop();