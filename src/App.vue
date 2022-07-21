<template>
  <Navbar />
  <div class="breadcrumb-wrapper">
    <Breadcrumbs />
    <div>
      <button class="btn" v-if="showNewFolderButton" @click="handleModal">
        + New Folder
      </button>
    </div>
  </div>
  <CreateFolder v-if="showModal" />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import CreateFolder from "@/components/CreateFolderModal.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  components: { Navbar, Breadcrumbs, CreateFolder },
  setup() {
    const store = useStore();
    
    const handleModal = () => {
      store.state.showModal = true;
    };

    return {
      showModal: computed(() => store.state.showModal),
      showNewFolderButton: computed(() => store.state.showNewFolderButton),
      handleModal,
    };
  },
};
</script>


<style lang="scss" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.breadcrumb-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
}
</style>
