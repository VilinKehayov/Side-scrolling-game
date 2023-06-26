import * as PIXI from "pixi.js";
import { GameScreen } from "./GameScreen";

export class StartScreen {
  private container: PIXI.Container;
  public playButton: PIXI.Sprite;
  private app: PIXI.Application;

  constructor(app: PIXI.Application, playButtonTexture: PIXI.Texture) {
    this.app = app;

    this.container = new PIXI.Container();
    this.playButton = new PIXI.Sprite(playButtonTexture);
    this.playButton.anchor.set(0.5);
    this.playButton.scale.set(0.5); // Set the scale to 0.5 (half the original size)
    this.playButton.x = app.screen.width / 2;
    this.playButton.y = app.screen.height / 2;
    this.playButton.interactive = true;
    
    this.playButton.on("pointertap", this.startGame.bind(this));

    this.container.addChild(this.playButton);
  }

  public show() {
    this.app.stage.addChild(this.container);
  }

  public hide() {
    this.app.stage.removeChild(this.container);
  }

  private startGame() {
    this.hide(); // Hide the start screen

    const gameScreen = new GameScreen(this.app); // Instantiate the GameScreen
    gameScreen.show(); // Show the game screen
  }
}
