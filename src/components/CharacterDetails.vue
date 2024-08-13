<script>
export default {
  name: 'CharacterDetails',
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="detail_container" v-if="character">
    <h3>{{ character.name }}</h3>
    <p>{{ character.description || 'No description available' }}</p>
  </div>
</template>

<style>
.detail_container {
  color: #fff;
  background-color: #333;
  padding: 10px;
}
</style>
