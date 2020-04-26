export default class Snake {
  constructor(pos, tileSize, ctx) {
    this.position = pos;
    this.extend = false;
    this.cells = [];

    this.ctx = ctx;

    this.dv = {
      x: 0,
      y: 0
    }
  }

  update() {
    if (this.cells.length) {
      this.addCell();
      if (!this.extend) this.cells.pop();
    }

    this.extend = false;

    this.position.x += this.dv.x;
    this.position.y += this.dv.y;
  }

  draw(tileSize) {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(this.position.x * tileSize, this.position.y * tileSize, tileSize, tileSize);

    for (const cell of this.cells) {
      this.ctx.fillRect(cell.x * tileSize, cell.y * tileSize, tileSize, tileSize);
    }
  }

  addCell() {
    this.cells.unshift({ x: this.position.x, y: this.position.y});
  }
}
