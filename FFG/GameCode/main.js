// main.js

frameCounter = 0; // global counter to be incremented every time game loop runs

window.onload = function() {
  // Set up the canvas
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Load the background texture (64x64 image)
  // path is relative to the index.html file 
  const backgroundTile = new Image();
  backgroundTile.src = "FFG/assets/backgroundTile.png";  // Path to your 64x64 px tile texture

  // Load the sprite sheet
  const spriteSheet = new Image();
  spriteSheet.src = "FFG/assets/NishtalIdle.png";  // Adjust path to your sprite sheet

  const frameWidth = 96;  // Width of one frame in the sprite sheet
  const frameHeight = 96; // Height of one frame
  const spriteSpeed = 4;  // Speed of movement
  let x = 100, y = 100;   // Starting position of the sprite
  const spriteFrames = 63;

  // Key state object to track WASD keys
  let keyState = {
    left: false,
    right: false,
    up: false,
    down: false
  };
  let facingRight = true

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
    x = Math.min(x, 640-frameWidth)
    y = Math.min(y, 640-frameHeight)
    x = Math.max(x, 0)
    y = Math.max(y, 0)

    // Draw the sprite on the canvas
    drawSprite(x, y);

    // Keep the game loop running
    requestAnimationFrame(gameLoop);
    frameCounter += 1
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
    sWidth = 320;
    sHeight = 320;
    // 63 horizontal frames, each frame is a different instance in time
    spriteFrame_h = Math.floor(frameCounter / 12.5)%spriteFrames;
    // 2 vertical frames, 0 is facing right, 1 is facing left
    spriteFrame_v = 0;
    
    // if facing left, choose the lower set of animation frames, and run through them in reverse
    if(facingRight == false) {
      spriteFrame_h = spriteFrames - (spriteFrame_h+1)
      spriteFrame_v = 1
    }
    frameX = spriteFrame_h * 320
    frameY = spriteFrame_v * 320
    //  s=source, d=destination
    //  Nishtalidle.png (source) is 8000x320 = 5*(1600x64) = 5*[(spriteFrames*64)x64]
    //  drawImage(  image,        sx,    sy  , sWidth, sHeight, dx,dy,  dWidth   ,   dHeight  )
    ctx.drawImage(spriteSheet, frameX, frameY, sWidth, sHeight, x, y, frameWidth, frameHeight);
  }

  // Handle keyboard input
  window.addEventListener("keydown", (e) => {
    if (e.key === "a" || e.key=== "ArrowLeft" ) {
      keyState.left = true
      facingRight = false
    }
    if (e.key === "d" || e.key=== "ArrowRight" ) {
      keyState.right = true;
      facingRight = true
    }
    if (e.key === "w" || e.key=== "ArrowUp" ) {
      keyState.up = true;
    }
    if (e.key === "s" || e.key=== "ArrowDown" ) {
      keyState.down = true;
    }
  });

  // Handle keyup events to stop movement when keys are released
  window.addEventListener("keyup", (e) => {
    if (e.key === "a" || e.key=== "ArrowLeft" ) {
      keyState.left = false;
    }
    if (e.key === "d" || e.key=== "ArrowRight" ) {
      keyState.right = false;
    }
    if (e.key === "w" || e.key=== "ArrowUp" ) {
      keyState.up = false;
    }
    if (e.key === "s" || e.key=== "ArrowDown" ) {
      keyState.down = false;
    }
  });
    
      
};

      
