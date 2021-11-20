<template>
  <div id="canvas"></div>
</template>

<script>
import P5 from 'p5'

const ss_url = "https://api.le-systeme-solaire.net/rest/bodies?filter[]=id,eq,mercure&filter[]=id,eq,venus&filter[]=id,eq,terre&filter[]=id,eq,mars&filter[]=id,eq,jupiter&filter[]=id,eq,saturne&filter[]=id,eq,neptune&filter[]=id,eq,uranus&satisfy=any"

export default {
  name: 'App',
  props: ["orbitalSpeed", "showOrbits", "showAxes", "viewObject", "scale"],
  data() {
    return {
      planets: undefined,
      planetTextures: {},
      zoom: {},
      img: undefined,
      sunImg: undefined,
    }
  },
  mounted() {
    const script = p5 => {
      function drawAxes() {
        p5.push()
        p5.stroke(255,0,0)
        p5.line(-p5.windowWidth, 0, p5.windowWidth, 0) // x-axis
        p5.stroke(0,0,255)
        p5.line(0, -p5.windowHeight, 0, p5.windowHeight) // y-axis
        p5.stroke(0,255,0)
        p5.line(0, 0, -p5.windowWidth, 0, 0, p5.windowWidth) // z-axis
        p5.pop()
      }

      // Scaling function taken from second reply from here
      // https://stackoverflow.com/questions/5294955/how-to-scale-down-a-range-of-numbers-with-a-known-min-and-max-value
      function scale_to_window(value, zoom_factor) {
        let win_min = p5.windowWidth*0.3
        let min_semi = 57909227  // mercury (closest object to sun)
        let max_semi = 151692240180   // furthest object in API (some comet I believe)
        return ((p5.windowWidth - win_min) * (value - min_semi) / (max_semi - min_semi) + win_min) * zoom_factor
      }

      // Helper function that can draw any of the solar system bodies that are selectable
      function draw_single_body(body, orbitSpeed, textures, zoom, toScale, orbitLines) {
        p5.push()
        let planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]
        let objZoom

        let name = body.englishName.toLowerCase()
        if (planets.includes(name)) { // If the selected object is a planet, apply a texture and it's associated zoom value
          p5.texture(textures[name])
          objZoom = zoom[name]
        } else {  // Otherwise, just make a gray ball and an approximate zoom
          objZoom = 3
          p5.fill("gray")
        }

        // Rotate the object a certain distance on the orbital plane based on current framecount of sim and its orbital speed/period
        p5.rotateY(p5.frameCount / (body.sideralOrbit)*orbitSpeed)
        p5.rotateZ(body.axialTilt)

        // Actually move the object to its real location
        let r = scale_to_window(body.semimajorAxis, objZoom)
        p5.translate(0, p5.sin(1), r)
        p5.noStroke()
        
        let x
        if (!toScale) {
          x = scale_to_window(body.equaRadius, 1)*0.03 // Not true scale
        } else {
          x = body.equaRadius*0.0008  // True scale (0.08% of true size)
        }
        p5.sphere(x, 24, 24)
        p5.pop()

        if (orbitLines) {
          p5.push()
          p5.rotateX(90)
          p5.torus(r,1,128,24)
          p5.pop()
        }
      }

      p5.preload = () => {
        this.sunTexture = p5.loadImage(require('@/assets/sun.jpg'))
        let zooms = [0.4, 0.5, 0.6, 0.7, 1.10, 1.60, 2.20, 2.90]
        p5.httpGet(ss_url, "json", false, (res) => {  // Load planets and sort them into their actual order
          // Array of objects sorting code from here
          // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
          res.bodies.sort((a, b) => (a.semimajorAxis > b.semimajorAxis) ? 1 : -1)
          this.planets = res.bodies
          this.planets.forEach(planet => {
            let name = planet.englishName.toLowerCase()
            this.planetTextures[name] = p5.loadImage(require(`@/assets/${name}.jpg`))
            this.zoom[name] = zooms.shift()
          })
        })
      }

      p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.ambientLight(250);
      };
      p5.draw = () => {
        // If the data isn't loaded, don't draw anything
        if (!this.planets) {
          return
        }

        // Needs to be here, removes the previous iteration
        p5.background(0);

        if (this.showAxes) {
          drawAxes()
        }

        p5.orbitControl() // allow moving the canvas
        p5.angleMode(p5.DEGREES)

        // Draw the Sun
        p5.push()
        p5.noStroke()
        p5.rotateY(p5.frameCount * 0.289)
        p5.texture(this.sunTexture)
        p5.sphere(p5.windowWidth*.1, 24, 24)
        p5.pop()

        if (!this.viewObject) { // By default, show the solar system
          for (let i = 0; i < 8; i++) {
            draw_single_body(this.planets[i], this.orbitalSpeed, this.planetTextures, this.zoom, this.scale, this.showOrbits)
          }
        } else {
          draw_single_body(this.viewObject, this.orbitalSpeed, this.planetTextures, this.zoom, this.scale, this.showOrbits)
        }
      }; 
    }
    new P5(script, 'canvas');
  },
}
</script>

<style scoped>
</style>