var redLong = 300;
var blueLong = 300;
var clickAction = false;
var reclickAction = false;
var win = false;
var clickSound;
var bgm;

//sound file have refernece in the the design rational
function preload() {
  clickSound = loadSound ('ClickSound.wav')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //start page
  if (clickAction == false && reclickAction == false && win == false ) {
  background (255)
  preparePage ()
    
    //click the play has led to the clickAction = true
    //the play page
  } else if (clickAction == true && reclickAction == false && win == false ) {
    background (255,50)
    mainPage ()
    push();
    //if red win
    if (redLong == width) {
      textAlign (CENTER)
      textSize (28)
      text ('Red Win', width/2,height/4)
    win = true
    blueLong = 300
    redLong = 300
      //if blue win
  } else if (blueLong == width) {

    textAlign (CENTER)
    textSize (28)
    text ('Blue Win',width/2,height/4)
    win = true
    blueLong = 300
    redLong = 300
  }
    pop ()
    
    // when a player win, the 'restart' button will appear
  } else if (clickAction == true && reclickAction == false && win == true) {
    endPage ('Re-start');
  }
  
  //when click restrart button, it will return the start page
  else if (clickAction == true && reclickAction == true && win == true) {
    clickAction = false
    reclickAction = false
    win = false
  }

}

//the start page
function preparePage () {
  //background (255,20)
  let playGame = new playButton (width/2,height-100,88,44,'PLAY')
  playGame.display ();
}

//the play page
function mainPage () {
  //red player
  let redArea = new redButton (width,height/2,'Click "J" ');
  redArea.display ()
  
  //blue player
  let blueArea = new blueButton (0,height/2, ' Click "F"');
  blueArea.display ()
}

//restar page
function endPage (text) {
  push ()
  let endArea = new replayButton (width/2,height/2,88,44,text)
  endArea.display ()
  pop () 
}

//red player
class redButton {
  
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
  }

  display() {
    push ();
    noStroke ();
    
    
    // click key 'J' (70 is 'F')
    if (keyCode == 74 && redLong <= width) {
      redLong += 2
    } else if (keyCode == 70 && redLong >= 10 ) {
      redLong -= 1;
    }
    if (redLong == 10) {
      redLong = 10
    }
    
    // red area
    fill (255,0,0)
    ellipse (this.x, this.y, redLong);
    //text - visual information
    textAlign (RIGHT,CENTER);
    fill(255);
    textSize (17)
    text(this.text, this.x, this.y);
    pop();
  }
}

class blueButton {
  
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;

  }

  display() {
    push ();
    noStroke ();
    
    // click key 'f', this blue area will become large
    if (keyCode == 70 && blueLong <= width) {
      blueLong += 2
    } else if (keyCode == 74 && blueLong >= 10 ) {
      blueLong -= 1;
    }

    // button
    fill (0,0,255)
    ellipse (this.x, this.y, blueLong);
    // text
    textAlign (LEFT,CENTER);
    fill(255);
    textSize (17)
    text(this.text, this.x, this.y);
    pop();
  }
}

class playButton {
  
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    //the mouse position
    this.leave = false;
  }
  
  display() {
    push ();
    noStroke ()
    // leave button
    if (mouseX > this.x - this.w/2 && mouseX < this.x + this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
    this.leave = true;
    this.x = this.x + 2;
    } else {
    fill (0,0,255)
    this.leave = false;
    }
    
    // when click button
    if (mouseIsPressed == true && this.leave == true) {
      fill (0);
      clickAction = true;
      this.w +=100
      this.h +=100
      clickSound.play ()
      
    } else if (this.leave == true && mouseIsPressed == false ) {
      fill (0,0,255)
      this.y = this.y + 2;
    }
    
    // button
    rectMode(CENTER);
    rect (this.x-10, this.y-10, this.w, this.h)
    fill (255,0,0)
    rect(this.x, this.y, this.w, this.h);
    
    // text
    textAlign(CENTER, CENTER);
    fill(255);
    //this is use for change text color, but I am not use it
    if (mouseIsPressed == true && clickAction == true) {
      fill (255);
    } else if (clickAction == true && mouseIsPressed == false ) {
      fill (255)
    }
    text(this.text, this.x, this.y);
    pop();
  }
}
// the same with playButton, i change the position, color and stroke

class replayButton {
  
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.leave = false;
    this.click = false;
  }
  
  display() {
    push ();
    
    // leave button
    if (mouseX > width/2 - this.w/2 && mouseX < width/2 + this.w/2 && mouseY > height/2 - this.h/2 && mouseY < height/2 + this.h/2) {

    this.leave = true;
    } else {
    fill (255)
    this.leave = false;
    }
    win = true
    
    // click button
    if (mouseIsPressed == true && this.leave == true) {
      fill (0);
      reclickAction = true
      clickSound.play ()
      //clickAction = false
      
      //win = true
    } else if (this.leave == true && mouseIsPressed == false ) {
      fill (200)
      //reclickAction = false
    }
    
    // button
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);
    
    //text
    textAlign(CENTER, CENTER);
    fill("black");
    
    // if (mouseIsPressed == true && reclickAction == true) {
    //   fill (255);
    // } else if (reclickAction == true && mouseIsPressed == false ) {
    //   fill (0)
    // }
    text(this.text, this.x, this.y);

    pop();
  }
}
