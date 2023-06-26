import * as PIXI from "pixi.js";
import { Background } from "../entities/Background";
import { Opponent } from "../entities/Opponent";
import { Obstacle } from "../entities/Obstacle";
import { Projectile } from "../entities/Projectile";
import { Hero } from "../entities/Hero";

export class GameScreen {
  public app: PIXI.Application;
  private background: Background;
  private hero: Hero;
  private opponent: Opponent;
  private obstacle: Obstacle;
  private projectiles: Projectile[];
  private score: number;
  private scoreText: PIXI.Text;
  private keysDown: Set<string>;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.background = new Background(
      PIXI.Texture.from("assets/background.jpg"),
      app.screen.width,
      app.screen.height,
      1,
      1
    );
    this.hero = new Hero(
      PIXI.Texture.from("assets/hero.png"),
      app.screen.width / 4,
      app.screen.height / 1.4,
      0.3,
      this
    );
    this.opponent = new Opponent(
      PIXI.Texture.from("assets/opponent.png"),
      (app.screen.width / 4) * 3,
      app.screen.height / 2,
      0.1,
      2000,
      3000,
      app
    );
    this.obstacle = new Obstacle(
      PIXI.Texture.from("assets/drone.png"),
      app.screen.width,
      app.screen.height / 2,
      0.02
    );
    this.projectiles = [];
    this.score = 0;
    this.scoreText = new PIXI.Text("", { fontSize: 32, fill: "white" });
    this.keysDown = new Set<string>();

    this.setupSprites();
    this.hide();

    window.addEventListener("keydown", (event: KeyboardEvent) =>
      this.handleKeyDown(event)
    );
    window.addEventListener("keyup", (event: KeyboardEvent) =>
      this.handleKeyUp(event)
    );
  }

  private setupSprites() {
    // Set up score text
    this.scoreText = new PIXI.Text("", { fontSize: 32, fill: "white" });
    this.scoreText.position.set(10, 10);
  }

  public show() {
    this.background.getSprite().visible = true;
    this.hero.getSprite().visible = true;
    this.opponent.getSprite().visible = true;
    this.obstacle.getSprite().visible = true;
    this.scoreText.visible = true;

    this.app.stage.addChild(this.background.getSprite());
    this.app.stage.addChild(this.hero.getSprite());
    this.app.stage.addChild(this.opponent.getSprite());
    this.app.stage.addChild(this.obstacle.getSprite());
    this.app.stage.addChild(this.scoreText);
  }

  public hide() {
    this.background.getSprite().visible = false;
    this.hero.getSprite().visible = false;
    this.opponent.getSprite().visible = false;
    this.obstacle.getSprite().visible = false;
    this.scoreText.visible = false;

    this.app.stage.removeChild(this.background.getSprite());
    this.app.stage.removeChild(this.hero.getSprite());
    this.app.stage.removeChild(this.opponent.getSprite());
    this.app.stage.removeChild(this.obstacle.getSprite());
    this.app.stage.removeChild(this.scoreText);
  }

  public update(delta: number) {
    // Update game objects
    this.opponent.update(delta, this.app.screen.width, this.app.screen.height, 5); // Update opponent's movement
    this.obstacle.moveX(2);
    this.updateProjectiles(delta);
  
    // Check for collisions
    this.checkCollisions();
  
    // Update score
    this.score += 1;
    this.scoreText.text = `Score: ${this.score}`;
  
    // Update sprite positions and properties
    this.background.moveX(1);
  
    // Update hero's position based on movement
    this.hero.update(delta, this.hero.horizontalMovement, this.hero.verticalMovement);
  }
  

  private updateProjectiles(delta: number) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.move(delta);

      // Check if projectile is offscreen
      if (projectile.isOffscreen(this.app.screen.width)) {
        // Remove projectile from the array and stage
        this.projectiles.splice(i, 1);
        this.app.stage.removeChild(projectile.getSprite());
      }
    }
  }

  private checkCollisions() {
    // Check collision between hero and opponent
    if (
      this.areSpritesColliding(this.hero.getSprite(), this.opponent.getSprite())
    ) {
      // Handle collision
      // ...
    }

    // Check collision between hero and obstacle
    if (
      this.areSpritesColliding(this.hero.getSprite(), this.obstacle.getSprite())
    ) {
      // Handle collision
      // ...
    }

    // Check collision between projectiles and opponent
    for (const projectile of this.projectiles) {
      if (
        this.areSpritesColliding(
          projectile.getSprite(),
          this.opponent.getSprite()
        )
      ) {
        // Handle collision
        // ...
      }
    }
  }

  private areSpritesColliding(
    spriteA: PIXI.Sprite,
    spriteB: PIXI.Sprite
  ): boolean {
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();
    return (
      boundsA.x + boundsA.width > boundsB.x &&
      boundsA.x < boundsB.x + boundsB.width &&
      boundsA.y + boundsA.height > boundsB.y &&
      boundsA.y < boundsB.y + boundsB.height
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    // Handle key down event
    this.keysDown.add(event.key);
    this.hero.updateMovement();
  }

  private handleKeyUp(event: KeyboardEvent): void {
    // Handle key up event
    this.keysDown.delete(event.key);
    this.hero.updateMovement();
  }
}
