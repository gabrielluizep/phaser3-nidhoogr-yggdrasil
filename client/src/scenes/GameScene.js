// -------------------------
// Import Phaser module
import Phaser from "phaser";
// -------------------------

// -------------------------
// Import all the exports on the file index.js on the
// assets folder as an object with directories location
import * as assets from "../assets";
// -------------------------

// -------------------------
// Create scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("ground", assets.ground);
    this.load.image("layer0", assets.layer0);
    this.load.image("layer1", assets.layer1);
    this.load.image("layer2", assets.layer2);
    this.load.image("layer3", assets.layer3);
    this.load.image("layer4", assets.layer4);

    // this.load.audio('backgroundMusic', assets.backgroundMusic)

    this.load.audio("jumpAudio", "../assets/audio/jump/jump_01.mp3");

    this.load.spritesheet("playerRun", assets.playerRun, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("playerJump", assets.playerJump, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // -------------------------
    //
    // this.sound.add('backgroundMusic').play
    // this.jumpAudio = this.sound.add("jumpAudio");
    // -------------------------

    // -------------------------
    // Parallax Layers
    //
    this.add
      .image(0, 0, "layer0")
      //
      .setOrigin(0, 0);

    // -------------------------
    //
    this.add
      .image(0, 0, "layer1")
      //
      .setOrigin(0, 0);

    // -------------------------
    //
    this.add
      .image(0, 0, "layer2")
      //
      .setOrigin(0, 0);

    // -------------------------
    //
    this.add
      .image(0, 0, "layer3")
      //
      .setOrigin(0, 0);

    // -------------------------
    //
    this.add
      .image(0, 0, "layer4")
      //
      .setOrigin(0, 0);

    //
    // --------------------
    //  TEST - PARALLAX
    /*
    this.hslayer1 = this.game.add.tileSprite(
      0,
      this.game.height - this.game.cache.getImage("layer1").height,
      this.game.width,
      this.game.cache.getImage("layer1").height,
      "layer1"
    );

    this.hslayer3 = this.game.add.tileSprite(
      0,
      this.game.height - this.game.cache.getImage("layer3").height,
      this.game.width,
      this.game.cache.getImage("layer3").height,
      "layer3"
    );

    this.hslayer4 = this.game.add.tileSprite(
      0,
      this.game.height - this.game.cache.getImage("layer4").height,
      this.game.width,
      this.game.cache.getImage("layer4").height,
      "layer4"
    );
    */
    //
    //
    //  TEST - PARALLAX
    // ---------------------
    //
    //
    //
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

    this.player = this.physics.add
      .sprite(640, 360, "playerRun")
      .setScale(1)
      .setBounce(0.05)
      .setGravityY(600)
      .setVelocityX(100);

    this.physics.add.collider(this.player, this.groundGroup);

    this.input.on("pointerdown", this.jump, this);

    this.anims.create({
      key: "run",
      frameRate: 15,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("playerRun", {
        start: 1,
        end: 8,
      }),
    });

    this.anims.create({
      key: "jump",
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers("playerJump", {
        start: 1,
        end: 8,
      }),
    });
  }

  jump() {
    if (this.player.body.touching.down) {
      // this.jumpAudio.play();
      this.player.setVelocityX(50);
      this.player.setVelocityY(5000000);
    }
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
      this.scene.start("EndGameScene");
    }

    if (!this.player.body.touching.down) {
      this.player.anims.play("jump", true);
    } else {
      this.player.anims.play("run", true);
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

    //
    // TEST - PARALLAX
    //
    /*
    this.hslayer1.tilePosition.x -= 0.05;
    this.hslayer3.tilePosition.x -= 0.3;
    this.hslayer4.tilePosition.x -= 0.75;
    */
  }
}
// -------------------------

// -------------------------
// Export as default of the file the scene
export default GameScene;
// -------------------------

// *
// *
// *
