
let x, y;
let c;
let down;
let stars = [];

// class for creating stars for the background
class Star {
  constructor(tx, ty, tc, tf, td) {
    this.x = tx;
    this.y = ty;
    this.c = tc;
    this.f = tf;
    this.down = td;
  }

  showStar() {
    stroke(this.c);
    point(this.x, this.y);
  }
}