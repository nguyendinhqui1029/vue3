export class RoadBackground {
  canvas;
  context;
  playerImage;
  playerImageStart;
  playerImageFinish;
  x = 0;
  speed = 0;
  start = false;
  cancelAnimation;
  TIMES = 15;
  constructor(speed, idCanvas) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.x = 0;
    if (speed >= 0.02 && speed <= 1.5) {
      this.speed = speed;
    } else {
      this.speed = 0.02;
    }
    this.playerImageStart = new Image();
    this.playerImageStart.src = require('@/utils/duck-racing-game/images/road_start.png');
    this.playerImageFinish = new Image();
    this.playerImageFinish.src = require('@/utils/duck-racing-game/images/road_finish.png');
    this.playerImage = new Image();
    this.playerImage.src = require('@/utils/duck-racing-game/images/road_full.png');

  }

  stopAnimation() {
    cancelAnimationFrame(this.cancelAnimation);
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i<= this.TIMES; i++) {
      if(i === 0) {
        this.context.drawImage(this.playerImageStart, 0, 0, this.playerImageStart.width, this.playerImageStart.height, i*this.canvas.width + this.x, 0, this.canvas.width + 2, this.canvas.height);
      } else if(i === this.TIMES) {
        this.context.drawImage(this.playerImageFinish, 0, 0, this.playerImageFinish.width, this.playerImageFinish.height, i*this.canvas.width + this.x, 0, this.canvas.width + 2, this.canvas.height);
      }else {
        this.context.drawImage(this.playerImage, 0, 0, this.playerImage.width, this.playerImage.height, i*this.canvas.width + this.x, 0, this.canvas.width + 2, this.canvas.height);
      }
    }

    if (this.start) {
      this.x -= this.speed; 
    }
    this.cancelAnimation = requestAnimationFrame(this.draw.bind(this));
    if (this.x <= - this.TIMES*this.canvas.width) {
      cancelAnimationFrame(this.cancelAnimation);
    }
  }
}