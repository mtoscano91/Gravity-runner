class Background {
  constructor() {
    this.imgs = [
      {
        src: loadImage("../w2d5/p5funLecture/assets/background/plx-1.png"),
        x: 0,
        speed: 0,
      },
      {
        src: loadImage("../w2d5/p5funLecture/assets/background/plx-2.png"),
        x: 0,
        speed: 1,
      },
      {
        src: loadImage("../w2d5/p5funLecture/assets/background/plx-3.png"),
        x: 0,
        speed: 2,
      },
      {
        src: loadImage("../w2d5/p5funLecture/assets/background/plx-4.png"),
        x: 0,
        speed: 3,
      },
      {
        src: loadImage("../w2d5/p5funLecture/assets/background/plx-5.png"),
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
