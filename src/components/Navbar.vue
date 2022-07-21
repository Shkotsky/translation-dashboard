<template>
  <nav>
    <router-link :to="{ name: 'WorkspaceView' }">
      <h1>MY WORKSPACE</h1>
    </router-link>
    <button class="btn" @click="handleProjectModal" >+ Create new project</button>
  </nav>
  <CreateProject v-if="showProjectModal" />
</template>

<script>

import CreateProject from "./CreateProjectModal.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: { CreateProject},
  setup() {
    const store = useStore();
    
    const handleProjectModal = () => {
      store.state.showProjectModal = true;
    };

    return {
      showProjectModal: computed(() => store.state.showProjectModal),
      showNewFolderButton: computed(() => store.state.showNewFolderButton),
      handleProjectModal,
    };
  },
};
</script>

<style lang='scss' scoped >
@import "@/assets/_variables.scss";
nav {
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  align-items: center;
  a {
    text-decoration: none;
  }
  h1 {
    color: $light-blue;
  }
  button {
    background-color: $light-blue;
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: $padding-15;
    width: 200px;
  }
}
</style>