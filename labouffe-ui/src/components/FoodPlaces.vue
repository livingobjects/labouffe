<template>
  <v-container fluid>
      <v-layout align-center justify-start row>
        <v-flex v-for="foodPlace in foodPlaces" :key="foodPlace.foodPlace.name" md2 ma-2>
          <food-place-card :value="foodPlace.foodPlace" :votes="foodPlace.votes" :api="api" />
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LaBouffeApi, FoodPlace, Vote } from "labouffe-js-sdk";
import { switchMapTo } from "rxjs/operators";
import FoodPlaceCard from "@/components/FoodPlaceCard.vue";
import { combineLatest } from "rxjs";

@Component({
  components: {
    FoodPlaceCard
  }
})
export default class FoodPlaces extends Vue {
  private api!: LaBouffeApi;

  foodPlaces: { foodPlace: FoodPlace; votes: string[] }[] = [];

  mounted() {
    this.api = new LaBouffeApi();
    const mcdo: FoodPlace = { name: "Mc Donald's" };
    const buffalo: FoodPlace = { name: "Buffalo Grill" };

    this.api
      .addFoodPlace(mcdo)
      .pipe(
        switchMapTo(this.api.addFoodPlace(buffalo)), 
        switchMapTo(combineLatest(this.api.getFoodPlaces(), this.api.getVotes()))
      ).subscribe(([foodPlaces, votes]) => {
        this.foodPlaces = foodPlaces.map((foodplace) => {
            let voteUsernames = this.getVotesByFoodPlace(foodplace, votes);

            return {foodPlace: foodplace, votes: voteUsernames};
        });
      });
  }

  getVotesByFoodPlace(foodPlace: FoodPlace, votes : Vote[]) {
      return votes
          .filter(vote => vote.foodPlaceId === foodPlace.name)
          .map(filteredVote => filteredVote.username);
  }
}
</script>