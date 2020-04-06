let game = new Game();

function preload() {
  //MUSICA + IMAGENES + INICIALIZAR EL GAME. POR Q NEW GAME NO VIENE ACA?
  game.init();
}

function setup() {
  //SETUP EL GAME + COND INICIALES
  createCanvas(
    game.background.imgs[0].src.width,
    game.background.imgs[0].src.height
  );
  game.setup();
}

function draw() {
  //LA LOGICA Q ESTA FUNCIONANDO CONTINUAMENTE: game.display();
  game.display();
}

function keyPressed() {
  //UP
  if (keyCode === 38) {
    game.player.gravityUp();
  }
  //DOWN 40
  if (keyCode === 40) {
    game.player.gravityDown();
  }
  //LEFT 37
  if (keyCode === 37) {
    //game.player.gravityUp();
    game.player.gravityLeft();
  }
  //RIGHT 39
  if (keyCode === 39) {
    game.player.gravityRight();
  }
}
