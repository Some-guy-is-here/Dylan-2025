// main.js

window.onload = function() {
  // Set up the canvas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Load the background texture (64x64 image)
  const backgroundTile = new Image();
  backgroundTile.src = "FFG/assets/backgroundTile.png";  // Path to your 64x64 px tile texture

  // Load the sprite sheet
  const spriteSheet = new Image();
  spriteSheet.src = "FFG/assets/Nishtalidle.png";  // Adjust path to your sprite sheet

  const frameWidth = 64;  // Width of one frame in the sprite sheet
  const frameHeight = 64; // Height of one frame
  const spriteSpeed = 5;  // Speed of movement
  let x = 100, y = 100;   // Starting position of the sprite

  // Key state object to track WASD keys
  let keyState = {
    left: false,
    right: false,
    up: false,
    down: false
  };

  // Load the sprite sheet and start the game loop after it's ready
  spriteSheet.onload = function() {
    requestAnimationFrame(gameLoop);
  };

  // Main game loop
  function gameLoop() {
    // Clear the canvas and redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the repeating background
    drawBackground();
    
    // Update sprite position based on WASD keys
    if (keyState.left) x -= spriteSpeed;
    if (keyState.right) x += spriteSpeed;
    if (keyState.up) y -= spriteSpeed;
    if (keyState.down) y += spriteSpeed;

    // Draw the sprite on the canvas
    drawSprite(x, y);

    // Keep the game loop running
    requestAnimationFrame(gameLoop);
  }

  // Function to draw the repeating background
  function drawBackground() {
    const tileWidth = 64;
    const tileHeight = 64;

    // Calculate how many tiles we need horizontally and vertically
    const numTilesX = Math.ceil(canvas.width / tileWidth);
    const numTilesY = Math.ceil(canvas.height / tileHeight);

    // Draw the tiles across the screen
    for (let i = 0; i < numTilesX; i++) {
      for (let j = 0; j < numTilesY; j++) {
        ctx.drawImage(backgroundTile, i * tileWidth, j * tileHeight, tileWidth, tileHeight);
      }
    }
  }

  // Function to draw the sprite on the canvas
  function drawSprite(x, y) {
    const frameX = 0; // Assuming drawing the first frame from the sprite sheet
    ctx.drawImage(spriteSheet, frameX, 0, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
  }

  // Handle keyboard input
  window.addEventListener("keydown", (e) => {
    if (e.key === "a") {
      keyState.left = true;
    }
    if (e.key === "d") {
      keyState.right = true;
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
};
