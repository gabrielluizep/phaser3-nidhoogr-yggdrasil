// Importing phaser module
import Phaser from 'phaser';

// Importing scenes

import EndGameScene from './scenes/EndGameScene';
import GameScene from './scenes/GameScene';
import LobbyScene from './scenes/LobbyScene';
import ModeSelectionScene from './scenes/ModeSelectionScene';
import TitleScene from './scenes/TitleScene';

// Setting game config
const config = {
  type: Phaser.AUTO,

  antialias: false,

  parent: 'phaser-example',

  // 1280x640 || 40x20(base 32x32)
  width: 1280,
  height: 640,
  autoCenter: Phaser.Scale.CENTER_BOTH,

  physics: {
    default: 'arcade',
  },

  scene: [TitleScene, ModeSelectionScene, GameScene, EndGameScene, LobbyScene],
};

// Starting the game
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const game = new Phaser.Game(config);
