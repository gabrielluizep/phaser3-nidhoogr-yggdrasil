import Phaser from "phaser";

import * as assets from "../assets";

class Game extends Phaser.Scene {
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

    const ground = this.physics.add.staticGroup();

    ground
      .create(0, 400, "ground")
      .setScale(5, 1)
      .setOrigin(0, 0)
      .refreshBody();

    const player = this.physics.add.sprite(640, 360, "player");

    player.setBounce(0.05);
    player.setCollideWorldBounds(true);
    player.setGravityY(600);

    this.physics.add.collider(player, ground);

    this.input.on(
      "pointerdown",
      () => {
        if (player.body.touching.down) player.setVelocityY(5000000);
      },
      this
    );
  }

  update() {}
}

export default Game;
