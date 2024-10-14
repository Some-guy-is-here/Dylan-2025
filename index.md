---
layout: base
title: Student Home 
description: Home Page
image: /images/mario_animation (1).png
hide: true
---

<!-- Liquid:  statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav/home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %}

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>

<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking() {
      this.stopAnimate();
      this.animate(this.obj["Walk"], 3);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed === 0) {
          mario.startWalking();
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startPuffing();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed === 0) { // if at rest, go to walking
        mario.startWalking();
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      mario.startPuffing();
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>


My journey starts here. Ooga booga. Silly little bit of coding and tomfoolery. Dylan Cheadle
### markdown samples
using markdown from index.md, we are learning markdown.

-this text below is something called markdown. this is a heading inside of code scaffolding

## Investing in Your Technical Future

-this is an emphasis
 
Explore the Computer Science Pathway at Del Norte High School and invest in your technical skills. All Del Norte CompSci classes are designed to provide a real-world development experience. Class time includes tech talks (lectures), peer collaboration, communication with teachers, critical thinking while coding, and creativity in projects. Grading is focused on time invested, participation with peers, and engagement in learning.

markdown site: [https://www.markdownguide.org/getting-started/]

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENKr_h-AjZfkfe3QsZBQtGhqNwhSPyQco-HLbwHcTZDyZ6Vku:https://i.redd.it/mjxkyrpvve5a1.jpg&amp;s" alt="Peep the Horror : r/jerma985"/>![image](https://github.com/user-attachments/assets/95a7e488-85b3-48f1-8966-eb4486099c31)

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGE2Uc0TNkjcq6D4ICneTIwUSxhjkq0Tnh3_MtNhYpElSNWCv:https://preview.redd.it/yippee-finaly-v0-4l2zscbg5szc1.png%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D73cbdd7fa741391d0c8d90b8c25501ba14d2dd27&amp;s" alt="Yippee finaly!! : r/KukiShinobuMains"/>![image](https://github.com/user-attachments/assets/faa980ac-4336-4a53-8796-c94acd7cd092)

<img src="https://fbi.cults3d.com/uploaders/16600790/illustration-file/16a0b6ea-d282-444a-b222-5853ccd49e35/IMG_0316.webp" alt="Free OBJ file Boykisser keychain - You like kissing boys don&#39;t you 🗝️  (SVG)・3D printer design to download・Cults"/>![image](https://github.com/user-attachments/assets/d83add17-5522-4489-b1a6-f291d8cea92e)

<img src="https://us-tuna-sounds-images.voicemod.net/13e358e4-8406-4d0a-a724-b89c38e64a0a-1701486070717.jpg" alt="Omni man Meme by SubHarmonicPreampTape39672 Sound Effect - Tuna"/>![image](https://github.com/user-attachments/assets/ef4def0a-b4f6-44db-8523-962c04ccc40f)
:D
