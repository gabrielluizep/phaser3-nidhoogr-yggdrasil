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
    // Background Layers (inert)
    //

    // layer0
    this.add
      .image(0, 0, "layer0")
      //
      .setOrigin(0, 0);

    // layer2
    this.add
      .image(0, 0, "layer2")
      //
      .setOrigin(0, 0);

    //
    //  Parallax - Start
    //

    // Get the window sizes
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Find the center of the top space
    let topBackgroundXOrigin = windowWidth / 2.5;
    let topBackgroundYOrigin = (windowHeight / 5) * 2;
    let topBackgroundHeight = (windowHeight / 5) * 5;

    // Base width and height of the images
    let imageBaseWidth = 1280;
    let imageBaseHeight = 640;
    let heightRatio = topBackgroundHeight / imageBaseHeight;

    // Add each layer one by one

    // layer1
    this.hslayer1 = this.add.tileSprite(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      imageBaseWidth,
      imageBaseHeight,
      "layer1"
    );
    this.hslayer1.setScale(heightRatio);

    // layer3
    this.hslayer3 = this.add.tileSprite(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      imageBaseWidth,
      imageBaseHeight,
      "layer3"
    );
    this.hslayer3.setScale(heightRatio);

    // layer4
    this.hslayer4 = this.add.tileSprite(
      topBackgroundXOrigin,
      topBackgroundYOrigin,
      imageBaseWidth,
      imageBaseHeight,
      "layer4"
    );
    this.hslayer4.setScale(heightRatio);
    //
    // Parallax - End
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

    // Test Parallax
    this.hslayer1.tilePositionX += 0.15;
    this.hslayer3.tilePositionX += 0.1;
    this.hslayer4.tilePositionX += 0.2;
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
