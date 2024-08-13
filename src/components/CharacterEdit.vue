<script>
export default {
  name: 'CharacterEdit',
  props: {
    character: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['edit', 'create'].includes(value);
      },
    },
  },
  data() {
    return {
      localCharacter: { ...this.character },
    };
  },
  watch: {
    character: {
      immediate: true,
      handler(newCharacter) {
        this.localCharacter = { ...newCharacter };
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.type === 'edit') {
        this.updateCharacter();
      } else if (this.type === 'create') {
        this.createCharacter();
      }
    },
    updateCharacter() {
      this.$emit('update', this.localCharacter);
    },
    createCharacter() {
      this.$emit('create', this.localCharacter);
    },
  },
};
</script>

<template>
  <div v-if="character">
    <h3>
      {{ type === 'edit' ? 'Edit:' : 'Create' }} {{ character.name }}
    </h3>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="localCharacter.name" />
      </div>
      <div class="description_form">
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="localCharacter.description"
        ></textarea>
      </div>
      <button class="sabe_button" type="submit">
        {{ type === 'edit' ? 'Save' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<style>
.description_form {
  display: flex;
  flex-direction: column;
}

.description_form textarea {
  height: 50px;
}

.sabe_button {
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
</style>
