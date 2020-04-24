export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.tileSize = 8;
    this.gridSize = {x: 20, y: 20};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;
  }

  update() {

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(10 * this.tileSize, 1 * this.tileSize, this.tileSize, this.tileSize);
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
