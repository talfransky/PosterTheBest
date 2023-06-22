let colors = [
  '#9999FF',
  '#FF99C3',
  '#FFFC99',
  '#99F1FF',
  '#99FFAC'
];
let currentColorIndex = 0;
let targetColorIndex = 1;
let transitionStep = 0.01;
let squares = [];
let shapeType = 'square';
let timer;

let font;
let secondsRemaining;

let blendModes = ['normal', 'screen', 'difference', 'multiply'];
let currentBlendModeIndex = 0;

let sizeSlider;

let backgroundMusic;

let posterImages = [
  'poster1.png',
  'poster2.png',
  'poster3.png',
  'poster4.png',
  'poster5.png',
  'poster6.png',
  'poster7.png'
];
let currentPosterIndex = 0;
let posterImg;

function preload() {
  posterImg = loadImage(posterImages[currentPosterIndex]);
  font = loadFont('PPNeueMachina-InktrapUltrabold.otf');
  backgroundMusic = loadSound('milkshake.mp3');
}

function setup() {
  createCanvas(1080, 1350);
  frameRate(60);

  backgroundMusic.loop();

  timer = createP();
  timer.style('font-size', '30px');
  timer.style('font-family', 'PPNeueMachina-InktrapUltrabold.otf');
  timer.style('color', '#FFFFFF');
  timer.style('font-weight', 'bold');
  timer.style('mix-blend-mode', 'normal');
  timer.position(width / 2, height / 2);
  timer.style('transform', 'translate(-50%, -50%)');
  timer.style('position', 'fixed');

  updateTimer();

  let switchShapeBtn = createButton('Switch Shape');
  switchShapeBtn.style('font-size', '24px');
  switchShapeBtn.style('background-color', '#9999FF');
  switchShapeBtn.style('color', '#FFFFFF');
  switchShapeBtn.mousePressed(switchShape);
  switchShapeBtn.position(width / 2 - switchShapeBtn.width / 2, height + 20);
  switchShapeBtn.style('display', 'block');
  switchShapeBtn.style('margin', '0 auto');
  switchShapeBtn.size(switchShapeBtn.width * 2, switchShapeBtn.height * 2);
  switchShapeBtn.style('margin-bottom', '20px');

  let switchBlendModeBtn = createButton('Switch Blend Mode');
  switchBlendModeBtn.style('font-size', '24px');
  switchBlendModeBtn.style('background-color', '#9999FF');
  switchBlendModeBtn.style('color', '#FFFFFF');
  switchBlendModeBtn.mousePressed(switchBlendMode);
  switchBlendModeBtn.position(width / 2 - switchBlendModeBtn.width / 2, height + 80);
  switchBlendModeBtn.style('display', 'block');
  switchBlendModeBtn.style('margin', '0 auto');
  switchBlendModeBtn.size(switchBlendModeBtn.width * 2, switchBlendModeBtn.height * 2);
  switchBlendModeBtn.style('margin-bottom', '20px');

  let switchPosterBtn = createButton('Switch Poster');
  switchPosterBtn.style('font-size', '24px');
  switchPosterBtn.style('background-color', '#9999FF');
  switchPosterBtn.style('color', '#FFFFFF');
  switchPosterBtn.mousePressed(switchPoster);
  switchPosterBtn.position(width / 2 - switchPosterBtn.width / 2, height + 140);
  switchPosterBtn.style('display', 'block');
  switchPosterBtn.style('margin', '0 auto');
  switchPosterBtn.size(switchPosterBtn.width * 2, switchPosterBtn.height * 2);
  switchPosterBtn.style('margin-bottom', '20px');

  sizeSlider = createSlider(20, 200, 60, 1);
  sizeSlider.position(width / 2 - sizeSlider.width / 2, height + 200);
  sizeSlider.style('width', '200px');
  sizeSlider.style('display', 'block');
  sizeSlider.style('margin', '0 auto');
  sizeSlider.style('margin-bottom', '20px');

  let downloadBtn = createButton('DOWNLOAD');
  downloadBtn.style('font-size', '24px');
  downloadBtn.style('background-color', '#9999FF');
  downloadBtn.style('color', '#FFFFFF');
  downloadBtn.mousePressed(downloadImage);
  downloadBtn.position(width / 2 - downloadBtn.width / 2, height + 260);
  downloadBtn.style('display', 'block');
  downloadBtn.style('margin', '0 auto');
  downloadBtn.size(downloadBtn.width * 2, downloadBtn.height * 2);
}

