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
.overlay {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .modal {
    position: relative;
    width: 400px;
    height: 400px;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    top: 25%;
    border-radius: 5px;
    &__contents {
      display: flex;
      flex-direction: column;
      margin: 40px 0;
      & p {
        margin: 10px;
      }
    }
    &__input {
      border-radius: 30px;
      width: 100%;
      padding: 10px;
      border: 1px solid #cecece;
      margin: 50px 0;
    }
    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      & button {
        background-color: yellowgreen;
        border: none;
        padding: 10px;
        border-radius: 30px;
        width: 60%;
        color: #fff;
      }
      & * {
        margin: 10px;
        cursor: pointer;
        font-size: 14px;
      }
      & span {
        color: blue;
      }
    }
  }
}
</style>