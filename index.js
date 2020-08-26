var canvas, canvasContext; // canvas information about dimentions of the display area
//canvasContext is sort of underling graphical information that we can draw retangles and circles...
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 5;
var paddle1Y = 250;
var paddle2Y = 250;
const Paddle_Height = 100;
const Paddle_Thickness = 10;
const Bouncing_Speed= 0.40;

var player1Score = 0;
var player2Score = 0;
const Winning_Score =3;

var showingWinScreen = false;


function scoreReset() {
	if(showingWinScreen){
player1Score=0;
player2Score=0;
	showingWinScreen= false;
	}
	}
window.onload = function() {
  //asap the window finished loading then run the function
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 30;
  setInterval(function callBoth() {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  // evert one second after the window loaded it's going to call a drawEverythingfunction
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - (Paddle_Height / 2);
  });
	document.addEventListener("click",scoreReset);
}

function ballReset() {
	if (player1Score>=Winning_Score|| player2Score>=Winning_Score){
   showingWinScreen= true;
	}


  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}
function computerMovment(){
	var paddle2YCenter= paddle2Y+ (Paddle_Height/2);
  if(paddle2YCenter < ballY-35){
	paddle2Y += 6;
}else if (paddle2YCenter> ballY+35){
		paddle2Y -= 6;
	}

}

function moveEverything() {

	if(showingWinScreen){
		return;
	}
	computerMovment();
  ballX +=ballSpeedX;
  ballY +=ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + Paddle_Height) {
      ballSpeedX = -ballSpeedX;
			var deltaY = ballY-(paddle1Y+Paddle_Height/2);
			ballSpeedY=  deltaY*0.35;
    } else {
			player2Score++;//must be before ballReset()
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + Paddle_Height) {
      ballSpeedX = -ballSpeedX;
			var deltaY = ballY-(paddle2Y+Paddle_Height/2);
			ballSpeedY=  deltaY*Bouncing_Speed;
    } else {
			player1Score++;
			ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}
function drawNet(){
for(var i=0;i<=canvas.height;i+=40){
	colorRect(canvas.width/2-1, i , 2 ,20, 'aqua');
}

}
function drawEverything() {
  //next line blanks out the screen with black
  colorRect(0, 0, canvas.width, canvas.height, 'black');
	if(showingWinScreen){
		canvasContext.fillStyle = 'white';
		if (player1Score>=Winning_Score){
			canvasContext.font= '30px monospace';
			 canvasContext.fillText('player Left won !',canvas.width-550,250);
		}else if(player2Score>=Winning_Score){
			canvasContext.font= '30px monospace';
     canvasContext.fillText('player Right won !',canvas.width-550,250);
		}
		canvasContext.font= '12px monospace';
		canvasContext.fillText('Click to continue',canvas.width-450,540);
		return;
	}

  //left player1 paddle
 drawNet();
  colorRect(0, paddle1Y, Paddle_Thickness, Paddle_Height, 'aqua');
  //left player2 paddle
  colorRect(canvas.width - Paddle_Thickness, paddle2Y, Paddle_Thickness, Paddle_Height, 'aqua');
  //draw the ball
  colorcircle(ballX, ballY, 10, 'aqua');
 canvasContext.fillStyle = 'white';
	canvasContext.fillText(player1Score,100,100);
	canvasContext.fillText(player2Score,canvas.width-100,100);
}
//tamplate
function colorcircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
