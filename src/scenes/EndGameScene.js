import Phaser from "phaser";

class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGameScene" });
  }

  preload() {}

  create() {
    this.add
      .text(640, 300, "You died!", {
        font: "40pt Arial",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(640, 360, "Restart", {
        font: "30pt Arial",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on(
        "pointerdown",
        () => {
          this.scene.start("ModeSelectionScene");
        },
        this
      );
  }
}

export default EndGameScene;
