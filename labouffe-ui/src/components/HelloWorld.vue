<template>
  <v-container fluid>
    <v-layout column align-center>
      <ul>
        <li v-for="foodPlace in foodPlaces" v-bind:key="foodPlace.name">
          {{ foodPlace.name }}
        </li>
      </ul>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LaBouffeApi, FoodPlace } from "@/sdk";
import { switchMapTo } from "rxjs/operators";

@Component
export default class HelloWorld extends Vue {
  private api!: LaBouffeApi;

  foodPlaces: FoodPlace[] = [];

  mounted() {
    this.api = new LaBouffeApi();
    const mcdo: FoodPlace = { name: "Mc Donald's", votes: [] };
    this.api
      .addFoodPlace(mcdo)
      .pipe(switchMapTo(this.api.getFoodPlaces()))
      .subscribe(foodPlaces => {
        this.foodPlaces = foodPlaces;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
