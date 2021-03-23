import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  constructor(param) {
    super({ key: "TitleScene" });
  }

  preload() {}

  create() {
    this.add.text(0, 0, "This scene is the TitleScene", {
      font: "20pt Arial",
    });

    const playButton = this.add
      .text(640, 360, "Play", {
        font: "30pt Arial",
      })
      .setInteractive();

    playButton.on(
      "pointerdown",
      () => {
        // Start scene based on the key defined on the class constructor
        this.scene.start("ModeSelectionScene");
      },
      this
    );
  }
}

export default TitleScene;
