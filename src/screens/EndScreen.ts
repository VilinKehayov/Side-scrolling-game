import * as PIXI from "pixi.js";
import { GameScreen } from "./GameScreen";

export class EndScreen {
  private container: PIXI.Container;
  public restartButton: PIXI.Sprite;
  private app: PIXI.Application;

  constructor(app: PIXI.Application, restartButtonTexture: PIXI.Texture) {
    this.app = app;

    this.container = new PIXI.Container();
    this.restartButton = new PIXI.Sprite(restartButtonTexture);
    this.restartButton.anchor.set(0.5);
    this.restartButton.scale.set(0.5); // Set the scale to 0.5 (half the original size)
    this.restartButton.x = app.screen.width / 2;
    this.restartButton.y = app.screen.height / 2;
    this.restartButton.interactive = true;
    
    this.restartButton.on("pointertap", this.restartGame.bind(this));

    this.container.addChild(this.restartButton);
  }

  public show() {
    this.app.stage.addChild(this.container);
  }

  public hide() {
    this.app.stage.removeChild(this.container);
  }

  private restartGame() {
    this.hide(); // Hide the end screen

    const gameScreen = new GameScreen(this.app); // Instantiate the GameScreen
    gameScreen.show(); // Show the game screen
  }
}
