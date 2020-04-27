import Snake from './snake'

export default class Game {
  constructor() {
    this.canvas = document.getElementById('snake-grid');
    this.ctx = this.canvas.getContext('2d');

    this.domElements = {
      playerScore: document.getElementById('snake-score'),
      startOverlay: document.getElementById('snake-start-screen'),
      gameOverlay: document.getElementById('snake-game-over-screen')
    }

    this.hideDomElement(this.domElements.gameOverlay);


    this.tileSize = 8;
    this.gridSize = {x: 62, y: 37};

    this.canvas.width = this.gridSize.x * this.tileSize;
    this.canvas.height = this.gridSize.y * this.tileSize;

    this.reset();

    window.addEventListener('keypress', this.handleKeyPress.bind(this));

    setInterval(this.update.bind(this), 100);
  }

  handleKeyPress(event) {
    if (!this.isReadyForInput) {
      return;
    }

    if (this.gameOver) {
      this.gameOver = false;
      this.hideDomElement(this.domElements.startOverlay);
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
      this.handleGameOver();
    }

    if (this.isSnakeCollidingWithApple()) {
      this.respawnApple();
      this.snake.extend = true;
      this.score++;
      this.updateDomElement(this.domElements.playerScore, `Score: ${this.score}`);
    }

    if (this.isSnakeCollidingWithSelf()) {
      this.handleGameOver();
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

  reset() {
    this.showDomElement(this.domElements.startOverlay);

    this.startPosition = {
      x: Math.floor(Math.random() * (Math.floor(this.gridSize.x) - Math.ceil(3)) + 3),
      y: Math.floor(Math.random() * this.gridSize.y - 1)
    };

    this.snake = new Snake(this.startPosition, this.tileSize, this.ctx);

    this.apple = {};
    const applePosition = this.getRandomPosition();
    this.apple.x = applePosition.x;
    this.apple.y = applePosition.y;

    this.score = 0;
    this.gameOver = true;
    this.isReadyForInput = true;

    this.updateDomElement(this.domElements.playerScore, `Score: ${this.score}`);
  }

  handleGameOver() {
    this.updateDomElement(this.domElements.gameOverlay, `Your Score: ${this.score}`);
    this.showDomElement(this.domElements.gameOverlay);
    this.isReadyForInput = false;
    this.gameOver = true;

    setTimeout( () => {
      this.isReadyForInput = true;
      this.hideDomElement(this.domElements.gameOverlay);
      this.reset();
    }, 3000)
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

  updateDomElement(element, text) {
    element.innerText = text;
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * this.gridSize.x),
      y: Math.floor(Math.random() * this.gridSize.y)
    }
  }

}
