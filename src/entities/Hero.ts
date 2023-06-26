import * as PIXI from "pixi.js";
import { GameScreen } from "../screens/GameScreen";

export class Hero {
  private sprite: PIXI.Sprite;
  private speed: number;
  private keysDown: Set<string>;
  private gameScreen: GameScreen;
  public horizontalMovement: number = 0; // Initialize horizontalMovement property
  public verticalMovement: number = 0; // Initialize verticalMovement property

  constructor(
    texture: PIXI.Texture,
    x: number,
    y: number,
    scale: number,
    gameScreen: GameScreen
  ) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.scale.set(scale);

    this.speed = 5;
    this.keysDown = new Set<string>();
    this.gameScreen = gameScreen;

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public update(
    delta: number,
    horizontalMovement: number,
    verticalMovement: number
  ): void {
    const appWidth = this.gameScreen.app.screen.width;
    const appHeight = this.gameScreen.app.screen.height;

    const nextX = this.sprite.x + this.speed * delta * horizontalMovement;
    const nextY = this.sprite.y + this.speed * delta * verticalMovement;

    // Check horizontal boundaries
    if (nextX - this.sprite.width * 0.5 >= 0 && nextX + this.sprite.width * 0.5 <= appWidth) {
      this.sprite.x = nextX;
    }

    // Check vertical boundaries
    if (nextY - this.sprite.height * 0.5 >= 0 && nextY + this.sprite.height * 0.5 <= appHeight) {
      this.sprite.y = nextY;
    }
  }

  public handleKeyDown(event: KeyboardEvent): void {
    // Handle key down event
    this.keysDown.add(event.key);
    this.updateMovement();
  }

  public handleKeyUp(event: KeyboardEvent): void {
    // Handle key up event
    this.keysDown.delete(event.key);
    this.updateMovement();
  }

  public updateMovement(): void {
    this.horizontalMovement = 0;
    this.verticalMovement = 0;

    if (this.isKeyDown("ArrowUp")) {
      this.verticalMovement -= 1;
    }
    if (this.isKeyDown("ArrowDown")) {
      this.verticalMovement += 1;
    }
    if (this.isKeyDown("ArrowLeft")) {
      this.horizontalMovement -= 1;
    }
    if (this.isKeyDown("ArrowRight")) {
      this.horizontalMovement += 1;
    }
  }

  private isKeyDown(key: string): boolean {
    // Check if a key is currently being pressed
    return this.keysDown.has(key);
  }
}
