var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var points = [];
var color = 0;


function Point(x, y, xSpeed, ySpeed) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
}

function reset () {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
  for(var i = 0; i < options.nrOfPoints; i++) {
    var point = new Point(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 3 - 1.5,
      Math.random() * 3 - 1.5
    );
    points.push(point);
  } 
}

function draw() {
  ctx.strokeStyle = "hsla(" + color + ", 50%, 50%," + options.opacity + ")";
  if(!options.leaveTrace) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.beginPath();
  for(var i = 0; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.stroke();
  color++;
}

function move() {
  var newX;
  var newY;
  for(var i = 0; i < points.length; i++) {
    newX = points[i].x += points[i].xSpeed * options.speedBoost;
    if(newX < canvas.width && newX > 0) {
      points[i].x = newX;  
    } else {
      points[i].xSpeed *= -1;
      points[i].x += points[i].xSpeed * options.speedBoost;
    }
    newY = points[i].y += points[i].ySpeed * options.speedBoost;
    if(newY < canvas.height && newY > 0) {
      points[i].y = newY;  
    } else {
      points[i].ySpeed *= -1;
      points[i].y += points[i].ySpeed * options.speedBoost;
    }
  }
  
}

function run() {
  draw();
  move();
  if(!options.pause) {
    requestAnimationFrame(run);
  }
}

var Options = function() {
  this.nrOfPoints = 10;
  this.speedBoost = 1;
  this.opacity = 0.1;
  this.leaveTrace = true;
  this.reset = reset;
  this.pause = false;
  this.startStop = function() {
    this.pause = !this.pause;
    if(!this.pause) {
      run();
    }
  };
};

var options = new Options();
var gui = new dat.GUI({ width: 255 });
gui.add(options, "nrOfPoints")
  .min(2)
  .max(300)
  .step(1)
  .name("Number of points");
gui.add(options, "speedBoost")
  .min(0.1)
  .max(10)
  .step(0.1)
  .name("Speed");
gui.add(options, "opacity")
  .min(0.01)
  .max(1)
  .step(0.01)
  .name("Opacity");
gui.add(options, "leaveTrace")
  .name("Leave trace forever");
gui.add(options, "startStop")
  .name("Start/Stop");
gui.add(options, "reset").name("Reset");

reset();
run();
