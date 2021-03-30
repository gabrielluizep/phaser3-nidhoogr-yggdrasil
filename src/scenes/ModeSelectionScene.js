// -------------------------
// Import Phaser modules
import Phaser from "phaser";

// -------------------------
// Create scene
class ModeSelectionScene extends Phaser.Scene {
  // -------------------------
  // Constructing class state
  constructor() {
    // Super make all the methods and properties of
    // the parent class usable on the childreen class
    super({
      // Assigning a key to the the scene to locate when called
      key: "ModeSelectionScene",
    });
  }
  // -------------------------

  // -------------------------
  // Preload assets
  preload() {}
  // -------------------------

  // -------------------------
  // Create the game
  create() {
    // -------------------------
    // Create a text
    this.add
      .text(640, 360, "Single Player", {
        font: "30pt Arial",
      })
      // Set the text interactive
      .setInteractive()
      // Add a listener, when the event occured
      // with the text matcher the firs parameter
      // execute the function on the second parameter
      .on(
        "pointerdown",
        () => {
          // Start a new scene
          this.scene.start("GameScene");
        },
        this
      );
    // -------------------------

    // -------------------------
    // Same as above
    this.add
      .text(640, 460, "Multiplayer", {
        font: "30pt Arial",
      })
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          alert("Mutliplayer não está funcionando ainda");

          // this.scene.start('LobbyScene');
        },
        this
      );
    // -------------------------
  }
}

// -------------------------
// Export as default of the file the scene
export default ModeSelectionScene;
// -------------------------

// *
// *
// *
