<template>
    <v-card>
        <v-card-media
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            height="200px"
        ></v-card-media>

        <v-card-title primary-title>
            <div>
            <h3 class="headline mb-0">{{ value.name }}</h3>
            <div>TODO</div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-layout justify-end row>
            <span v-for="vote in votes" :key="vote">{{ vote }}</span>
            <v-btn raised color="secondary" @click="vote(value)">Vote</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>        
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LaBouffeApi, FoodPlace, Vote } from "labouffe-js-sdk";
import { switchMapTo } from "rxjs/operators";

@Component
export default class FoodPlaceCard extends Vue {

  @Prop()
  api!: LaBouffeApi;

  @Prop()
  value!: FoodPlace

  @Prop()
  votes!: string[]

  vote(foodPlace : FoodPlace) {
    let currentUser = window.localStorage.getItem('currentUser');
    if (!currentUser) {
      currentUser = prompt('USERNAME?');
      if (currentUser) {
        window.localStorage.setItem('currentUser', currentUser);
      }
    }
    if(currentUser){
      this.api.toggleVote(currentUser, foodPlace).subscribe();
    }
  }
}
</script>