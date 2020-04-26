import Snake from './snake'

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.gameOver = false;

    this.tileSize = 8;
    this.gridSize = {x: 20, y: 20};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;

    this.startPosition = {
      x: this.getRandomInt(3, this.gridSize.x),
      y: Math.floor(Math.random() * this.gridSize.y)
    };

    this.apple = {
      x: Math.floor(Math.random() * this.gridSize.x),
      y: Math.floor(Math.random() * this.gridSize.y)
    };

    this.snake = new Snake(this.startPosition, this.tileSize, this.ctx);

    window.addEventListener('keypress', this.handleKeyPress.bind(this));

    setInterval(this.update.bind(this), 250);
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
    if(this.gameOver) return;

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

    if (this.isSnakeCollidingWithApple()) {
      this.respawnApple();
      this.snake.extend = true;
    }

    if (this.isSnakeCollidingWithSelf()) {
      this.gameOver = true;
    }

  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw(this.tileSize);
    this.drawApple();
  }

  run() {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  isSnakeCollidingWithSelf() {
    for (const cell of this.snake.cells) {
      if (cell.x === this.snake.position.x && cell.y === this.snake.position.y) {
        return true;
      }
    }

    return false;
  }

  isSnakeCollidingWithApple() {
    return this.snake.position.x === this.apple.x && this.snake.position.y === this.apple.y;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  drawApple() {
    this.ctx.fillStyle = "#7CFC00";
    this.ctx.fillRect(this.apple.x * this.tileSize, this.apple.y * this.tileSize, this.tileSize, this.tileSize);
  }

  respawnApple() {
    this.apple.x = Math.floor(Math.random() * this.gridSize.x);
    this.apple.y = Math.floor(Math.random() * this.gridSize.y);

    if (this.snake.position.x === this.apple.x && this.snake.position.y === this.apple.y) {
      this.respawnApple();
    }

    for (const cell of this.snake.cells) {
      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.respawnApple();
      }
    }
  }

}
