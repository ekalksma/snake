import Snake from './snake'

export default class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.domElements = {
      startOverlay: document.getElementById('startOverlay'),
      playerScore: document.getElementById('playerScore'),
      gameOverlay: document.getElementById('gameOver-Overlay'),
      winText: document.querySelector('#winOverlay > .center h2')
    }

    this.hideDomElement(this.domElements.gameOverlay);
    this.hideDomElement(this.domElements.startOverlay);

    this.gameOver = false;
    this.isReadyForInput = true;

    this.tileSize = 8;
    this.gridSize = {x: 62, y: 37};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;

    this.startPosition = {
      x: Math.floor(Math.random() * (Math.floor(this.gridSize.x) - Math.ceil(3)) + 3),
      y: Math.floor(Math.random() * this.gridSize.y - 1)
    };

    this.apple = {};

    const applePosition = this.getRandomPosition();
    this.apple.x = applePosition.x;
    this.apple.y = applePosition.y;

    this.snake = new Snake(this.startPosition, this.tileSize, this.ctx);

    window.addEventListener('keypress', this.handleKeyPress.bind(this));

    setInterval(this.update.bind(this), 100);
  }

  handleKeyPress(event) {
    if (!this.isReadyForInput) {
      return;
    }

    if (event.key === 'w' && this.snake.dv.y === 0) {
      this.snake.dv.x = 0;
      this.snake.dv.y = -1;
      this.isReadyForInput = false;
    }
    if (event.key === 's' && this.snake.dv.y === 0) {
      this.snake.dv.x = 0;
      this.snake.dv.y = 1;
      this.isReadyForInput = false;
    }
    if (event.key === 'a' && this.snake.dv.x === 0) {
      this.snake.dv.x = -1;
      this.snake.dv.y = 0;
      this.isReadyForInput = false;
    }
    if (event.key === 'd' && this.snake.dv.x === 0) {
      this.snake.dv.x = 1;
      this.snake.dv.y = 0;
      this.isReadyForInput = false;
    }
  }

  update() {
    if (this.gameOver) return;

    if (!this.isReadyForInput) {
      this.isReadyForInput = true;
    }

    this.snake.update();

    if (this.IsOutOfBounds()) {
      this.gameOver = true;
    }

    if (this.isSnakeCollidingWithApple()) {
      this.respawnApple();
      this.snake.extend = true;
    }

    if (this.isSnakeCollidingWithSelf()) {
      this.gameOver = true;
    }

    this.keyPressed = false;
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

  IsOutOfBounds() {
    return this.snake.position.x > this.canvas.width / this.tileSize - 1   ||
           this.snake.position.y > this.canvas.height / this.tileSize  - 1 ||
           this.snake.position.x < 0 ||
           this.snake.position.y < 0 ;
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

  drawApple() {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(this.apple.x * this.tileSize, this.apple.y * this.tileSize, this.tileSize, this.tileSize);
  }

  respawnApple() {
    const applePosition = this.getRandomPosition();
    this.apple.x = applePosition.x;
    this.apple.y = applePosition.y;

    if (this.snake.position.x === this.apple.x && this.snake.position.y === this.apple.y) {
      this.respawnApple();
    }

    for (const cell of this.snake.cells) {
      if (cell.x === this.apple.x && cell.y === this.apple.y) {
        this.respawnApple();
      }
    }
  }

  showDomElement(element) {
    element.style.display = 'block';
  }

  hideDomElement(element) {
    element.style.display = 'none';
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * this.gridSize.x - 1),
      y: Math.floor(Math.random() * this.gridSize.y - 1)
    }
  }

}
