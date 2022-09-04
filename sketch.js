/*

Stellar Orbit : A Gravity Simulator
by Soumen Mohanty

find the github link for this game at :

https://github.com/soumen02/IntrotoInteractiveMedia/blob/main/Mid%20Term%20Game/Stellar%20Orbit.md

Date : 10 March 2022

Music Credits: Stay by Hans Zimmer

*/


//game ends when this couter reaches zero
let crashlives = 50;

// launch velocity limit
let lim = 40;

//
let flag = 0,
  Arrowflag = 0;
let camfollow = false;
let bodies_array = [];

//smallest possible radius of bodies
let rad = 5;

// variable that keeps track of the starting position vector of the planet during launch (used to draw the arrow)
let start;

//list to load planet image objects
let planets = [];
//rock to load asteroid image object
let rock;

//Game stage counter
let stage = 0;

// loading all the image and sound assets in preload()
function preload() {
  astro = loadFont("assets/AstroSpace.otf");

  music = loadSound("assets/stay1.mp3");

  // bodies are loaded into the list for easier access
  let img1 = loadImage("assets/1.png");
  planets.push(img1);

  let img2 = loadImage("assets/2.png");
  planets.push(img2);

  let img3 = loadImage("assets/3.png");
  planets.push(img3);

  let img4 = loadImage("assets/4.png");
  planets.push(img4);

  let img5 = loadImage("assets/5.png");
  planets.push(img5);

  rock = loadImage("assets/rock.png");
}

//Class that gives all bodies their properties
class Body {
  constructor(x, y, rad, vel, type) {
    this.pos = createVector(x, y); //position vector

    this.mass = Math.pow(rad, 2.5) / 4; //making mass a function of radius
    this.vel = vel; //velocity
    this.acc = createVector(0, 0); //acceleration
    this.force = createVector(); //force
    this.r = rad; //radius of the body
    this.type = type; //asteroid, moon or planet?

    //imagine loaded based on radius
    if (rad <= 5) {
      this.image = rock;
      ++gameScore.rocks; //increments rocks counter for statistics
    } else {
      this.image = planets[Math.floor(Math.random() * planets.length)];  //planet image is randomly chosen 
      if (rad == 20) {
        ++gameScore.moons; //increments moons counter for statistics
      } else if (rad == 50) {
        ++gameScore.planets; //increments moons counter for statistics
      }
    }
  }

  // function to add and apply force on bodies
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  // function that makes bodies attract the other bodies
  attract(Body) {
    let force = p5.Vector.sub(this.pos, Body.pos);
    let distanceSq = constrain(force.magSq(), 10, 1000);
    let G = 0.05;  //gravitational constant
    let strength = (G * (this.mass * Body.mass)) / distanceSq;
    force.setMag(strength);
    Body.applyForce(force);
  }

  // function that removes a body on collision and increments collision statistics
  checkCollision(Body) {
    if (
      this.pos.dist(Body.pos) < this.r / 2 + Body.r / 2 &&
      this.mass >= Body.mass
    ) {
      ++gameScore.crash;
      return 1;
    }
  }

  // updates motion vectors for the body
  update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
  }

  // displays the body
  show() {
    noStroke();
    fill(79, 113, 255);
    ellipse(this.pos.x, this.pos.y, this.r);
    image(this.image, this.pos.x, this.pos.y, this.r, this.r);
  }
}

function setup() {
  createCanvas(900, 600);
  translate(width / 2, height / 2);
  
  // code to disable right click on canvas
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
    imageMode(CENTER);
    noCursor();
  }

  // Create background with randomized stars
  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star(
      random(width),
      random(height),
      random(255),
      random(0.1, 3),
      random(1)
    );

    // background music 
    if (!music.isPlaying()) {
      music.loop();
    }
  }

  textFont(astro);
  
  //gamescore object of Stats class keeps track of the statistics
  gameScore = new Stats();
}

