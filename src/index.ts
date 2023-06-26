import * as PIXI from "pixi.js";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { EndScreen } from "./screens/EndScreen";

// Create Pixi.js application
const app = new PIXI.Application();
document.body.appendChild(app.view as HTMLCanvasElement);

// Load assets and set up game screens
async function loadAssets(): Promise<void> {
  try {
    // Load textures
    const [
      backgroundTexture,
      playButtonTexture,
      restartButtonTexture,
      heroTexture,
      opponentTexture,
      obstacleTexture,
      projectileTexture,
    ] = await Promise.all([
      PIXI.Texture.from("assets/background.jpg"),
      PIXI.Texture.from("assets/play-button.png"),
      PIXI.Texture.from("assets/restart.png"),
      PIXI.Texture.from("assets/hero.png"),
      PIXI.Texture.from("assets/opponent.png"),
      PIXI.Texture.from("assets/drone.png"),
      PIXI.Texture.from("assets/fireball.png"),
    ]);

    // Set up game
    setupGame(
      backgroundTexture,
      playButtonTexture,
      restartButtonTexture,
      heroTexture,
      opponentTexture,
      obstacleTexture,
      projectileTexture
    );
  } catch (error) {
    console.error("Error loading assets:", error);
  }
}

function setupGame(
  backgroundTexture: PIXI.Texture,
  playButtonTexture: PIXI.Texture,
  restartButtonTexture: PIXI.Texture,
  heroTexture: PIXI.Texture,
  opponentTexture: PIXI.Texture,
  obstacleTexture: PIXI.Texture,
  projectileTexture: PIXI.Texture
): void {
  let startScreen: StartScreen;
  let gameScreen: GameScreen;
  let endScreen: EndScreen;

  function startGame(): void {
    startScreen.hide();

    // Create game screen
    gameScreen = new GameScreen(app);
    gameScreen.show();

    // Game loop
    app.ticker.add((delta) => {
      gameScreen.update(delta);
    });
  }

  function gameOver(): void {
    // Remove game screen and stop game loop
    gameScreen.hide();
    app.ticker.stop();

    // Show end screen
    endScreen.show();
  }

  function restartGame(): void {
    // Hide end screen
    endScreen.hide();

    // Start game again
    startGame();
  }

  // Instantiate screens
  startScreen = new StartScreen(app, playButtonTexture);

  const restartButtonSprite = new PIXI.Sprite(restartButtonTexture);
  restartButtonSprite.interactive = true;
  restartButtonSprite.on("click", restartGame);
  restartButtonSprite.position.set(20, 20);

  endScreen = new EndScreen(app, restartButtonTexture);

  // Add click event listener to play button
  startScreen.playButton.on("click", startGame);

  // Show start screen
  startScreen.show();
}

loadAssets();
