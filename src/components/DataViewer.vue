<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Objects
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(spaceObjects,category) in objects"
        :key="category"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-title>{{upperFirstLetter(category)}}</v-list-item-title>
        </template>
        <v-list-item
          v-for="spaceObject in spaceObjects"
          :key="spaceObject.id"
          ripple
          @click="updateObject(spaceObject)"
        >
          <v-list-item-title>{{spaceObject.englishName ? spaceObject.englishName : spaceObject.id}}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-row align="center" justify="center">
        <Data :object="currentObject" />
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Data from '../components/Data'

export default {
  name: "DataViewer",
  components: {
    Data
  },
  data() {
    return {
      currentObject: null,
      groupTitles: ["Planets","Moons","Others"],
      objects: {
        planets: [],
        dwarfPlanets: [],
        moons: [],
        assort: []
      }
    }
  },
  methods: {
    upperFirstLetter(word) {
      if (word === "dwarfPlanets") {
        return "Dwarf Planets"
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    updateObject(obj) {
      this.currentObject = [obj]
      this.$emit("objUpdate", obj)
    }
  },
  mounted() {
    axios.get("https://api.le-systeme-solaire.net/rest/bodies/")
    .then((res) => {
      let dwarfPlanets = ["ceres","eris","pluton","haumea","makemake"]
      res.data.bodies.forEach(item => {
        if (item.isPlanet) {
          if (dwarfPlanets.includes(item.id)) {
            this.objects.dwarfPlanets.push(item)
          } else {
            this.objects.planets.push(item)
          }
        } else if (item.aroundPlanet != null) {
          this.objects.moons.push(item)
        } else {
          this.objects.assort.push(item)
        }
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }
};
</script>
