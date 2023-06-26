import * as PIXI from "pixi.js";

export class Background {
  private sprite: PIXI.TilingSprite;

  constructor(texture: PIXI.Texture, width: number, height: number, tileScaleX: number, tileScaleY: number) {
    this.sprite = new PIXI.TilingSprite(texture, width, height);
    this.sprite.tileScale.set(tileScaleX, tileScaleY);
  }

  public getSprite(): PIXI.TilingSprite {
    return this.sprite;
  }

  public moveX(speed: number): void {
    this.sprite.tilePosition.x -= speed;
  }
}
