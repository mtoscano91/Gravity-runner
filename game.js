class Game {
  constructor() {
    this.obstacles = [];
    this.pills = [];
    this.comets = [];
    this.score = 0;
    this.level = 1;
    this.lives = 3;
    this.finished = false;
    this.started = false;
    this.highScore = 0;
    this.immune = false;
    this.music = true;
  }

  init() {
    this.background = new Background();
    this.player = new Player();
  }

  setup() {
    this.player.setup();
  }

  create(type, ratio, array) {
    if (
      frameCount % Math.floor(ratio / (1 + this.level / 4)) === 0 &&
      frameCount > 1000
    ) {
      array.push(new type());
    }
  }

  checklvl() {
    let currentLevel = this.level;
    this.level = 1 + Math.floor(this.score / 50);
    if (this.level !== currentLevel) {
      lvlUpSound.play();
      if (this.lives !== 3) this.lives++;
    }
  }

  isGameStarted() {
    if (!this.started) {
      this.background.display();
      textAlign(CENTER, CENTER);
      fill("white");
      textSize(50);
      text("Gravity Runner", 400, 150);
      textSize(15);
      text(
        "Use gravity to help Major Tom recover his protein pills while avoiding the asteroids",
        400,
        210
      );
      textSize(30);
      text("Press SPACEBAR to start the game", 400, 310);
      noLoop();
    }
  }

  dashboardUpate() {
    if (this.lives <= 0) this.finished = true;
    if (frameCount > 700 && frameCount % 100 === 0) this.score++;
    if (this.score > this.highScore) this.highScore = this.score;

    fill("white");
    textSize(15);
    textAlign(CENTER, CENTER);
    text(`LEVEL: ${this.level}`, width / 5, 20);
    text(`LIVES: ${this.lives}`, (width * 2) / 5, 20);
    text(`SCORE: ${this.score}`, (width * 3) / 5, 20);
    text(`HIGHSCORE: ${this.highScore}`, (width * 4) / 5, 20);
    if (this.started) {
      text("M to mute music", 700, 375);
    }
  }

  isMusic() {
    if (this.music) {
      image(this.musicIcon, (width * 12) / 13, 10);
    }
  }

  collision(items) {
    if (!this.immune) {
      items.forEach((item) => {
        if (item.checkCollision(this.player)) {
          this.lives--;
          collisionSound.play();
          this.immune = true;
          setTimeout(() => {
            this.immune = false;
          }, 1500);
        }
      });
    }
  }

  isGameFinished() {
    if (this.finished) {
      clear();
      image(this.background.imgs[1].src, 0, 0);

      this.dashboardUpate();
      textAlign(CENTER, CENTER);
      fill("white");
      textSize(30);
      if (this.score === this.highScore) text("New Highscore!", 400, 80);
      text("Your score:", 240, 175);
      textSize(100);
      text(`${this.score}`, 400, 175);
      textSize(30);
      text("Press SPACEBAR to restart", 400, 310);
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
    this.player.display();
    this.isMusic();

    //Controls
    if (frameCount < 700 && game.started) {
      textAlign(CENTER, CENTER);
      fill("white");
      textSize(40);
      if (frameCount < 300) {
        text("With all 4 Arrow Keys", 400, 150);
        text("switch between gravities", 400, 250);
      } else if (frameCount < 600) {
        text("Try it out!", 400, 200);
      } else {
        text("GO!", 400, 200);
      }
    }

    ///Levels logic
    this.checklvl();

    ///Scores and lives logic
    this.dashboardUpate();

    //Obstacles
    this.create(Obstacles, 130, this.obstacles);

    this.obstacles.forEach((obstacle) => {
      obstacle.display();
    });

    this.collision(this.obstacles);

    //Pills
    this.create(Pills, 175, this.pills);

    this.pills.forEach((pill) => {
      pill.display();
    });

    this.pills = this.pills.filter((pill) => {
      if (pill.checkCollision(this.player)) this.score += 5;
      return !pill.checkCollision(this.player);
    });

    //Comets
    this.create(Comets, 200, this.comets);

    this.comets.forEach((comet) => {
      comet.display();
    });

    this.collision(this.comets);

    //Finish game
    this.isGameFinished();
  }
}
