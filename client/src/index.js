import Phaser from "phaser";

import GameScene from "./scenes/GameScene";
import TitleScene from "./scenes/TitleScene";
import ModeSelectionScene from "./scenes/ModeSelectionScene";

const config = {
  type: Phaser.AUTO,

  parent: "phaser-example",

  width: 1280,
  height: 720,
  autoCenter: Phaser.Scale.CENTER_BOTH,

  physics: {
    default: "arcade",
  },

  scene: [TitleScene, ModeSelectionScene, GameScene],
};

const game = new Phaser.Game(config);
