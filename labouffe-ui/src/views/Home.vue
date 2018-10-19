<template>
  <food-places />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FoodPlaces from '@/components/FoodPlaces.vue';

@Component({
  components: {
    FoodPlaces
  }
})
export default class Home extends Vue {}
</script>
