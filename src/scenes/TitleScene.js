// -------------------------
// Importing Phaser modules
import Phaser from "phaser";
// -------------------------

// -------------------------
// Creating Scene
class TitleScene extends Phaser.Scene {
  // -------------------------
  // Constructing class state
  constructor() {
    // Super make all the methods and properties of
    // the parent class usable on the childreen class
    super({
      // Assigning a key to the scene to locate when called
      key: "TitleScene",
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

    // -------------------------
    // Create a text on the x=640(first parameter)
    // and y=360 (second parameter) with the
    // text 'Play' written (third parameter)
    // and set the styling to the text (fourth parameter).
    // Stored on a class propiertie to use inside the class
    this.add
      .text(640, 360, "Play", {
        font: "30pt Arial",
      })
      // Enable interacting with the text
      .setInteractive()
      // Create a listener on the text 'Play'
      // when the event on the text matches 'pointerdown' (first parameter)
      // execute the a function (second parameter) and define
      // the scope of event listening (third parameter)
      .on(
        "pointerdown",
        () => {
          // Start a scene based on the key defined on the class constructor
          this.scene.start("ModeSelectionScene");
        },
        this
      );
  }
}
// -------------------------
// Export as default of the file the scene
export default TitleScene;
// -------------------------

// *
// *
// *
