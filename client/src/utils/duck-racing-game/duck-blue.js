export class DuckBlue {
  canvas;
  context;
  playerImage;
  widthDuck = 200;
  heightDuck = 200;
  frameX = 0;
  frameY = 0;
  staggerGame = 0;
  x=0;
  y=0;
  speed = 0;
  constructor(speed, frameY, idCanvas, urlDuck) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 300;
    this.playerImage = new Image();
    this.playerImage.src = urlDuck;
    this.frameY = 300 - this.heightDuck - frameY;
    if(speed >= 0.02 && speed < 1.5) {
      this.speed = speed;
    }else {
      this.speed = 0.02;
    }
  }

  drawDuck() {
    this.context.clearRect(this.frameX,this.frameY, this.widthDuck,this.heightDuck);
    this.frameX += this.speed;
    this.x = Math.floor(this.staggerGame/(1/this.speed))%4;
    this.y = Math.floor(this.staggerGame/(1/this.speed))%2;
    if(this.frameX > 500) this.frameX = -50;
    this.context.drawImage(this.playerImage, this.x * this.widthDuck, this.y * this.heightDuck, this.widthDuck,this.heightDuck,this.frameX,this.frameY,this.widthDuck,this.heightDuck);
    this.staggerGame++;
    requestAnimationFrame(this.drawDuck.bind(this));
  }
}