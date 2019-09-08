let img;
let theta = 0
// let font;

function preload() {
  // font = loadFont('./Roboto-Black.ttf');
  earth = loadImage('./earth.jpg');
  moon = loadImage('./moon2.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // textFont(font)
  textSize(width/50)
  textAlign(CENTER, CENTER)
}

function draw() {
  orbitControl()
  background(0);
  ambientLight(250);

  stroke('red')
  line(-windowWidth, 0, windowWidth, 0) // x-axis
  stroke('blue')
  line(0, -windowHeight, 0, windowHeight) // y-axis
  stroke('green')
  line(0, 0, -windowWidth, 0, 0, windowWidth) // z-axis
  noStroke()

  angleMode(DEGREES)

  push()
  rotateY(frameCount * 0.289)
  rotate(23.4)
  // rotate(23.4, [0, 1, 0])
  texture(earth)
  sphere(windowWidth*.1, 48, 32)
  pop()

  push()
  rotateY(frameCount * 0.273)
  rotate(6.68)
  texture(moon)
  r = windowWidth*.4
  translate(-r*cos(theta) , -((r*(tan(5.14)))), r*sin(theta))
  // console.log(-((r*(tan(5.14)))))
  sphere(50, 48, 32)
  pop()

  theta += 1
}
