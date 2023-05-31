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
  start = false;
  cancelAnimation;

  constructor(speed, frameY, idCanvas, urlDuck) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.canvas.width =668;
    this.canvas.height = 380;
    this.playerImage = new Image();
    this.playerImage.src = urlDuck;
    this.frameY = 300 - this.heightDuck - frameY;
    if(speed >= 0.01 && speed <= 0.1) {
      this.speed = speed;
    }else {
      this.speed = 0.01;
    }
  }
  stopAnimation() {
    cancelAnimationFrame(this.cancelAnimation);
  }
  draw(){
    this.context.clearRect(this.frameX - 65,this.frameY, this.widthDuck,this.heightDuck);
    if(this.start) {
      this.frameX += this.speed;
      this.x = Math.floor(this.staggerGame/(1/this.speed))%4;
      this.y = Math.floor(this.staggerGame/(1/this.speed))%2;
      this.staggerGame++;
    }
    this.context.drawImage(this.playerImage, this.x * this.widthDuck, this.y * this.heightDuck, this.widthDuck,this.heightDuck,this.frameX - 65,this.frameY,this.widthDuck,this.heightDuck);
    this.cancelAnimation = requestAnimationFrame(this.draw.bind(this));
  }
}