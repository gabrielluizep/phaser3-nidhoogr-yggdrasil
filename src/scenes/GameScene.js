// Import Phaser module
import Phaser from 'phaser';

import * as audio from '../assets/audio';
// Importing assets
import * as images from '../assets/images';

// Create scene
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.audio('backgroundMusic', audio.runGameMusic);

    this.load.audio('jumpSound1', audio.jumpSound1);
    this.load.audio('jumpSound2', audio.jumpSound2);
    this.load.audio('jumpSound3', audio.jumpSound3);

    this.load.image('ground', images.ground);

    this.load.image('skyBackground', images.skyBackground);
    this.load.image('lowCloud', images.lowCloud);
    this.load.image('yggdrasil', images.yggdrasil);
    this.load.image('montainTips', images.montainTips);
    this.load.image('highClouds', images.highClouds);

    this.load.spritesheet('playerRun', images.playerRun, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('playerJump', images.playerJump, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    // Define canvas
    this.gameWidth = 1280;
    this.gameHeight = 640;

    // Adding music
    this.backgroundMusic = this.sound.add('backgroundMusic', {
      volume: 0.2,
      loop: true,
    });

    // Initiating music
    this.backgroundMusic.play();

    // Adding jump sounds
    this.jumpSound1 = this.sound.add('jumpSound1', {
      volume: 0.3,
    });

    this.jumpSound2 = this.sound.add('jumpSound2', {
      volume: 0.3,
    });

    this.jumpSound3 = this.sound.add('jumpSound3', {
      volume: 0.3,
    });

    // Creating array of jump sounds to random select
    this.jumpSound = [this.jumpSound1, this.jumpSound2, this.jumpSound3];

    // Adding static background
    this.add.image(0, 0, 'skyBackground').setOrigin(0, 0);
    this.add.image(0, 0, 'yggdrasil').setOrigin(0, 0);

    // Adding background parallax effect
    this.lowCloudBackground = this.add
      .tileSprite(0, 0, this.gameWidth, this.gameHeight, 'lowCloud')
      .setOrigin(0, 0);

    this.montainTipsBackground = this.add
      .tileSprite(0, 0, this.gameWidth, this.gameHeight, 'montainTips')
      .setOrigin(0, 0);

    this.highCloudsBackground = this.add
      .tileSprite(0, 0, this.gameWidth, this.gameHeight, 'highClouds')
      .setOrigin(0, 0);

    // Creating groups for the ground
    this.groundGroup = this.add.group({
      removeCallback: ground => {
        ground.scene.groundPool.add(ground);
      },
    });

    this.groundPool = this.add.group({
      removeCallback: ground => {
        ground.scene.groundGroup.add(ground);
      },
    });

    this.addGround(this.gameWidth, this.gameWidth / 2);

    this.player = this.physics.add
      .sprite(640, 360, 'playerRun')
      .setScale(2)
      .setBounce(0.05)
      .setGravityY(600);

    this.physics.add.collider(this.player, this.groundGroup);

    this.input.on('pointerdown', this.jump, this);

    this.anims.create({
      key: 'run',
      frameRate: 15,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('playerRun', {
        start: 1,
        end: 6,
      }),
    });

    this.anims.create({
      key: 'jump',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('playerJump', {
        start: 1,
        end: 8,
      }),
    });

    //
    // ----------
    // Add the score text
    //
    this.score = 0;
    this.scoreText = this.add
      .text(0, 0, '00000', {
        fill: '535353',
        font: '900 35px Courier',
        resolution: 5,
      })
      .setOrigin(0, 0);
    //
    //-------------
    // Calling the function
    //
    this.handleScore();
  }

  // Increase the score over the time
  handleScore() {
    this.time.addEvent({
      delay: 1000 / 10,
      loop: true,
      callbackScope: this,
      callback: () => {
        this.score++;

        const score = Array.from(String(this.score), Number);

        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }
        this.scoreText.setText(score.join(''));
      },
    });
  }

  jump() {
    if (this.player.body.touching.down) {
      const randomIndex = Math.floor(Math.random() * 3);

      this.jumpSound[randomIndex].play();

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
      ground = this.physics.add.sprite(posX, 600, 'ground');

      ground.setImmovable(true);
      ground.setVelocityX(-200);

      this.groundGroup.add(ground);
    }

    ground.displayWidth = groundWidth;

    this.nextGroundDistance = Phaser.Math.Between(100, 350);
  }

  update() {
    if (this.player.y > 720) {
      this.scene.start('EndGameScene');
      this.backgroundMusic.stop();
    }

    if (!this.player.body.touching.down) {
      this.player.anims.play('jump', true);
    } else {
      this.player.anims.play('run', true);
    }

    this.player.x = this.gameHeight;

    let minDistance = this.gameWidth;

    this.groundGroup.getChildren().forEach(ground => {
      const groundDistance =
        this.gameWidth - ground.x - ground.displayWidth / 2;

      minDistance = Math.min(minDistance, groundDistance);

      if (ground.x < -ground.displayWidth / 2) {
        this.groundGroup.killAndHide(ground);
        this.groundGroup.remove(ground);
      }
    }, this);

    if (minDistance > this.nextGroundDistance) {
      const nextGroundWidth = Phaser.Math.Between(100, 350);

      this.addGround(nextGroundWidth, this.gameWidth + nextGroundWidth / 2);
    }

    // Parallax
    this.lowCloudBackground.tilePositionX += 0.15;
    this.montainTipsBackground.tilePositionX += 0.1;
    this.highCloudsBackground.tilePositionX += 0.2;
  }
}

export default GameScene;
