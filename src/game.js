export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.tileSize = 8;
    this.gridSize = {x: 20, y: 20};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;

    this.position = {
      x: Math.random() * this.gridSize.x,
      y: Math.random() * this.gridSize.y
    };
    this.dv = {
      x: 0,
      y: 0
    };

    window.addEventListener('keypress', this.handleKeyPress.bind(this));

    setInterval(this.update.bind(this), 500);
  }

  handleKeyPress(event) {
    if (event.key === 'w' && this.dv.y === 0) {
      this.dv.x = 0;
      this.dv.y = -1;
    }
    if (event.key === 's' && this.dv.y === 0) {
      this.dv.x = 0;
      this.dv.y = 1;
    }
    if (event.key === 'a' && this.dv.x === 0) {
      this.dv.x = -1;
      this.dv.y = 0;
    }
    if (event.key === 'd' && this.dv.x === 0) {
      this.dv.x = 1;
      this.dv.y = 0;
    }
  }

  update() {
    this.position.x += this.dv.x;
    this.position.y += this.dv.y;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(this.position.x * this.tileSize, this.position.y * this.tileSize, this.tileSize, this.tileSize);
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
