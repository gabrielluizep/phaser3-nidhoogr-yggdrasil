// Import Phaser modules
import Phaser from 'phaser';

// Create scene
class LobbyScene extends Phaser.Scene {
  constructor() {
    super({
      // Assigning a key to the the scene
      key: 'LobbyScene',
    });
  }

  // Preload assets
  preload() {}

  // Creating all that will be used in the scene
  create() {
    console.log('LobbyScene loaded');

    // Creating interactive text to go back to mode selection scene
    this.add
      .text(640, 460, 'Go back', {
        font: '30pt Arial',
      })
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on(
        'pointerdown',
        () => {
          this.scene.start('ModeSelectionScene');
        },
        this,
      );
  }
}

export default LobbyScene;
