<template>
  <div v-if="!isLoading">
    <Projects />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import Projects from "@/components/Projects.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Loader from "@/components/Loader.vue";

export default {
  props: ["id"],
  components: { Projects, Breadcrumbs, Loader },
  setup(props) {
    const store = useStore();
    const folderID = ref(props.id);
    
    store.state.showNewFolderButton = false;

    const getSingleFolder = async (id) => {
      await store.dispatch("getSingleFolder", id);
    };
    getSingleFolder(folderID.value);

    return {
      singleFolderProjects: computed(() => store.state.projects),
      isLoading: computed(() => store.state.isLoading),
    };
  },
};
</script>

