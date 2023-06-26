import * as PIXI from "pixi.js";

export class Obstacle {
  private sprite: PIXI.Sprite;

  constructor(texture: PIXI.Texture, x: number, y: number, scale: number) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.scale.set(scale);
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public moveX(speed: number): void {
    this.sprite.x -= speed;
  }
}
