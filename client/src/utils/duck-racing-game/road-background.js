export class RoadBackground {
  canvas;
  context;
  playerImage;
  playerImageStart;
  playerImageFinish;
  widthRoad = 600;
  heightRoad = 1000;
  x = 0;
  speed = 0;
  isShowStartPlayer = true;
  isShowFinishPlayer = false;
  start = false;
  constructor(speed, idCanvas) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 310;
    this.x = 0;
    if(speed >= 0.02 && speed <= 1.5) {
      this.speed = speed;
    }else {
      this.speed = 0.02;
    }
    this.playerImageStart = new Image();
    this.playerImageStart.src = require('@/utils/duck-racing-game/images/road_start.png');
    this.playerImage = new Image();
    this.playerImage.src = require('@/utils/duck-racing-game/images/road_full.png');
    this.playerImageFinish = new Image();
    this.playerImageFinish.src = require('@/utils/duck-racing-game/images/road_finish.png');
  }

  drawRoad() {
    if(this.x <= -this.canvas.width ) {
      this.isShowStartPlayer = false;
      this.x = 0;
    }
    this.context.clearRect(0,0,this.canvas.width ,this.canvas.height);
    this.context.drawImage(this.isShowStartPlayer ? this.playerImageStart : this.playerImage, 0, 0,this.widthRoad,this.heightRoad,this.x,165, this.canvas.width ,this.canvas.height);
    this.context.drawImage(this.isShowFinishPlayer ? this.playerImageFinish : this.playerImage, 0, 0,this.widthRoad,this.heightRoad,this.canvas.width+this.x -2,165, this.canvas.width ,this.canvas.height);
    if(this.start) {
      this.x -= this.speed;
    }
    requestAnimationFrame(this.drawRoad.bind(this));
  }
}