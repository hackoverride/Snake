var velX = +10;  //horisontal bevegelse økning er høyre.
var velY = 0;    // vertikal bevegelse 
var poeng = 0;
var snakeCanvas = document.getElementById("snakeCanvas");
var ctx = snakeCanvas.getContext("2d");

function clearSnakeCanvas() {
  const canvasBorderColor = "green";
  const canvasBackgroundColor = "black";
  ctx.fillStyle = canvasBackgroundColor;
  ctx.strokestyle = canvasBorderColor;
  ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  }

let snake = [
  {x: 250, y: 100},
  {x: 240, y: 100},
  {x: 230, y: 100},
  {x: 220, y: 100},
  {x: 210, y: 100},
  ];
                

clearSnakeCanvas();
drawSnake();
createFood();
            
function hoved() {    // Main function - setTimeout er 1/10 sek. endre (lavere) om du ønsker at slangen skal gå raskere eller treigere.
  clearSnakeCanvas();
  if (didGameEnd()) {
    snakeEnding();
    }
  drawFood();
  advanceSnake();
  drawSnake();
  var t = setTimeout(hoved, 100);
  }

document.addEventListener("keydown", changeDirection);  
            
function snakeEnding() {
                velX = 0;
                velY = 0;
                
                ctx.font = "80px Arial";
                ctx.fillStyle = "red";
                ctx.fillText("GAME OVER!", 150, 300); 
                
                
            }
            
            function drawSnakePart(snakePart) {
                ctx.fillStyle = "lightgreen";
                ctx.strokeStyle = "darkgreen";
                
                ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
                ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
                
            }
            
            function drawSnake() {
                snake.forEach(drawSnakePart);
            }
            
            function advanceSnake() {
                const head = {x: snake[0].x +velX, y: snake[0].y +velY};
                
                
                snake.unshift(head);
                const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
                
                if (didEatFood) {
                    createFood();
                    poeng += 1;
                    document.getElementById('poeng').innerHTML = poeng;
                } else {
                snake.pop();
                }
            }
            
            
            function changeDirection(event) { 
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;
            const keyPressed = event.keyCode;
            const goingUp = velY === -10;
            const goingDown = velY === 10;
            const goingRight = velX === 10;
            const goingLeft = velX === -10;

            
            if (keyPressed === LEFT_KEY && !goingRight) {
                velX = -10;
                velY = 0;
            }
            
            if (keyPressed === UP_KEY && !goingDown) {
                velX = 0;
                velY = -10;
            }
            
            if (keyPressed === RIGHT_KEY && !goingLeft) {
                velX = 10;
                velY = 0;
            }
            
            if (keyPressed === DOWN_KEY && !goingUp) {
                velX = 0;
                velY = 10;
            }
            
            }
        
            function tilfeldigTi(min, max) {
                return Math.round((Math.random() * (max - min) +min )/10) *10;
            }    
        
            function createFood() {
                foodX = tilfeldigTi(0, snakeCanvas.width - 10);
                foodY = tilfeldigTi(0, snakeCanvas.height - 10);
                
                snake.forEach(function isFoodOnSnake(part) {
                    const foodIsOnSnake = part.x == foodX && part.y == foodY
                    if (foodIsOnSnake){ createFood();}
                    });
            }
            function drawFood() {
                ctx.fillStyle = 'red';
                ctx.strokestyle = 'darkred';
                ctx.fillRect(foodX, foodY, 10, 10);
                ctx.strokeRect(foodX, foodY, 10, 10);
            }
            
      function didGameEnd() {
        for (let i = 4; i < snake.length; i++) {
          const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
          if (didCollide) return true
        }
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > snakeCanvas.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > snakeCanvas.height - 10;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
      }
