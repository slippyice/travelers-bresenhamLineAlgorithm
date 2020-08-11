var bresBOT = {
  //https://en.wikipedia.org/wiki/Bresenham's_line_algorithm
  //adapted by slippy/hentai for usage on https://thetravelers.online/
  //this is a testing version, do not use
  err: undefined,
  dx: undefined,
  dy: undefined,
  sx: undefined,
  sy: undefined,
  pgx: undefined,
  pgy: undefined,
  count: undefined,
  limit: 120,//how many cycles are run before reseting
  run: function (cx, cy, gx, gy) {
    //current x y, target x y
    if ( isNaN(cx) && isNaN(cy) && isNaN(gx) && isNaN(gy) ) { return undefined; }
    if ( (this.count > 120) || (this.count === undefined) || (gx !== this.pgx) || (gy !== this.pgy) ) {
      this.reset();
    }
    if ( this.err === undefined ) {
      var bresdata = this.init(cx, cy, gx, gy);
      this.err = bresdata[4];
      this.dx = bresdata[0];
      this.dy = bresdata[2];
      this.sx = bresdata[1];
      this.sy = bresdata[3];
      this.pgx = gx;
      this.pgy = gy;
      this.count = 0;
    }
    while ( (cx !== gx) && (cy !== gy) ) {
    var cycdata = this.cycle(cx, cy, this.sx, this.sy, this.dx, this.dy, this.err);
    this.err = cycdata[1];
    //return cycdata[0];
    cx = cycdata[2];
    cy = cycdata[3];
    console.log(cycdata[0]);
    console.log("x: ", cx, " y: ", cy);//plot line
    }
  },
  reset: function () {
    this.err = undefined;
    this.dx = undefined;
    this.dy = undefined;
    this.sx = undefined;
    this.sy = undefined;
    this.pgx = undefined;
    this.pgy = undefined;
    this.count = 0;
  },
  init: function (cx, cy, gx, gy, redx, redy, reterr) {
    var dx = isNaN(redx) ? Math.abs(gx-cx) : dx=redx;
    var sx = cx < gx ? 1 : -1;
    var dy = isNaN(redy) ? -Math.abs(gy-cy) : dy=redy;
    var sy = cy < gy ? 1 : -1;
    var err = isNaN(reterr) ? dx+dy : err=reterr;
    return [dx, sx, dy, sy, err];
  },
  cycle: function (cx, cy, sx, sy, dx, dy, err) {
    var x, y, yx;
    var e2 = 2*err;
    if (e2 >= dy) {
      err+= dy;
      cx += sx;
      sx > 0 ? x="e" : x="w";
    }
    if (e2 <= dx) {
      err += dx;
      cy += sy;
      sy > 0 ? y="n" : y="s";
    }
    if (!y) {
      yx = x;
    } else if (!x) {
      yx = y;
    } else {
      yx = y + x;
    }
    return [yx, err, cx, cy];
    ///
  }
}
