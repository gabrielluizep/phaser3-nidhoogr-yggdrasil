// Importing Phaser modules
import Phaser from "phaser";

// Creating Scene
class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      // Assigning a key to the scene
      key: "TitleScene",
    });
  }

  // Preload assets
  preload() {}

  // Create all that will be used in the scene
  create() {
    // Adding interactive text to turn fullscreen
    this.add
      .text(0, 0, "Toggle Fullscreen", {
        font: "20pt Arial",
      })
      .setInteractive()
      .on("pointerdown", () => {
        !this.scale.isFullscreen
          ? this.scale.startFullscreen()
          : this.scale.stopFullscreen();
      });

    // Creating play interactive text
    this.add
      .text(640, 360, "Play", {
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

export default TitleScene;
