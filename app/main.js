// Obtén los elementos del DOM
var field = document.getElementById('gameField');
var ball = document.getElementById('ball');
var paddle1 = document.getElementById('paddle1');
var paddle2 = document.getElementById('paddle2');

// Define las propiedades del juego
var ballDir = [1, 1];
var paddleSpeed = 4;
var paddle1Dir = 0;
var paddle2Dir = 0;

// Obtén los elementos de puntuación
var score1 = document.getElementById('score1');
var score2 = document.getElementById('score2');

// Inicializa los puntos
var points1 = 0;
var points2 = 0;

// Actualiza el juego cada 20 milisegundos
setInterval(function() {
    // Mueve la pelota
    var ballPos = [ball.offsetLeft, ball.offsetTop];
    ballPos[0] += ballDir[0] * 4;
    ballPos[1] += ballDir[1] * 4;
    ball.style.left = ballPos[0] + 'px';
    ball.style.top = ballPos[1] + 'px';

    // Incrementa los puntos cuando la pelota toca el borde opuesto
    if (ballPos[0] <= 0) {
        points2++;
        score2.textContent = points2;
        ballPos[0] = field.offsetWidth / 2; // reset ball position
        ballDir[0] = 1;
    }
    if (ballPos[0] >= field.offsetWidth - ball.offsetWidth) {
        points1++;
        score1.textContent = points1;
        ballPos[0] = field.offsetWidth / 2; // reset ball position
        ballDir[0] = -1;
    }

    // Rebota la pelota en los bordes del campo
    if (ballPos[1] <= 0 || ballPos[1] >= field.offsetHeight - ball.offsetHeight) {
        ballDir[1] = -ballDir[1];
    }

    // Mueve las paletas
    paddle1.style.top = (paddle1.offsetTop + paddle1Dir * paddleSpeed) + 'px';
    paddle2.style.top = (paddle2.offsetTop + paddle2Dir * paddleSpeed) + 'px';

    // Evita que las paletas salgan del campo
    if (paddle1.offsetTop <= 0) {
        paddle1.style.top = '0px';
    }
    if (paddle1.offsetTop >= field.offsetHeight - paddle1.offsetHeight) {
        paddle1.style.top = (field.offsetHeight - paddle1.offsetHeight) + 'px';
    }
    if (paddle2.offsetTop <= 0) {
        paddle2.style.top = '0px';
    }
    if (paddle2.offsetTop >= field.offsetHeight - paddle2.offsetHeight) {
        paddle2.style.top = (field.offsetHeight - paddle2.offsetHeight) + 'px';
    }

    // Rebota la pelota en las paletas
    if (ballPos[0] <= paddle1.offsetLeft + paddle1.offsetWidth && ballPos[1] >= paddle1.offsetTop && ballPos[1] <= paddle1.offsetTop + paddle1.offsetHeight) {
        ballDir[0] = 1;
    }
    if (ballPos[0] >= paddle2.offsetLeft - ball.offsetWidth && ballPos[1] >= paddle2.offsetTop && ballPos[1] <= paddle2.offsetTop + paddle2.offsetHeight) {
        ballDir[0] = -1;
    }
}, 20);

// Controla las paletas con las teclas
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'w':
            paddle1Dir = -1;
            break;
        case 's':
            paddle1Dir = 1;
            break;
        case 'ArrowUp':
            paddle2Dir = -1;
            break;
        case 'ArrowDown':
            paddle2Dir = 1;
            break;
    }
});
window.addEventListener('keyup', function(e) {
    switch (e.key) {
        case 'w':
        case 's':
            paddle1Dir = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            paddle2Dir = 0;
            break;
    }
});


