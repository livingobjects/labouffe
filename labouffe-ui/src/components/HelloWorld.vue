<template>
  <v-container fluid>
      <v-layout align-center justify-start row>
        <v-flex v-for="foodPlace in foodPlaces" :key="foodPlace.name" md2 ma-2>
          <v-card>
            <v-card-media
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              height="200px"
            ></v-card-media>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ foodPlace.name }}</h3>
                <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-layout justify-end row>
                <v-btn raised color="secondary">Vote</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
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
      const buffalo: FoodPlace = { name: "Buffalo Grill", votes: [] };
      this.api.addFoodPlace(buffalo).subscribe();
  }
}
</script>
