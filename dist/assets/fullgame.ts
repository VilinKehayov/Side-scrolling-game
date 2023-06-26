// import * as PIXI from "pixi.js";

// // Create Pixi.js application
// const app = new PIXI.Application();
// document.body.appendChild(app.view as HTMLCanvasElement);

// // Create textures
// const playButtonTexture = PIXI.Texture.from("assets/play-button.png");
// const restartButtonTexture = PIXI.Texture.from("assets/restart.png");
// const backgroundTexture = PIXI.Texture.from("assets/background.jpg");
// const heroTexture = PIXI.Texture.from("assets/hero.png");
// const opponentTexture = PIXI.Texture.from("assets/opponent.png");
// const obstacleTexture = PIXI.Texture.from("assets/drone.png");
// const projectileTexture = PIXI.Texture.from("assets/fireball.png");

// // Create sprites
// const playButton = new PIXI.Sprite(playButtonTexture);
// const restartButton = new PIXI.Sprite(restartButtonTexture);
// const background = new PIXI.TilingSprite(
//   backgroundTexture,
//   app.screen.width,
//   app.screen.height
// );
// // Set sprite properties
// background.tileScale.set(
//   backgroundTexture.width / 5.8,
//   backgroundTexture.height / 5.2
// );
// const hero = new PIXI.Sprite(heroTexture);
// const opponent = new PIXI.Sprite(opponentTexture);
// const obstacle = new PIXI.Sprite(obstacleTexture);
// let opponentDirectionX = 0; // -1 for moving left, 0 for staying in the middle, 1 for moving right
// let opponentDirectionY = 1; // 1 for moving up, -1 for moving down
// let opponentTimer = 0;
// const opponentInterval = 2000; // Time interval in milliseconds for opponent's left/right movement

// // Create score text (hidden initially)
// const scoreText = new PIXI.Text("Score: 0", {
//   fontSize: 24,
//   fill: "white",
// });
// scoreText.position.set(10, 10);
// scoreText.visible = false; // Hide the score text initially

// // Set sprite properties
// playButton.anchor.set(0.5);
// playButton.x = app.screen.width / 2;
// playButton.y = app.screen.height / 2;
// playButton.scale.set(0.2);

// restartButton.anchor.set(0.5);
// restartButton.x = app.screen.width / 2;
// restartButton.y = app.screen.height / 2;
// restartButton.scale.set(0.2);
// restartButton.visible = false;

// background.position.set(0, 0);
// background.width = app.screen.width;
// background.height = app.screen.height;
// background.visible = false;

// hero.anchor.set(0.5);
// hero.x = app.screen.width / 4;
// hero.y = app.screen.height / 1.4;
// hero.scale.set(0.3);
// hero.visible = false;

// opponent.anchor.set(0.5);
// opponent.x = (app.screen.width / 4) * 3;
// opponent.y = app.screen.height / 2;
// opponent.scale.set(0.1);
// opponent.visible = false;

// obstacle.anchor.set(0.5);
// obstacle.scale.set(0.02);
// obstacle.visible = false;

// // Add sprites to stage
// app.stage.addChild(playButton);
// app.stage.addChild(restartButton);
// app.stage.addChild(background);
// app.stage.addChild(hero);
// app.stage.addChild(opponent);
// app.stage.addChild(obstacle);
// app.stage.addChild(scoreText);

// // Make the play button interactive
// playButton.interactive = true;
// restartButton.interactive = true;

// // Handle the play button click event
// playButton.on("pointertap", handlePlay);
// restartButton.on("pointertap", handleRestart);

// // Movement speed of the hero and background
// const speed = 5;
// const backgroundSpeed = 2;

// // Keep track of the hero's current position
// let heroPosition: PIXI.Point;

// // Keep track of the score
// let score = 0;

// // Keep track of the projectiles
// const projectiles: PIXI.Sprite[] = [];

// // Keep track of the obstacle
// let obstacleSpeed = 2;

// // Keep track of the opponent's movement direction
// let opponentDirection = 1; // 1 for moving up, -1 for moving down

// // Key states for hero movement
// const keys: { [key: string]: boolean } = {};

// // Listen for keyboard events
// window.addEventListener("keydown", (e) => (keys[e.key] = true));
// window.addEventListener("keyup", (e) => (keys[e.key] = false));

// // Check if two sprites are colliding
// function isColliding(spriteA: PIXI.Sprite, spriteB: PIXI.Sprite): boolean {
//   const a = spriteA.getBounds();
//   const b = spriteB.getBounds();
//   return (
//     a.x + a.width > b.x &&
//     a.x < b.x + b.width &&
//     a.y + a.height > b.y &&
//     a.y < b.y + b.height
//   );
// }

// // Game loop
// function gameLoop(delta: number) {
//   // Move the hero
//   if (keys["ArrowUp"] || keys["Up"]) {
//     hero.y -= speed;
//   }
//   if (keys["ArrowDown"] || keys["Down"]) {
//     hero.y += speed;
//   }
//   if (keys["ArrowLeft"] || keys["Left"]) {
//     hero.x -= speed;
//     background.tilePosition.x += speed;
//   }
//   if (keys["ArrowRight"] || keys["Right"]) {
//     hero.x += speed;
//     background.tilePosition.x -= speed;
//   }

