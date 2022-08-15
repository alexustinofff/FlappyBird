let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// отрисовка картинок 
let bird = new Image();
let background = new Image();
let firstground = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
background.src = "img/town.png";
firstground.src = "img/Earth.png";
pipeUp.src = "img/UpPipe.png";
pipeBottom.src = "img/pipeBottom.png";

// Пробел между преградами
let gap = 90;

// При нажатии на кнопку птичка поднимается

document.addEventListener("keydown", moveUp);
function moveUp() {
yPos -=30;
};

// Создание блоков
let pipe = [];
 pipe[0] = {
    x : cvs.width,
    y : 0
}
let score = 0;
// Позиция птички
let xPos = 10;
let yPos = 150;
let grav = 1.5;

// Отрисовка объектов в Canvas
function draw() {
    ctx.drawImage(background, 0,0);

    // Отрисовка блоков
    for(let i=0; i< pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    // Появление новых препятствий
    if(pipe[i].x == 60) {
        pipe.push({
            x: cvs.width,
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    }

    // Столкновение с препятствием

    if(xPos + bird.width >= pipe[i].x 
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - firstground.height) {
                // Перезагрузка страницы
                location.reload();
            }
            if(pipe[i].x ==5) {
                score++;
            }
        }
    // Передний фон
ctx.drawImage(firstground, 0, cvs.height - firstground.height);

// Отрисовка птички
ctx.drawImage(bird, xPos, yPos);
yPos += grav;

ctx.fillStyle = "#000";
ctx.font = "24px Verdana";
ctx.fillText("Счет: " + score, 10, cvs.height - 20)

requestAnimationFrame(draw);
};

// После загрузки последней картинки срабатывает функция draw
pipeBottom.onload = draw;
