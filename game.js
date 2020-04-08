class Game {
  constructor() {
    this.obstacles = [];
    this.coins = [];
    this.comets = [];
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.finished = false;
    this.started = false;
    this.highScore = 0;
    this.immune = false;
  }

  init() {
    this.background = new Background();
    this.player = new Player();
  }

  setup() {
    this.player.setup();
  }

  create(type, ratio, array) {
    if (frameCount % Math.floor(ratio / (1 + this.level / 10)) === 0) {
      array.push(new type());
    }
  }

  checklvl() {
    let currentLevel = this.level;
    this.level = 1 + Math.floor(this.score / 50);
    if (this.level !== currentLevel && this.lives !== 3) this.lives++;
  }

  isGameStarted() {
    if (!game.started) {
      this.background.display();
      textAlign(CENTER, CENTER);
      fill("white");
      textSize(50);
      text("Gravity Runner", 400, 150);
      textSize(30);
      text("Press SPACEBAR to start the game", 400, 250);
      noLoop();
    }
  }

  dashboardUpate() {
    if (this.lives <= 0) this.finished = true;
    if (frameCount % 100 === 0) this.score++;
    if (this.score > this.highScore) this.highScore = this.score;

    fill("white");
    textSize(15);
    textAlign(CENTER, CENTER);
    text(`LEVEL: ${this.level}`, width / 5, 20);
    text(`LIVES: ${this.lives}`, (width * 2) / 5, 20);
    text(`SCORE: ${this.score}`, (width * 3) / 5, 20);
    text(`HIGHSCORE: ${this.highScore}`, (width * 4) / 5, 20);
  }

  collision(items) {
    if (!this.immune) {
      items.forEach((item) => {
        if (item.checkCollision(this.player)) {
          this.lives--;
          this.immune = true;
          setTimeout(() => {
            this.immune = false;
          }, 1500);
        }
      });
    }
  }

  isFinished() {
    if (this.finished) {
      clear();
      image(this.background.imgs[1].src, 0, 0);

      this.dashboardUpate();
      textAlign(CENTER, CENTER);
      fill("white");
      textSize(50);
      text("GAME OVER", 400, 150);
      textSize(30);
      text("Press SPACEBAR to restart", 400, 250);
      // setting the new score in the browser
      localStorage.setItem("gameScore", this.highScore);
      // we stop looping the whole game, if we wanted to reloop we can do use loop()
      noLoop();
    }
  }

  display() {
    clear();
    this.background.display();
    this.isGameStarted();

    if (this.immune) {
      if (frameCount % 5 === 0) { ///Controls stop working while this is true
        this.player.display();
      }
    } else {
      this.player.display();
    }

    ///Levels logic
    this.checklvl();

    ///Scores and lives logic
    this.dashboardUpate();

    //Obstacles
    this.create(Obstacles, 100, this.obstacles);

    this.obstacles.forEach((obstacle) => {
      obstacle.display();
    });

    this.collision(this.obstacles);

    //Coins
    this.create(Coins, 150, this.coins);

    this.coins.forEach((coin) => {
      coin.display();
    });

    this.coins = this.coins.filter((coin) => {
      if (coin.checkCollision(this.player)) this.score += 5;
      return !coin.checkCollision(this.player);
    });

    //Comets
    this.create(Comets, 200, this.comets);

    this.comets.forEach((comet) => {
      comet.display();
    });

    this.collision(this.comets);

    //Finish game
    this.isFinished();
  }
}
