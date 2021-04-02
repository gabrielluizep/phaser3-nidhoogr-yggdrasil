// Import Phaser modules
import Phaser from "phaser";

// Create scene
class ModeSelectionScene extends Phaser.Scene {
  constructor() {
    super({
      // Assigning a key to the the scene
      key: "ModeSelectionScene",
    });
  }

  // Preload assets
  preload() {}

  // Creating all that will be used in the scene
  create() {
    // Creating interactive text to enter single player scene
    this.add
      .text(640, 360, "Single Player", {
        font: "30pt Arial",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on(
        "pointerdown",
        () => {
          this.scene.start("GameScene");
        },
        this
      );

    // Creating interactive text to enter multiplayer scene
    this.add
      .text(640, 460, "Multiplayer", {
        font: "30pt Arial",
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on(
        "pointerdown",
        () => {
          this.scene.start("LobbyScene");
        },
        this
      );
  }
}

export default ModeSelectionScene;
