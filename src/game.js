import Snake from './snake'

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.tileSize = 8;
    this.gridSize = {x: 20, y: 20};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;

    this.startPosition = {
      x: Math.floor(Math.random() * this.gridSize.x),
      y: Math.floor(Math.random() * this.gridSize.y)
    };

    this.snake = new Snake(this.startPosition, this.tileSize, this.ctx);
    this.snake.addCell();

    window.addEventListener('keypress', this.handleKeyPress.bind(this));

    setInterval(this.update.bind(this), 500);
  }

  handleKeyPress(event) {
    if (event.key === 'w' && this.snake.dv.y === 0) {
      this.snake.dv.x = 0;
      this.snake.dv.y = -1;
    }
    if (event.key === 's' && this.snake.dv.y === 0) {
      this.snake.dv.x = 0;
      this.snake.dv.y = 1;
    }
    if (event.key === 'a' && this.snake.dv.x === 0) {
      this.snake.dv.x = -1;
      this.snake.dv.y = 0;
    }
    if (event.key === 'd' && this.snake.dv.x === 0) {
      this.snake.dv.x = 1;
      this.snake.dv.y = 0;
    }
  }

  update() {
    this.snake.update();

    if (this.snake.position.x > this.canvas.width / this.tileSize - 1) {
      this.snake.position.x = 0;
    }

    if (this.snake.position.x < 0) {
      this.snake.position.x = this.canvas.width / this.tileSize - 1;
    }

    if (this.snake.position.y < 0) {
      this.snake.position.y = this.canvas.height / this.tileSize - 1;
    }

    if (this.snake.position.y > this.canvas.height / this.tileSize  - 1) {
      this.snake.position.y = 0;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw(this.tileSize);
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
