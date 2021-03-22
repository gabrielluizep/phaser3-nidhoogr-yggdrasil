import Phaser from "phaser";

import * as assets from "../assets";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player", assets.player);
    this.load.image("ground", assets.ground);
  }

  create() {
    const sceneInformation = this.add.text(
      0,
      0,
      "This scene is the GameScene",
      {
        font: "20pt Arial",
      }
    );

    this.groundGroup = this.add.group({
      removeCallback: (ground) => {
        ground.scene.groundPool.add(ground);
      },
    });

    this.groundPool = this.add.group({
      removeCallback: (ground) => {
        ground.scene.groundGroup.add(ground);
      },
    });

    this.addGround(1280, 1280 / 2);

    // const ground = this.physics.add.staticGroup();

    // ground
    //   .create(0, 400, "ground")
    //   .setScale(5, 1)
    //   .setOrigin(0, 0)
    //   .refreshBody();

    this.player = this.physics.add.sprite(640, 360, "player");

    this.player.setBounce(0.05);
    this.player.setGravityY(600);
    this.player.setVelocityX(100);

    this.physics.add.collider(this.player, this.groundGroup);

    // this.physics.add.collider(player, ground);

    this.input.on(
      "pointerdown",
      () => {
        if (this.player.body.touching.down) {
          this.player.setVelocityX(50);
          this.player.setVelocityY(5000000);
        }
      },
      this
    );
  }

  addGround(groundWidth, posX) {
    let ground;

    if (this.groundPool.getLength()) {
      ground = this.groundPool.getFirst();

      ground.x = posX;

      ground.active = true;
      ground.visible = true;

      this.groundPool.remove(ground);
    } else {
      ground = this.physics.add.sprite(posX, 600, "ground");

      ground.setImmovable(true);
      ground.setVelocityX(-200);

      this.groundGroup.add(ground);
    }

    ground.displayWidth = groundWidth;

    this.nextGroundDistance = Phaser.Math.Between(100, 350);
  }

  update() {
    if (this.player.y > 720) {
      this.scene.start("GameScene");
    }

    this.player.x = 640;

    let minDistance = 1280;

    this.groundGroup.getChildren().forEach((ground) => {
      let groundDistance = 1280 - ground.x - ground.displayWidth / 2;

      minDistance = Math.min(minDistance, groundDistance);

      if (ground.x < -ground.displayWidth / 2) {
        this.groundGroup.killAndHide(ground);
        this.groundGroup.remove(ground);
      }
    }, this);

    if (minDistance > this.nextGroundDistance) {
      let nextGroundWidth = Phaser.Math.Between(100, 350);

      this.addGround(nextGroundWidth, 1280 + nextGroundWidth / 2);
    }
  }
}

export default GameScene;
