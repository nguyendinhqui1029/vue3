export class CityBackground {
  canvas;
  context;
  playerImage;
  widthCity = 463;
  heightCity = 500;
  x = 0;
  speed = 0;
  constructor(speed, idCanvas, urlCity) {
    this.canvas = document.getElementById(idCanvas);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = 600;
    this.canvas.height = 250;
    this.x = 0;
    this.speed = speed;
    this.playerImage = new Image();
    this.playerImage.src = urlCity;
  }

  drawCity() {
    if(this.x <= -this.canvas.width ) this.x = 0;
    this.context.clearRect(0,0,this.canvas.width ,this.canvas.height);
    this.context.drawImage(this.playerImage, 0, 0,this.widthCity,this.heightCity,this.x,0, this.canvas.width ,this.canvas.height);
    this.context.drawImage(this.playerImage, 0, 0,this.widthCity,this.heightCity,this.canvas.width+this.x,0, this.canvas.width ,this.canvas.height);
    this.x-= this.speed;
    requestAnimationFrame(this.drawCity.bind(this));
  }
}