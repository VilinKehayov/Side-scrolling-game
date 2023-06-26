import * as PIXI from "pixi.js";
import { Projectile } from "./Projectile";

export class Opponent {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;
  private speed: number;
  private fireDelay: number;
  private fireRate: number;
  private projectiles: Projectile[];

  private isMovingUp: boolean;
  private minY: number;
  private maxY: number;
  private moveDuration: number;
  private moveTimer: number;

  constructor(
    texture: PIXI.Texture,
    x: number,
    y: number,
    scale: number,
    fireRate: number,
    moveDuration: number,
    app: PIXI.Application

  ) {
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.scale.set(scale);
    this.app = app;

    this.speed = 2;
    this.fireDelay = 0;
    this.fireRate = fireRate;
    this.projectiles = [];

    this.isMovingUp = true;
    this.minY = 100;
    this.maxY = 500;
    this.moveDuration = moveDuration;
    this.moveTimer = 0;
  }

  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  public update(
    delta: number,
    screenWidth: number,
    screenHeight: number,
    projectileSpeed: number
  ): void {
    // Move the opponent up and down
    this.moveY(delta, screenHeight);

    // Update the fire delay
    this.fireDelay -= delta;

    // Fire projectiles at the specified fire rate
    if (this.fireDelay <= 0) {
      this.fireProjectile(projectileSpeed);
      this.fireDelay = 1000 / this.fireRate;
    }

    // Update the existing projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.move(delta);

      // Check if projectile is offscreen
      if (projectile.isOffscreen(screenWidth)) {
        // Remove projectile from the array
        this.projectiles.splice(i, 1);
        // Remove projectile sprite from the stage
        this.app.stage.removeChild(projectile.getSprite());
      }
    }
  }

  private moveY(delta: number, screenHeight: number): void {
    if (this.moveTimer >= this.moveDuration) {
      // Change movement direction after reaching move duration
      this.isMovingUp = !this.isMovingUp;
      this.moveTimer = 0;
    }

    const movementDistance = this.speed * delta;

    if (this.isMovingUp) {
      // Move up
      this.sprite.y -= movementDistance;
      if (this.sprite.y < this.minY) {
        // Clamp to the minimum Y position
        this.sprite.y = this.minY;
      }
    } else {
      // Move down
      this.sprite.y += movementDistance;
      if (this.sprite.y > this.maxY) {
        // Clamp to the maximum Y position
        this.sprite.y = this.maxY;
      }
    }

    this.moveTimer += delta;
  }

  private fireProjectile(projectileSpeed: number): void {
    // Create a new projectile
    const projectile = new Projectile(
      PIXI.Texture.from("assets/fireball.png"),
      this.sprite.x,
      
    );

    // Add the projectile to the array
    this.projectiles.push(projectile);
    // Add the projectile sprite to the stage
    // ...
  }
}
