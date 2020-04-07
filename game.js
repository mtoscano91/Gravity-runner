class Game {
  constructor() {
    this.level = 1;
    this.obstacles = [];
    this.coins = [];
    this.bullets = [];
    this.score = 0;
    this.lives = 3;
  }

  init() {
    this.background = new Background();
    this.player = new Player();
  }

  setup() {
    this.player.setup();
  }

  create(type, ratio, array) {
    if (frameCount % ratio === 0) {
      array.push(new type());
    }
  }
  display() {
    clear();
    this.background.display();
    this.player.display();

    ///Levels logic

    ///Scores and lives logic
    if (this.lives === 0) noLoop();
    if (frameCount % 100 === 0) this.score++;

    document.querySelector(".player-score span").innerHTML = this.score;
    document.querySelector(".player-lives span").innerHTML = this.lives;
    document.querySelector(".player-level span").innerHTML = this.level;

    //Obstacles

    this.create(Obstacles, 100, this.obstacles);

    this.obstacles.forEach((obstacle) => {
      obstacle.display();
    });

    //What happens when they collide
    this.obstacles = this.obstacles.filter((obstacle) => {
      if (obstacle.checkCollision(this.player)) this.lives--;
      return !obstacle.checkCollision(this.player);
    });

    //Coins
    this.create(Coins, 150, this.coins);

    this.coins.forEach((coin) => {
      coin.display();
    });

    this.coins = this.coins.filter((coin) => {
      if (coin.checkCollision(this.player)) this.score += 5;
      return !coin.checkCollision(this.player);
    });

    //Bullets
    this.create(Bullets, 200, this.bullets);

    this.bullets.forEach((bullet) => {
      bullet.display();
    });

    // this.bullets = this.bullets.filter((bullet) => {
    //   if (bullet.checkCollision(this.player)) this.lives--;
    //   return !bullet.checkCollision(this.player);
    // });
  }
}
