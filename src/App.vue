<template>
  <v-app>
    <Chart />
  </v-app>
</template>

<script>
import Chart from "./views/Chart.vue"

export default {
  name: "App",
  components: {
    Chart
  },
  data () {
    return {
      currentPage: "Home",
      loginDialog: false,
      createDialog: false,
      error: false,
      isLogin: false,
      username: '',
      password: '',
      favs: [],
      routes: [
        { name: "Chart", icon: "mdi-white-balance-sunny", link: "/" },
        { name: "Favorites", icon: "mdi-star", link: "/favorites" },
      ]
    } 
  },
  mounted() {
    if (localStorage.username && localStorage.password) {
      this.username = localStorage.username
      this.password = localStorage.password
      this.isLogin = true
    }
  }
};
</script>
