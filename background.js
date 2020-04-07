class Background {
  constructor() {
    this.imgs = [
      {
        src: loadImage("/assets/background/Nebula Blue.png"),
        x: 0,
        speed: 0,
      },
      {
        src: loadImage("/assets/background/Stars Small_1.png"),
        x: 0,
        speed: 1,
      },
      {
        src: loadImage("/assets/background/Stars Small_2.png"),
        x: 0,
        speed: 2,
      },
      {
        src: loadImage("/assets/background/Stars-Big_1_1_PC.png"),
        x: 0,
        speed: 3,
      },
      {
        src: loadImage("/assets/background/Stars-Big_1_2_PC.png"),
        x: 0,
        speed: 4,
      },
    ];
  }

  display() {
    this.imgs.forEach((element) => {
      this.move(element);
    });
  }

  move(img) {
    img.x -= img.speed;
    image(img.src, img.x, 0);
    image(img.src, img.x + width, 0);
    if (img.x <= -width) {
      img.x = 0;
    }
  }
}
