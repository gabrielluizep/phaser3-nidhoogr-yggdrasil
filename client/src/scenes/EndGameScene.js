import Phaser from "phaser";

class EndGameScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndGameScene" });
  }

  preload() {}

  create() {
    this.add.text(640, 300, "You died!", {
      font: "40pt Arial",
    });

    this.add
      .text(640, 360, "Restart", {
        font: "30pt Arial",
      })
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          // Start scene based on the key defined on the class constructor
          this.scene.start("ModeSelectionScene");
        },
        this
      );
  }
}

export default EndGameScene;
