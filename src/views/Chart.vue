<template>
  <div>
    <!-- This component is the big fancy WEBGL solar system canvas -->
    <Canvas :orbitalSpeed="orbitSpeed" :showOrbits="showOrbits" :showAxes="showAxes" :scale="toScale" :viewObject="currObject" />

    <!-- This is the button in the top right that opens the menu when clicked -->
    <v-btn fab top right class="my-10" absolute @click="dialog = !dialog">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- This is the menu that the button opens -->
    <v-dialog v-model="dialog" persistent width="300">
      <v-card>
        <v-card-title>
          Simulation Settings
          <v-spacer/>
          <v-btn icon small @click="reset()">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            :value="currName"
            append-outer-icon="mdi-dots-horizontal"
            @click:append-outer="objectDialog = !objectDialog"
            readonly
          ></v-text-field>
          <v-slider dense hide-details label="Orbital Speed" thumb-label min="0" max="1825" v-model="orbitSpeed"></v-slider>
          <v-switch dense hide-details v-model="toScale" label="To Scale"></v-switch>
          <v-switch dense hide-details v-model="showOrbits" label="Show Orbits"></v-switch>
          <v-switch dense hide-details v-model="showAxes" label="Show Axes"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = !dialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- This is the nested menu inside of the previous menu -->
    <v-dialog v-model="objectDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar flat dark>
          <v-btn icon dark @click="objectDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Objects</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="updateObject">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- This component is what used to be the Home page, it passes data up to here -->
        <DataViewer @objUpdate="childData" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Canvas from "../components/Canvas"
import DataViewer from "../components/DataViewer"

export default {
  name: "Chart",
  components: {
    Canvas,
    DataViewer
  },
  data: () => ({
    dialog: false,
    objectDialog: false,
    orbitSpeed: 365,
    showOrbits: false,
    showAxes: false,
    toScale: true,
    currName: "Solar System",
    currObject: null
  }),
  methods: {
    childData(obj) {
      this.selectedObj = obj
    },
    updateObject() {
      this.dialog = false
      this.currObject = this.selectedObj
      this.currName = this.selectedObj.englishName ? this.selectedObj.englishName : this.selectedObj.id
      this.objectDialog = false
    },
    reset() {
      this.orbitSpeed = 365
      this.showOrbits = false
      this.showAxes = false
      this.currName = "Solar System"
      this.currObject = null
      this.toScale = true
      this.dialog = false
    }
  }
};
</script>