function draw() {
  
  // a bit of a transparency setting to give the train effect
  background(0, 50);
  
  //display the array of stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].showStar();
  }

  // start screen of the game 
  if (stage == 0) {
    textAlign(CENTER, CENTER);
    textSize(65);
    fill(255);
    text("STELLAR", width / 2, height / 3);
    text("ORBIT", width / 2, height / 3 + 70);
    textSize(17);
    text("a gravity simulator", width / 2, height / 3 + 60 + 70);

    textAlign(RIGHT, CENTER);
    text(
      "Press any key to continue",
      width - 2 * (width / 100),
      95 * (height / 100)
    );
  } 
  
  // gameplay stage
  else if (stage == 1) {
    fill(255, 70);
    ellipse(mouseX, mouseY, rad);

    // displays the score on during gameplay
    gameScore.calculate();
    gameScore.display();

    // arrow display for the starting velocity of bodies
    if (Arrowflag == 1) {
      temp = p5.Vector.sub(start, createVector(mouseX, mouseY));
      drawArrow(createVector(mouseX, mouseY), temp.limit(lim));
    }
    // for loops that make every body in the array that affect every other body in the array
    for (let body of bodies_array) {
      for (let other of bodies_array) {
        if (body !== other) {  //so body doesnt attract itself
          body.attract(other);
          if (body.checkCollision(other)) {
            bodies_array.splice(bodies_array.indexOf(other), 1); //collision deletes one of the bodies
            break;
          }
        }
      }
    }
    //update the vecotrs for the bodies and show them on the screen
    for (let body of bodies_array) {
      body.update();
      body.show();
    }
    
    //camera follows if the flag is true
    if (camfollow) {
      cameraFollow();
    }

    //game ends of crash stats reach crashlives
    if (gameScore.crash >= crashlives) {
      stage = 2;
    }
  } 
  
  //end stage
  else if (stage == 2) {
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(255);
    text("GAME OVER", width / 2, height / 3);

    textSize(10);
    text("You crashed too many bodies!", width / 2, height / 3 + 37);
    textSize(15);
    text("Press R to restart", width / 2, (2 * height) / 3);

    //prints statistics on the end screen
    textAlign(LEFT, CENTER);
    textSize(12);
    text("Highest Score: " + gameScore.maxscore, width / 3, height / 2);
    text("Asteroids created: " + gameScore.rocks, width / 3, height / 2 + 15);
    text("Moons created: " + gameScore.moons, width / 3, height / 2 + 30);
    text("Planets Score: " + gameScore.planets, width / 3, height / 2 + 45);
  }
}


//mousewheel allowing to select planet sizes 
function mouseWheel() {
  if (stage == 1) {
    if (-event.deltaY / 125 > 0) {
      if (rad == 5) {
        rad = 20;
      } else if (rad == 20) {
        rad = 50;
      }
    } else if (-event.deltaY / 125 < 0) {
      if (rad == 50) {
        rad = 20;
      } else if (rad == 20) {
        rad = 5;
      }
    }

    //capping planet size
    if (rad <= 5) {
      rad = 5;
    }
    if (rad >= 50) {
      rad = 50;
    }
  }
}


//arrow starts on mouse press
function mousePressed() {
  if (stage == 1) {
    if (mouseButton == LEFT) {
      Arrowflag = 1;
      flag = 1;
      start = createVector(mouseX, mouseY);
    }
  }
}

function mouseClicked() {
  if (stage == 1) {
    if (mouseButton == LEFT) {
      //draw the arrow until mouse is clicked  
      end = createVector(mouseX, mouseY);
      
      //give body the initial velocity based on the slingshot direction
      init_vel = p5.Vector.div(p5.Vector.sub(start, end).limit(lim), 10);
      Arrowflag = 0;
      bodies_array.push(new Body(mouseX, mouseY, rad, init_vel, "planet"));
    }
  }
}

function keyPressed() {
  if (stage == 0) {
    stage += 1;
  } 
  
  else if (stage == 1) {
  //camera movement using arrow keys  
    background(0);
    if (keyCode === UP_ARROW) {
      for (let body of bodies_array) {
        body.pos.y += 50;
      }
    } else if (keyCode === DOWN_ARROW) {
      for (let body of bodies_array) {
        body.pos.y += -50;
      }
    } else if (keyCode === RIGHT_ARROW) {
      for (let body of bodies_array) {
        body.pos.x += -50;
      }
    } else if (keyCode === LEFT_ARROW) {
      for (let body of bodies_array) {
        body.pos.x += +50;
      }
    }
    
    //camera follow on spacebar press
    if (keyCode === 32 && bodies_array.length != 0) {
      if (camfollow == false) {
        camfollow = true;
      } else if (camfollow == true) {
        camfollow = false;
      }
    }
  }
  //pressing R resets all game variables and restarts game
  if (keyCode == 82) {
    flag = 0;
    Arrowflag = 0;
    camfollow = false;
    bodies_array = [];
    rad = 5;
    gameScore.resetscore();
    stage = 0;
  }
}


//camerafollow function follows the body with the highest mass in the bodies array
function cameraFollow() {
  let center = createVector(width / 2, height / 2);

  let diff = createVector();
  let max = bodies_array[0];
  for (let body of bodies_array) {
    if (max.mass < body.mass) {
      max = body;
    }
  }
  diff = center.sub(max.pos);
  for (let body of bodies_array) {
    body = body.pos.add(diff);
  }
}


//function that drows the red arrows
function drawArrow(base, vec) {
  // print("wprked")
  push();
  stroke(255, 0, 0);
  strokeWeight(3);
  fill(255, 0, 0);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
