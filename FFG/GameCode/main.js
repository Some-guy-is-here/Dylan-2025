// main.js

// Set up the canvas and other game initialization inside window.onload
window.onload = function() {
  // Set up the canvas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Example game logic (Move and render sprite)
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

  // Load the sprite sheet and start the game loop when it's ready
  spriteSheet.onload = function() {
    // Start the game loop after the sprite sheet is loaded
    requestAnimationFrame(gameLoop);
  };

  // Main game loop
  function gameLoop() {
    // Update sprite position based on WASD keys
    if (keyState.left) x -= spriteSpeed;
    if (keyState.right) x += spriteSpeed;
    if (keyState.up) y -= spriteSpeed;
    if (keyState.down) y += spriteSpeed;

    // Clear the canvas and redraw the empty map and sprite
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSprite(x, y);

    // Keep the game loop running
    requestAnimationFrame(gameLoop);
  }

  // Draw the sprite on the canvas
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
