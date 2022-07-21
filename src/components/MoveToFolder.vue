<template>
  <fa icon="ellipsis-vertical" @click="toggle" />
  <div v-if="isActive" class="popover">
    <h4>Move to folder:</h4>
    <div v-for="folder in folders" :key="folder" class="popover__folder">
      <span @click="addToFolder(folder)">{{ folder.name }}</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  props: ["project"],
  setup(props) {
    const store = useStore();
    const isActive = ref(false);

    const toggle = () => {
      isActive.value = !isActive.value;
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

      }
    };
    return {
      folders: computed(() => store.state.allFolders),
      addToFolder,
      isActive,
      toggle,
    };
  },
};
</script>

<style lang="scss" scoped>
.popover {
  position: absolute;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;
  top: 20px;
  box-shadow: 2px 3px 10px 0px #858585;
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
