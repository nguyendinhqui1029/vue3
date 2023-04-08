export class CityBackground {
  canvas;
  context;
  playerImage;
  x = 0;
  speed = 0;
  cancelAnimation;
  start = false;

  constructor(speed, idCanvas, urlCity) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.x = 0;
    if(speed >= 0.02 && speed <= 1.5) {
      this.speed = speed;
    }else {
      this.speed = 0.02;
    }
    this.playerImage = new Image();
    this.playerImage.src = urlCity;
  }

  stopAnimation() {
    cancelAnimationFrame(this.cancelAnimation);
  }
  draw() {
    if(this.x <= -this.canvas.width ) this.x = 0;
    this.context.clearRect(0,0,this.canvas.width ,this.canvas.height);
    this.context.drawImage(this.playerImage, 0, 0,this.playerImage.width,this.playerImage.width/2,this.x,0, this.canvas.width,this.canvas.width/2 + 20);
    this.context.drawImage(this.playerImage, 0, 0,this.playerImage.width,this.playerImage.width/2,this.canvas.width + this.x - 1,0, this.canvas.width,this.canvas.width/2 + 20);
    if(this.start) {
      this.x-= this.speed;
    }
    this.cancelAnimation= requestAnimationFrame(this.draw.bind(this));
  }
}