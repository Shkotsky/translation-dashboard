<template>
  <div class="sort-by">
    <span>Order by:</span>
    <select v-model="selected">
      <option selected="selected">Date</option>
      <option>Project</option>
    </select>
  </div>

  <div class="wrapper">
    <div v-for="folder in allFolders.slice(0, loadMore)" :key="folder.id" class="folder"
      @click="handleRouter(folder.id, folder.name)">
      <div class="folder__icon">
        <fa class="folder__icon--size-color" icon="folder" />
        <fa icon="ellipsis-vertical" />
      </div>
      <div class="folder__content">
        <h3>{{ folder.name }}</h3>
        <div class="folder__content__properties">
          <fa icon="folder-open" />
          <p>{{ folder.projects.length + " Projects" }}</p>
        </div>
        <div class="folder__content__properties">
          <fa icon="clock" />
          <p>
            {{
                "Created on " +
                moment(folder.created_at).format("MMMM DD, YYYY")
            }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="btn-wrapper" id="pagination">
    <div v-if="allFolders.length >= loadMore" class="btn" @click="handleLoadMore">
      Load More
    </div>
    <div class="btn" v-if="loadMore > 16" @click="handleHide">Hide</div>
  </div>
</template>

<script>
import { computed, ref, watch } from "@vue/runtime-core";
import router from "@/router";
import moment from "moment";
import { useStore } from "vuex";
export default {
  setup() {
    const loadMore = ref(null);
    const store = useStore();
    const selected = ref("Date");

    const handleRouter = (id, folderName) => {
      router.push({
        name: "SingleFolder",
        params: { id: id, folderName: folderName },
      });
    };

    watch(selected, (select) => {
      if (select === "Date") {
        sortedByDate();
      } else if (select === "Project") {
        sortedByProjects();
      }
    });

    const sortedByProjects = () => {
      store.state.allFolders.sort(
        (a, b) => b.projects.length - a.projects.length
      );
    };

    const sortedByDate = () => {
      store.state.allFolders.sort(
        (a, b) =>
          new Date(b.updated_at) - new Date(a.updated_at)
      );
    };

    if (localStorage.loadMore && localStorage.loadMore > 16) {
      loadMore.value = Number(localStorage.loadMore);
    } else {
      localStorage.setItem("loadMore", 16);
      loadMore.value = Number(localStorage.loadMore);
    }

    const handleLoadMore = (e) => {
      loadMore.value = loadMore.value + 16;
      localStorage.loadMore = loadMore.value;
      e.target.scrollIntoView({
        behavior: "smooth",
      });
      return loadMore.value;
    };

    const handleHide = (e) => {
      loadMore.value = loadMore.value - 16;
      localStorage.loadMore = loadMore.value;
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      return loadMore.value;
    };

    return {
      allFolders: computed(() => store.state.allFolders),
      moment: function (date) {
        return moment(date);
      },
      handleLoadMore,
      handleHide,
      handleRouter,
      loadMore,
      selected,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.folder {
  width: 260px;
  height: auto;
  border-radius: 7px;
  background-color: #fafafa;
  box-shadow: 2px 3px 10px 0px #858585;
  padding: $padding-15;
  cursor: pointer;

  &__icon {
    display: flex;
    justify-content: space-between;

    &--size-color {
      font-size: 28px;
      color: $light-blue;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 80px;

    h3 {
      word-wrap: break-word;
      width: 100%;
      text-align: left;
    }

    &__properties {
      display: flex;
      align-items: center;

      p {
        margin: 5px;
      }

      svg {
        font-size: 10px;
      }
    }
  }

  a {
    text-decoration: none;
  }
}

.sort-by {
  display: flex;
  align-items: center;
  padding: 0 4rem;

  select {
    padding: 10px;
    width: 150px;
    border-radius: 10px;
  }

  span {
    margin-right: 20px;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    margin: 80px;
  }
}
</style>