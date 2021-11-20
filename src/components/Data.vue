<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <!-- If there's an object, show it -->
      <v-data-table v-if="object" :items="object" :headers="tableHeaders"></v-data-table>
      
      <!-- If not, tell user to select one -->
      <v-card v-else flat >
        <v-card-title class="justify-center">Select an object from above</v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Data",
  props: ["object"],
  data() {
    return {
      tableHeaders: [
        {text: "Name", value: "englishName", align: "center", sortable: false},
        {text: "Discovered By", value: "discoveredBy", align: "center", sortable: false},
        {text: "Discovered", value: "discoveryDate", align: "center", sortable: false},
        {text: "Semi-major Axis", value: "semimajorAxis", align: "center", sortable: false},
        {text: "Gravity", value: "gravity", align: "center", sortable: false},
        {text: "Radius", value: "equaRadius", align: "center", sortable: false},
        {text: "Orbital Period", value: "sideralOrbit", align: "center", sortable: false},
        {text: "Rotational Speed", value: "sideralRotation", align: "center", sortable: false},
        {text: "Mass", value: "mass.massValue", align: "center", sortable: false},
        {text: "Density", value: "density", align: "center", sortable: false},
        {text: "Object ID", value: "id", sortable: false}
      ],
    }
  }
};
</script>
