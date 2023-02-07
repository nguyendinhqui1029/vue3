export class Chessman {
  value = 0;
  icon = '';
  x = 0;
  y = 0;
  chessType= 0;
  isActive = false;
  constructor(value, chessType, icon) {
    this.value = value;
    this.chessType = chessType;
    this.icon = icon;
  }
  setPositionInitialize(x,y) {
    this.x = x;
    this.y = y;
  }
}

// Quân tướng
export class General extends Chessman { 

  constructor(value, x, y, chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Sĩ
export class Advisor extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Xe
export class Chariot extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Pháo
export class Cannon extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Tượng
export class Elephant extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Mã
export class Horse extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}

//Quân Tốt
export class Soldier extends Chessman {

  constructor(value, x, y,chessType, icon) {
    super(value,chessType, icon);
    this.setPositionInitialize(x,y)
  }
}