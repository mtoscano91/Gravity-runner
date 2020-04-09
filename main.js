let game = new Game();
game.highScore = localStorage.getItem("gameScore") || 0;
let myVar;

function preload() {
  //MUSICA + IMAGENES + INICIALIZAR EL GAME. POR Q NEW GAME NO VIENE ACA?
  game.init();
  game.musicIcon = loadImage("./assets/music-icon-removebg-preview copy.png");
  soundFormats("mp3", "ogg", "wav");
  bgMusic = loadSound(
    "./sounds/music/Komiku_-_24_-_Time_to_go_to_space_now_.mp3"
  );
  collisionSound = loadSound("./sounds/collision/qubodup-crash.ogg");
  lvlUpSound = loadSound("./sounds/Level Up!/piano.wav");
}

function setup() {
  //SETUP EL GAME + COND INICIALES
  createCanvas(
    800,
    400
    // game.background.imgs[0].src.width,
    // game.background.imgs[0].src.height
  );
  game.setup();

  setInterval(() => {
    bgMusic.play();
  }, 81000);
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
    game.player.gravityLeft();
  }
  //RIGHT 39
  if (keyCode === 39) {
    game.player.gravityRight();
  }
  //Space bar
  if (keyCode === 32 && game.finished === true) {
    window.location.reload();
  }
  if (keyCode === 32 && !game.started) {
    bgMusic.play();
    game.started = true;
    loop();
  }

  if (keyCode === 77) {
    game.music = !game.music;
    if (bgMusic.isPlaying()) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
  }
}
