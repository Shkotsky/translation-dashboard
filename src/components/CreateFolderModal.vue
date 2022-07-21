<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__contents">
        <h2>Create Your Folder Here</h2>
        <p>Add a new folder to group your projects</p>
        <form @submit.prevent="createFolder">
          <input
            class="modal__input"
            type="text"
            placeholder=" Folder name"
            :value="message"
            @input="updateMessage"
          />
          <div class="modal__buttons">
            <button type="submit">Create Folder</button>
            <span type="button" @click="handleClose">Cancel</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();

    const updateMessage = (e) => {
      store.commit("getFolderName", e.target.value);
    };
    const createFolder = async () => {
      await store.dispatch("createFolder");
      store.state.showModal = false;
      store.state.newFolder = "";
      await store.dispatch("getAllFolders");
    };
    const handleClose = () => {
      store.state.showModal = false;
      store.state.newFolder = "";
    };

    return {
      message: computed(() => store.state.newFolder),
      updateMessage: computed(() => updateMessage),
      createFolder,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