//   // Keep the hero within the screen bounds
//   if (hero.y < 0) {
//     hero.y = 0;
//   }
//   if (hero.y > app.screen.height - hero.height) {
//     hero.y = app.screen.height - hero.height;
//   }
//   if (hero.x < 0) {
//     hero.x = 0;
//   }
//   if (hero.x > app.screen.width - hero.width) {
//     hero.x = app.screen.width - hero.width;
//   }

//   // Move the opponent up and down
//   opponent.y += speed * opponentDirectionY;

//   // Reverse the opponent's vertical direction when it reaches the top or bottom of the screen
//   if (opponent.y <= 0 || opponent.y >= app.screen.height - opponent.height) {
//     opponentDirectionY *= -1;
//   }

//   // Move the opponent left and right occasionally
//   opponentTimer += delta;
//   if (opponentTimer >= opponentInterval) {
//     opponentTimer = 0;
//     if (opponentDirectionX === 0) {
//       // Move opponent left or right
//       opponentDirectionX = Math.random() < 0.5 ? -1 : 1;
//     } else {
//       // Move opponent back to the middle of the screen
//       opponentDirectionX = 0;
//     }
//   }

//   opponent.x += speed * opponentDirectionX;

//   // Reverse the opponent's horizontal direction when it reaches the left or right side of the screen
//   if (opponent.x <= 0 || opponent.x >= app.screen.width - opponent.width) {
//     opponentDirectionX *= -1;
//   }

//   // Fire projectiles from the opponent towards the hero
//   if (Math.random() < 0.01) {
//     const projectile = new PIXI.Sprite(projectileTexture);
//     projectile.anchor.set(0.5);
//     projectile.x = opponent.x;
//     projectile.y = opponent.y;
//     projectile.scale.set(0.1);
//     projectiles.push(projectile);
//     app.stage.addChild(projectile);
//   }

//   // Move the projectiles towards the hero
//   projectiles.forEach((projectile) => {
//     projectile.x -= speed * 2;

//     // Check if the hero is hit by a projectile
//     if (isColliding(hero, projectile)) {
//       // Remove the projectile
//       app.stage.removeChild(projectile);
//       projectiles.splice(projectiles.indexOf(projectile), 1);

//       // End the game
//       endGame();
//     }

//     // Remove projectiles that go offscreen
//     if (projectile.x + projectile.width < 0) {
//       app.stage.removeChild(projectile);
//       projectiles.splice(projectiles.indexOf(projectile), 1);
//     }
//   });

//   // Check if the opponent collides with the hero
//   if (isColliding(hero, opponent)) {
//     // End the game
//     endGame();
//   }

//   // Move the obstacle towards the hero
//   obstacle.x -= obstacleSpeed;

//   // Check if the hero collides with the obstacle
//   if (isColliding(hero, obstacle)) {
//     // End the game
//     endGame();
//   }

//   // Update the score
//   score++;
//   scoreText.text = "Score: " + score;

//   // Move the background
//   background.tilePosition.x -= backgroundSpeed;

//   // Check if the obstacle goes offscreen
//   if (obstacle.x + obstacle.width < 0) {
//     // Randomize the obstacle's y position
//     obstacle.y = Math.random() * (app.screen.height - obstacle.height);
//     // Reset the obstacle's x position
//     obstacle.x = app.screen.width + obstacle.width;
//     // Increase the obstacle speed
//     obstacleSpeed += 0.1;
//   }
// }

// // Function to handle the play button click event
// function handlePlay() {
//   playButton.visible = false;
//   restartButton.visible = false;
//   background.visible = true;
//   hero.visible = true;
//   opponent.visible = true;
//   obstacle.visible = true;
//   scoreText.visible = true;

//   heroPosition = new PIXI.Point(hero.x, hero.y);
//   app.ticker.add(gameLoop);
// }

// // Function to handle the restart button click event
// function handleRestart() {
//   playButton.visible = false;
//   restartButton.visible = false;
//   background.visible = true;
//   hero.visible = true;
//   opponent.visible = true;
//   obstacle.visible = true;
//   scoreText.visible = true;

//   hero.x = heroPosition.x;
//   hero.y = heroPosition.y;

//   score = 0;
//   scoreText.text = "Score: " + score;

//   // Add the score text back to the stage
//   app.stage.addChild(scoreText);

//   opponentDirection = 1;
//   obstacleSpeed = 2;

//   projectiles.forEach((projectile) => app.stage.removeChild(projectile));
//   projectiles.length = 0;

//   app.ticker.add(gameLoop);
// }

// // Function to end the game
// function endGame() {
//   app.ticker.remove(gameLoop);
//   background.visible = false;
//   hero.visible = false;
//   opponent.visible = false;
//   obstacle.visible = false;
//   projectiles.forEach((projectile) => app.stage.removeChild(projectile));
//   projectiles.length = 0;

//   // Add a restart button
//   restartButton.visible = true;

//   // Remove the existing restart button click event listener
//   restartButton.removeAllListeners();

//   // Add a new click event listener for the restart button
//   restartButton.on("pointertap", handleRestart);

//   // Position the restart button
//   restartButton.x = app.screen.width / 2;
//   restartButton.y = app.screen.height / 2 + 50;

//   // Make the top left corner score visible
//   scoreText.visible = true;
// }

// // Start the game
// function startGame() {
//   playButton.visible = true;
// }

// // Initialize the game
// startGame();
