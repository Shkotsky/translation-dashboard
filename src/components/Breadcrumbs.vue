<template>
  <div class="breadcrumb">
    <ul v-show="!isLoading">
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="index"
        @click="routeTo(index)"
        :class="{ linked: breadcrumb.link, noLink: !breadcrumb.link }"
      >
        <h3>{{ breadcrumb.name }}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "@/router";
import { useRoute } from "vue-router";
import { computed, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "Breadcrumb",
  setup() {
    const route = useRoute();
    const store = useStore();

    const url = ref(null);
    url.value = route.params.folderName;

    const routeTo = (path) => {
      if (store.state.breadcrumbList[path].link)
        router.push(store.state.breadcrumbList[path].link);
    };

    const updateList = () => {
      store.state.breadcrumbList = route.meta.breadcrumb;
    };
    updateList();
    watchEffect(() => updateList());
    return {
      breadcrumbList: computed(() => store.state.breadcrumbList),
      isLoading: computed(() => store.state.isLoading),
      routeTo,
      route,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  justify-content: left;
}

ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    float: left;
    height: 10px;
    width: auto;
    cursor: default;
    align-items: center;
  }
  li:not(:last-child)::after {
    content: ">";
    float: right;
    font-size: 0.8em;
    margin: 0 0.5em;
    color: black;
    cursor: default;
  }
  .linked {
    cursor: pointer;
    font-size: 1em;
    color: black;
    font-weight: bold;
  }
  .noLink {
    color: grey;
  }
}
</style>
