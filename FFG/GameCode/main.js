// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid map parameters
const tileSize = 64; // Size of one grid tile (64x64)
const gridWidth = 10; // Number of columns in the map
const gridHeight = 10; // Number of rows in the map

// Set up the sprite sheet (replace with your own sprite sheet URL or path)
const spriteSheet = new Image();
spriteSheet.src = "assets/spriteSheet.png"; // Update the path to your sprite sheet

const frameWidth = 64; // Width of a single frame in the sprite sheet
const frameHeight = 64; // Height of a single frame
const spriteSpeed = 5; // Speed at which the sprite moves on the canvas

let x = 100, y = 100; // Starting position of the sprite on the canvas
let isFacingLeft = false; // Track whether the sprite is facing left or right

// Key state object to track if a key is being pressed
let keyState = {
  left: false,
  right: false,
  up: false,
  down: false
};

// Load the sprite sheet and start the game loop
spriteSheet.onload = function() {
  requestAnimationFrame(gameLoop);
};

// Game loop that runs continuously
function gameLoop() {
  // Update sprite position based on WASD keys
  if (keyState.left) x -= spriteSpeed;
  if (keyState.right) x += spriteSpeed;
  if (keyState.up) y -= spriteSpeed;
  if (keyState.down) y += spriteSpeed;

  // Prevent player from going outside the map grid
  x = Math.max(0, Math.min(x, (gridWidth - 1) * tileSize));
  y = Math.max(0, Math.min(y, (gridHeight - 1) * tileSize));

  // Clear the canvas and redraw the empty map and sprite
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap(); // Draw the map grid
  drawSprite(x, y); // Draw the sprite on the map

  // Keep the game loop running
  requestAnimationFrame(gameLoop);
}

// Draw the empty map (grid of tiles)
function drawMap() {
  for (let row = 0; row < gridHeight; row++) {
    for (let col = 0; col < gridWidth; col++) {
      ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize); // Draw a grid cell
    }
  }
}

// Draw the sprite with the correct facing direction
function drawSprite(x, y) {
  const frameX = 0; // Assuming we're drawing the first frame from the sprite sheet

  ctx.save(); // Save the current canvas state

  // Flip the sprite if the character is facing left
  if (isFacingLeft) {
    ctx.scale(-1, 1); // Flip the sprite horizontally
    ctx.drawImage(spriteSheet, frameX, 0, frameWidth, frameHeight, -x - frameWidth, y, frameWidth, frameHeight);
  } else {
    ctx.drawImage(spriteSheet, frameX, 0, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
  }

  ctx.restore(); // Restore the canvas state
}

// Handle keyboard input
window.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    keyState.left = true;
    isFacingLeft = true;  // Flip sprite to face left
  }
  if (e.key === "d") {
    keyState.right = true;
    isFacingLeft = false;  // Flip sprite to face right
  }
  if (e.key === "w") {
    keyState.up = true;
  }
  if (e.key === "s") {
    keyState.down = true;
  }
});

// Handle keyup events to stop movement when keys are released
window.addEventListener("keyup", (e) => {
  if (e.key === "a") {
    keyState.left = false;
  }
  if (e.key === "d") {
    keyState.right = false;
  }
  if (e.key === "w") {
    keyState.up = false;
  }
  if (e.key === "s") {
    keyState.down = false;
  }
});
