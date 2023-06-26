import * as PIXI from "pixi.js";

export class Projectile {
  private sprite: PIXI.Sprite;
  private speed: number;

  constructor(texture: PIXI.Texture, speed: number) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.speed = speed;
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public move(delta: number): void {
    this.sprite.x -= this.speed * delta;
  }

  public isOffscreen(screenWidth: number): boolean {
    return this.sprite.x + this.sprite.width < 0;
  }
}
