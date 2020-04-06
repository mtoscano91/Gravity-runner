class Game {
  constructor() {
    this.level = 1;
    this.obstacles = [];
    this.coins = [];
  }

  init() {
    this.background = new Background();
    this.player = new Player();
  }

  setup() {
    this.player.setup();
  }

  create(clase, ratio, array) {
    if (frameCount % ratio === 0) {
      array.push(new clase());
    }
  }
  display() {
    clear();
    this.background.display();
    this.player.display();

    //Obstacles
    this.create(Obstacles, 100, this.obstacles);

    //DISPLAYING ALL OF THE OBSTACLES
    this.obstacles.forEach((obstacle) => {
      obstacle.display();
    });

    this.obstacles = this.obstacles.filter((obstacle) => {
      return !obstacle.checkCollision(this.player);
    });

    //Coins
    this.create(Coins, 150, this.coins);

    this.coins.forEach((coin) => {
      coin.display();
    });

    this.coins = this.coins.filter((coin) => {
      return !coin.checkCollision(this.player);
    });
  }
}