function draw() {
  background(lerpColor(color(colors[currentColorIndex]), color(colors[targetColorIndex]), transitionStep));

  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].display();
  }

  image(posterImg, 0, 0, width, height);

  transitionStep += 0.006;
  if (transitionStep >= 1) {
    transitionStep = 0;
    currentColorIndex = targetColorIndex;
    targetColorIndex = (targetColorIndex + 1) % colors.length;
  }

  let dx = mouseX - (width / 2);
  let dy = mouseY - (height / 2);
  let angle = atan2(dy, dx);

  timer.html(secondsRemaining);
  timer.position(
    (width / 2) - cos(angle) * (width / 4),
    (height / 2) - sin(angle) * (height / 4)
  );
}

function mouseMoved() {
  if (shapeType === 'square') {
    let square = new Square(mouseX, mouseY);
    square.setSize(sizeSlider.value());
    squares.push(square);
  } else if (shapeType === 'triangle') {
    let triangle = new Triangle(mouseX, mouseY);
    triangle.setSize(sizeSlider.value());
    squares.push(triangle);
  }
}

function switchShape() {
  if (shapeType === 'square') {
    shapeType = 'triangle';
  } else if (shapeType === 'triangle') {
    shapeType = 'square';
  }
  squares = [];
}

function switchBlendMode() {
  currentBlendModeIndex = (currentBlendModeIndex + 1) % blendModes.length;
  for (let i = 0; i < squares.length; i++) {
    squares[i].setBlendMode(blendModes[currentBlendModeIndex]);
  }
}

function switchPoster() {
  currentPosterIndex = (currentPosterIndex + 1) % posterImages.length;
  posterImg = loadImage(posterImages[currentPosterIndex]);
}

function downloadImage() {
  saveCanvas('myArtwork', 'png');
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.size = 60;
    this.blendMode = 'normal';
  }

  update() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    this.angle = atan2(dy, dx);
  }

  setSize(size) {
    this.size = size;
  }

  setBlendMode(mode) {
    this.blendMode = mode;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill('#FFFC99');
    stroke('#FF99C3');
    strokeWeight(1);
    blendMode(blendModes[currentBlendModeIndex]);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
  }
}

class Triangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.size = 60;
    this.blendMode = 'normal';
  }

  update() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    this.angle = atan2(dy, dx);
  }

  setSize(size) {
    this.size = size;
  }

  setBlendMode(mode) {
    this.blendMode = mode;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill('#99FFAC');
    stroke('#FF99C3');
    strokeWeight(1);
    blendMode(blendModes[currentBlendModeIndex]);
    triangle(-this.size / 1, this.size / 1, 0, -this.size / 1, this.size / 1, this.size / 1);
    pop();
  }
}

function updateTimer() {
  let now = new Date();
  let targetDate = new Date('February 18, 2024');

  let timeDifference = targetDate - now;
  secondsRemaining = Math.floor(timeDifference / 1000);

  let dx = mouseX - (width / 2);
  let dy = mouseY - (height / 2);
  let angle = atan2(dy, dx);

  timer.position(
    (width / 2) - cos(angle) * (width / 4),
    (height / 2) - sin(angle) * (height / 4)
  );
}

setInterval(updateTimer, 1000); // Update timer every second
