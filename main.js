var items = []
var t
var mercX, mercY
var venusX, venusY
var earthX, earthY
var marsX, marsY
var jupiterX, jupiterY
var saturnX, saturnY
var uranusX, uranusY
var neptuneX, neptuneY
let r = 40
let theta = 0
let step = 180

function setup()
{
  createCanvas(windowWidth, windowHeight)
}

function draw()
{
  noStroke()
  background(51)
  fill("yellow")
  translate(width/2, height/2)
  circle(0, 0, 20)

  t = jQuery.getJSON('./planetData.json')

  t.then(function(results){
    // console.log(results)
    r = .02 * windowWidth
    mercDFS = results.planets.mercury.distancefromsun
    mercX = (r * cos(theta) * int(results.planets.mercury.orbitalvelocity)) / 100
    mercY = (r * sin(theta) * int(results.planets.mercury.orbitalvelocity)) / 100

    r = .04 * windowWidth
    venusDFS = results.planets.venus.distancefromsun
    venusX = ((r * cos(theta) * int(results.planets.venus.orbitalvelocity)) / 100) * (1/venusDFS)
    venusY = ((r * sin(theta) * int(results.planets.venus.orbitalvelocity)) / 100) * (1/venusDFS)

    r = .07 * windowWidth
    earthDFS = results.planets.earth.distancefromsun
    earthX = r * cos(theta+int(results.planets.earth.orbitalvelocity))
    earthY = r * sin(theta+int(results.planets.earth.orbitalvelocity))

    // marsDFS = results.planets.mars.distancefromsun
    // marsX = ((marsDFS/windowWidth) * cos(theta))
    // marsY = ((marsDFS/windowWidth) * sin(theta))

    r = .3 * windowWidth
    jupiterDFS = results.planets.jupiter.distancefromsun
    jupiterX = r * cos(theta/results.planets.jupiter.orbitalvelocity)
    jupiterY = r * sin(theta/results.planets.jupiter.orbitalvelocity)
  })

  fill("gray")
  ellipse(mercX, mercY, 10)

  fill("orange")
  ellipse(venusX, venusY, 10)

  fill("blue")
  ellipse(earthX, earthY, 10)

  // fill("red")
  // ellipse(marsX, marsY, 10)

  noFill()
  stroke("brown")
  circle(0, 0, 500)
  noStroke()

  fill("white")
  ellipse(jupiterX, jupiterY, 40)

  theta += TWO_PI/360

}
