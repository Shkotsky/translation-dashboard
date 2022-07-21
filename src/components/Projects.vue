<template>
  <div v-if="projects" class="wrapper">
    <div v-for="project in projects" :key="project" class="project">
      
      <div class="project__content">
        <div class="project__content--streach">
          <div class="flex-end" style="position: relative;">
            <MoveToFolder :project="project" />
          </div>
          <h3>{{ project.name }}</h3>
          <hr />
          <div class="project__content__properties">
            <p class="project__content__properties__title">DATE OF ORDER:</p>
            <p>
              {{ moment(project.created_at, "YYYYMMDD").fromNow() }}
            </p>
          </div>
          <div class="project__content__properties">
            <p class="project__content__properties__title">PRICE:</p>
            <p>{{ project.price.total_euro }}&euro;</p>
          </div>
          <div class="project__content__properties--align">
            <div>
              <p class="project__content__properties__title">FROM:</p>
              <p>{{ project.source_language }}</p>
            </div>
            <div>
              <p class="project__content__properties__title">TO:</p>
              <div class="target-languages--container">
                <template
                  v-for="langTarget in project.target_languages"
                  :key="langTarget"
                >
                  <p>{{ langTarget }}</p>
                </template>
              </div>
            </div>
          </div>
          <div
            class="project__progressbar"
            v-if="project.progress.percent < 1"
          >
            <div
              class="project__progress"
              :style="{
                width: project.progress.percent * 100 + '%',
              }"
            ></div>
          </div>
        </div>
        <div
          v-if="project.progress.percent === 1"
          class="project__ready"
        >
          <p>Translation is ready</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/runtime-core";
import moment from "moment";
import { useRoute } from "vue-router";
import MoveToFolder from "./MoveToFolder.vue";

export default {
  components: {MoveToFolder},
  setup() {
    const store = useStore();
    const route = useRoute();
    const url = ref(null);
    const setting = ref(false);
    url.value = route.params.folderName;

    if (store.state.breadcrumbList.length > 1) {
      store.state.breadcrumbList[1].name = url.value;
    }

    const handleSettings = (e) => {
      console.log(e);
      setting.value = !setting.value;
    };

    return {
      projects: computed(() => store.state.projects),
      folders: computed(() => store.state.allFolders),
      moment: function (date) {
        return moment(date);
      },
      handleSettings,
      setting,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.project {
  position: relative;
  width: 260px;
  height: 340px;
  border-radius: 3px;
  background-color: #fafafa;
  box-shadow: 2px 3px 10px 0px #858585;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &--streach {
      padding: $padding-15;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__properties {
      text-align: left;
      padding: 10px 0;

      &__title {
        color: gray;
        font-size: 0.5rem;
      }

      &--align {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        text-align: left;
      }
    }
  }

  &__progressbar {
    background-color: #eaeaea;
    border-radius: 10px;
  }

  &__progress {
    background-color: yellowgreen;
    height: 10px;
    border-radius: 10px;
  }

  &__ready {
    background-color: yellowgreen;
    padding: 20px;
    margin-top: 10px;
  }
}

.target-languages--container {
  display: flex;
  p {
    padding-right: 5px;
  }
}

</style>
