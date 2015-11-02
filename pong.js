  // TODO
  //     -AI
  //     -Buttons
  //     -Score

  var canvas = document.querySelector("canvas")
  var ctx = canvas.getContext("2d");

  canvas.width = 900;
  canvas.height = 500;

//lenyomott bill mentése
  var keyState = {};
  document.addEventListener("keydown", function(event) {
    keyState[event.keyCode] = true;
  }, true);

  document.addEventListener("keyup", function(event) {
    keyState[event.keyCode] = false;
  }, true);


//animáció
  var lastTime = null;
  function frame(time) {
    if (lastTime != null)
      gameLoop(Math.min(100, time - lastTime) / 1000);
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);


//konsruktorok
  function VectorConst(x, y) {
    this.x = x;
    this.y = y;
  }
  function SpeedConst(VectorConst) {
    this.x = VectorConst.x;
    this.y = VectorConst.y;
  };
  function BallConst(VectorConst, r) {
    this.x = VectorConst.x;
    this.y = VectorConst.y;
    this.r = r;
  };

  function RacketConst(VectorConst, width, height) {
    this.x = VectorConst.x;
    this.y = VectorConst.y;
    this.width = width;
    this.height = height;
  }


  var speed = new SpeedConst(new VectorConst(-7, 0));
  var ball = new BallConst(new VectorConst(450, 250), 10);
  var leftRacket = new RacketConst(new VectorConst(20, 200), 12, 80);
  var rightRacket = new RacketConst(new VectorConst(canvas.width - 32, 200), 12, 80);

      
  function gameLoop(step) {
    ctx.beginPath();
    ctx.fillStyle = "#ef5350";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //38: fel nyil | 40: le nyil
    if (keyState[87] && leftRacket.y > 0) {
      leftRacket.y -= 8;
    }
    if (keyState[83] && leftRacket.y + leftRacket.height < canvas.height) {
      leftRacket.y += 8;
    }

    if (keyState[38] && rightRacket.y > 0) {
      rightRacket.y -= 8;
    }
    if (keyState[40] && rightRacket.y + rightRacket.height < canvas.height) {
      rightRacket.y += 8;
    }

   
   //bal racket ütözés
    if (ball.x - ball.r <= leftRacket.x + leftRacket.width) {
      if (ball.y >= leftRacket.y && ball.y < (leftRacket.y + leftRacket.height * (1/3)) ){
        speed.x *= -1;
        speed.y -= 3;
      }
      else if (ball.y >= (leftRacket.y + leftRacket.height * (1/3)) && ball.y < (leftRacket.y + leftRacket.height * (2/3)) ) {
        speed.x *= -1;
      }
      else if (ball.y >= (leftRacket.y + leftRacket.height * (2/3)) && ball.y < (leftRacket.y + leftRacket.height) ) {
        speed.x *= -1;
        speed.y += 3;
      }
    }

    //jobb racket ütközés
    if (ball.x + ball.r >= rightRacket.x ) {
      if (ball.y >= rightRacket.y && ball.y < (rightRacket.y + rightRacket.height * (1/3)) ){
        speed.x *= -1;
        speed.y -= 3;
      }
      else if (ball.y >= (rightRacket.y + rightRacket.height * (1/3)) && ball.y < (rightRacket.y + rightRacket.height * (2/3)) ) {
        speed.x *= -1;
      }
      else if (ball.y >= (rightRacket.y + rightRacket.height * (2/3)) && ball.y < (rightRacket.y + rightRacket.height) ) {
        speed.x *= -1;
        speed.y += 3;
      }
    }


    //Labda vs border
    if ( (ball.x + 10) >= canvas.width || (ball.x - 10) /2 <= 0) {
      speed.x *= -1;
    }
    if ( (ball.y + 10) >= canvas.height || (ball.y  - 10) /2 <= 0) {
      speed.y *= -1;
    }


    //max sebesség
    if (Math.abs(speed.y) > Math.abs(speed.x)) {
      speed.y = speed.x;
    }

    ball.x += speed.x;
    ball.y += speed.y;

    //labda animáció
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ball.x, ball.y, ball.r, 0, 7);
    ctx.fill();

    //racket animáció
    ctx.fillRect(leftRacket.x, leftRacket.y, leftRacket.width, leftRacket.height);
    ctx.fillRect(rightRacket.x, rightRacket.y, rightRacket.width, rightRacket.height);
    

  }

  /*Copyright 2015 Benedek Tomasik*/