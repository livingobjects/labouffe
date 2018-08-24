<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>La Bouffe</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <home/>
    </v-content>
    <v-footer app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Home from "@/views/Home.vue";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>