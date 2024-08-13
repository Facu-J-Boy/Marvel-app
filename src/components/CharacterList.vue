<script>
import CharacterDetails from './CharacterDetails.vue';
import CharacterEdit from './CharacterEdit.vue';
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/config/axios';

export default {
  name: 'CharacterList',
  components: {
    CharacterDetails,
    CharacterEdit,
  },
  data() {
    return {
      characters: [],
      loading: false,
      selectedCharacter: null,
      characterToEdit: null,
      formType: null,
    };
  },
  async created() {
    this.loading = true;
    try {
      const response = await axiosInstance.get();
      this.characters = response.data.data.results;
      if (this.characters.length) {
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      console.error('Error fetching characters:', error);
    }
  },
  methods: {
    selectCharacter(character) {
      this.selectedCharacter = character;
      this.characterToEdit = null;
    },
    editCharacter(character) {
      this.characterToEdit = { ...character };
      (this.formType = 'edit'), (this.selectedCharacter = null);
    },
    deleteCharacter(character) {
      this.characters = this.characters.filter(
        (item) => item.id !== character.id
      );
      if (
        this.selectedCharacter &&
        this.selectedCharacter.id === character.id
      ) {
        this.selectedCharacter = null;
      }
      if (
        this.characterToEdit &&
        this.characterToEdit.id === character.id
      ) {
        this.characterToEdit = null;
      }
    },
    createCharacter(character) {
      this.selectedCharacter = null;
      this.characterToEdit = { ...character };
      this.characterToEdit.id = uuidv4();
      this.formType = 'create';
    },
    addCharacter(newCharacter) {
      this.characters.push(newCharacter);
      this.characterToEdit = null;
    },
    handleUpdate(updatedCharacter) {
      const index = this.characters.findIndex(
        (c) => c.id === updatedCharacter.id
      );
      if (index !== -1) {
        this.characters.splice(index, 1, updatedCharacter);
      }
      this.characterToEdit = null;
    },
  },
};
</script>

<template>
  <div class="loading" v-if="loading && !characters.length">
    <span v-if="loading">Loading...</span>
  </div>
  <div class="loading" v-if="!characters.length && !loading">
    <h1>Character List empty</h1>
  </div>
  <div v-if="!loading">
    <h2>Character List</h2>
    <button class="create_button" @click="createCharacter({})">
      Create character
    </button>
    <ul>
      <li
        class="character_item"
        v-for="character in characters"
        :key="character.id"
      >
        <span
          @click="selectCharacter(character)"
          class="character_name"
          >{{ character.name }}</span
        >
        <div class="button_zone">
          <button
            class="edit_button"
            @click="editCharacter(character)"
          >
            Edit
          </button>
          <button
            class="delete_button"
            @click="deleteCharacter(character)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <CharacterDetails
      v-if="selectedCharacter"
      :character="selectedCharacter"
    />
    <CharacterEdit
      v-if="characterToEdit"
      :character="characterToEdit"
      :type="formType"
      @update="handleUpdate"
      @create="addCharacter"
    />
  </div>
</template>

<style>
.character_item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: solid 1px;
  width: 80vw;
}

.character_item:hover {
  background-color: #333;
  color: #fff;
}

.character_name {
  cursor: pointer;
  width: 90%;
}

.button_zone button {
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0px 5px;
}

.edit_button {
  background-color: green;
}

.delete_button {
  background-color: red;
}
</style>

<style>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
.loading span {
  padding: 10px;
  font-family: sans-serif;
  color: #e62429;
  font-size: 48px;
  font-weight: bold;
  background-color: red;
  color: #fff;
}
.loading h1 {
  font-family: sans-serif;
  font-size: 48px;
  font-weight: bold;
}
.create_button {
  border: none;
  padding: 5px;
  background-color: #333;
  color: #fff;
}
</style>
