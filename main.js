let img;
let theta = 0
let btn
let play = true;
// let font;

function preload() {
  // font = loadFont('./Roboto-Black.ttf');
  earth = loadImage('./earth.jpg');
  moon = loadImage('./moon2.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // btn = createButton("Stop Loop")
  // btn.position(0, 0)
  // btn.mousePressed(noLoop)
}

function drawAxes()
{
  stroke('red')
  line(-windowWidth, 0, windowWidth, 0) // x-axis
  stroke('blue')
  line(0, -windowHeight, 0, windowHeight) // y-axis
  stroke('green')
  line(0, 0, -windowWidth, 0, 0, windowWidth) // z-axis
  noStroke()
}

function draw() {
  orbitControl()
  background(0);
  ambientLight(250);
  drawAxes()

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
  translate(0, sin(5.17), r)
  let v = p5.Vector.fromAngle(85.14, r)
  v.rotate(0)
  // translate(v.x, v.y, 0)
  // console.log(r*cos(theta), r*sin(theta))
  // translate(x, y, [z])
  // translate(r*cos(theta), r*sin(theta), 0)
  // console.log(-((r*(tan(5.14)))))
  // translate(r, 0, 0)
  sphere(50, 48, 32)
  pop()

  theta += PI
}
