<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__contents">
        <h2>Create Your Project Here</h2>
        <p>Add new project for translation</p>
        <form @submit.prevent="createProject">
          <input
            class="modal__input"
            type="text"
            placeholder=" Project name"
            v-model="projectName"
          />
          <div>
            <input
              type="number"
              placeholder="Price"
              min="1"
              max="100000"
              v-model="price"
            />
          </div>
          <div class="language-wrapper">
            <div>
              <p>Source Language:</p>
              <div>
                <select v-model="sourceLang">
                  <option>EN</option>
                  <option>MK</option>
                  <option>GE</option>
                  <option>FR</option>
                </select>
              </div>
            </div>
            <div>
              <p>Target Languages:</p>
              <div class="checkbox-wrapper">
                <label>EN</label>
                <input type="checkbox" value="EN" v-model="targetLang" />
                <label>MK</label>
                <input type="checkbox" value="MK" v-model="targetLang" />
                <label>GE</label>
                <input type="checkbox" value="GE" v-model="targetLang" />
              </div>
            </div>
          </div>
          <div>
            <p>Translation progress: {{ completed }}</p>
            <input
              type="range"
              class="form-range"
              v-model="completed"
              min="0"
              max="1"
              step="0.1"
            />
          </div>

          <div class="modal__buttons">
            <button type="submit">Create Project</button>
            <span type="button" @click="handleClose">Cancel</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const projectName = ref(null);
    const price = ref(null);
    const sourceLang = ref("EN");
    const targetLang = ref([]);
    const completed = ref(0.1);

    const createProject = async () => {
      store.commit("setProjectParams", {
        type: "project",
        name: projectName.value,
        price: {
          total_euro: price.value,
        },
        source_language: sourceLang.value,
        target_languages: targetLang.value,
        progress: {
          percent: completed.value,
        },
        created_at: new Date(),
        updated_at: new Date(),
      });
      await store.dispatch("createProject");
      store.state.showProjectModal = false;
      store.state.newProject = "";
      await store.dispatch("getAllSingleProjects");
    };
    const handleClose = () => {
      store.state.showProjectModal = false;
      store.state.newProject = "";
    };

    return {
      message: computed(() => store.state.newFolder),
      updateMessage: computed(() => updateMessage),
      createProject,
      handleClose,
      projectName,
      price,
      sourceLang,
      targetLang,
      completed,
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
    max-width: 90%;
    min-height: 400px;
    max-height: 520px;
    z-index: 9999;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    top: 20%;
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
.language-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.checkbox-wrapper {
  display: flex;
  label {
    font-size: 0.8rem;
    padding: 0 5px 0 5px;
  }
}
</style>
