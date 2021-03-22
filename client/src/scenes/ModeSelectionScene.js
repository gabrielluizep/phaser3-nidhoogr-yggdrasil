import Phaser from "phaser";

class ModeSelectionScene extends Phaser.Scene {
  constructor() {
    super({ key: "ModeSelectionScene" });
  }

  preload() {}

  create() {
    const sceneInformation = this.add.text(
      0,
      0,
      "This scene is the ModeSelectionScene",
      {
        font: "20pt Arial",
      }
    );

    const singlePlayerButton = this.add
      .text(640, 360, "Single Player", {
        font: "30pt Arial",
      })
      .setInteractive();

    singlePlayerButton.on(
      "pointerdown",
      () => {
        this.scene.start("GameScene");
      },
      this
    );

    const multiPlayerButton = this.add
      .text(640, 460, "Multiplayer", {
        font: "30pt Arial",
      })
      .setInteractive();

    multiPlayerButton.on(
      "pointerdown",
      () => {
        alert("Mutliplayer não está funcionando ainda");

        // this.scene.start(ModeSelectionScene);
      },
      this
    );
  }
}

export default ModeSelectionScene;
