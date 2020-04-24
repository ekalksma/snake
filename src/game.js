class Game {
  constructor() {

  }

  update() {

  }

  draw() {

  }

  run() {
    this.update();
    this.draw();

    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
