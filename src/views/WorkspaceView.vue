<template>
  <div v-if="allFolders">
    <Folders />
  </div>
  <div v-if="allSingleProjects && !isLoading">
    <div class="my-projects-title">
      <h3>My Projects</h3>
    </div>
    <Projects class="wrapper" />
  </div>
  <div v-else><Loader /></div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Loader from "@/components/Loader.vue";
import Projects from "@/components/Projects.vue";
import Folders from "@/components/Folders.vue";
import moment from "moment";

export default {
  name: "WorkspaceView",
  components: { Projects, Folders, Breadcrumbs, Loader },
  setup() {
    const store = useStore();

    store.state.showNewFolderButton = true;

    const getAllSingleProjects = async () => {
      await store.dispatch("getAllSingleProjects");
    };

    const getAllFolders = async () => {
      await store.dispatch("getAllFolders");
    };

      getAllSingleProjects();
      getAllFolders();
 

    return {
      allFolders: computed(() => store.state.allFolders),
      allSingleProjects: computed(() => store.state.projects),
      moment: function (date) {
        return moment(date);
      },
      isLoading: computed(() => store.state.isLoading),
    };
  },
};
</script>

