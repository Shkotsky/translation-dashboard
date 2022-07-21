<template>
  <fa icon="ellipsis-vertical" @click="toggle" />
  <div v-if="isSingleFolder">
    <div v-if="isActive && folders" class="popover">
      <h4 @click="removeFromFolder">Remove project</h4>
    </div>
  </div>
  <div v-else>
    <div v-if="isActive" class="popover">
      <h4>Move to folder:</h4>
      <div v-for="folder in folders" :key="folder" class="popover__folder">
        <span @click="addToFolder(folder)">{{ folder.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  props: ["project"],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const isActive = ref(false);

    const toggle = () => {
      isActive.value = !isActive.value;
    };
    const removeFromFolder = async () => {
      const currentFolder = await store.state.allFolders.filter(
        (el) => el.id === route.params.id
      );

      const newArray = await currentFolder[0].projects.filter((el) => el !== props.project.id);

      await store.dispatch("removeProjectFromFolder", {
        folder: route.params.id,
        projects: newArray,
      });
      await store.dispatch("getSingleFolder", route.params.id);
      isActive.value = false;
    };

    const addToFolder = async (folder) => {
      const exists = (item) => item === props.project.id;
      if (!folder.projects.some(exists)) {
        await store.dispatch("updateFolder", {
          folder: folder,
          project: props.project.id,
        });
        await store.dispatch("getAllFolders");
        isActive.value = false;
        document.getElementById("app").scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      folders: computed(() => store.state.allFolders),
      isSingleFolder: computed(() => route.name === "SingleFolder"),
      removeFromFolder,
      addToFolder,
      isActive,
      toggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.fa-ellipsis-vertical {
  cursor: pointer;
}
.popover {
  user-select: none;
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;
  top: 1rem;
  box-shadow: 2px 3px 10px 0px #858585;
  left: 0;
  & h4 {
    margin: 20px 0;
  }
  &__folder {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 0px 1px 0px #858585;
    cursor: pointer;
  }
}
</style>
