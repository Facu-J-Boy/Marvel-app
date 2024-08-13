<template>
  <div id="app">
    <h1>Marvel Characters</h1>
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from './components/CharacterList.vue';

export default {
  name: 'App',
  components: {
    CharacterList,
  },
};
</script>
