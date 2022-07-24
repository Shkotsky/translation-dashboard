import { createStore } from "vuex";
import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

export default createStore({
  state: {
    allSingleProjects: null,
    allFolders: null,
    projects: null,
    filtered: null,
    isLoading: false,
    showModal: false,
    showProjectModal: false,
    newFolder: null,
    newProject: null,
    newProjectParams: null,
    breadcrumbList: null,
    showNewFolderButton: true,
  },
  getters: {},
  mutations: {
    SET_ALL_FOLDERS(state, payload) {
      state.allFolders = payload;
    },
    SET_ALL_SINGLE_PROJECTS(state, payload) {
      state.projects = payload;
      state.isLoading = false;
    },
    SET_SINGLE_FOLDER(state, payload) {
      state.projects = payload;
      state.isLoading = false;
    },
    GET_FOLDER_NAME(state, title) {
      state.newFolder = title;
    },
    SET_CREATED_FOLDER(state, payload) {
      console.log(payload, "You Created a Folder");
      state.isLoading = false;
    },
    SET_PROJECT_PARAMS(state, params) {
      state.newProjectParams = params;
    },
    SET_CREATED_PROJECT(state, payload) {
      console.log(payload, "You Created a Project");
      state.isLoading = false;
    },
  },
  actions: {
    async getAllFolders(context) {
      try {
        const res = await axios.get(
          `${baseURL}/folders?_sort=created_at&_order=desc`
        );

        context.commit("SET_ALL_FOLDERS", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getAllSingleProjects(context) {
      try {
        this.state.isLoading = true;
        const res = await axios.get(
          `${baseURL}/projects?_sort=created_at&_order=desc`
        );
        context.commit("SET_ALL_SINGLE_PROJECTS", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getSingleFolder(context, id) {
      try {
        this.state.isLoading = true;
        const res = await axios.get(`${baseURL}/folders/${id}`);

        const projects = await axios
          .all(
            res.data.projects.map((project) =>
              axios.get(`${baseURL}/projects/${project}`)
            )
          )
          .then(
            axios.spread((...data) => {
              let projectData = [...data].map((item) => {
                return item.data;
              });
              return projectData;
            })
          );

        context.commit("SET_SINGLE_FOLDER", projects);
      } catch (error) {
        console.log(error);
      }
    },
    async createFolder(context) {
      try {
        this.state.isLoading = true;
        const res = await axios.post(
          `${baseURL}/folders`,
          {
            type: "project-folder",
            name: this.state.newFolder,
            created_at: new Date(),
            updated_at: new Date(),

            projects: [],
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        context.commit("SET_CREATED_FOLDER", res);
      } catch (error) {
        console.log(error);
      }
    },
    async createProject(context) {
      console.log(this.state.newProjectParams);
      try {
        this.state.isLoading = true;
        const res = await axios.post(
          `${baseURL}/projects`,
          this.state.newProjectParams,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        context.commit("SET_CREATED_PROJECT", res);
      } catch (error) {
        console.log(error);
      }
    },
    async updateFolder(context, { folder, project }) {
      try {
        await axios.patch(
          `${baseURL}/folders/${folder.id}`,
          {
            updated_at: new Date(),
            projects: [project, ...folder.projects],
          }    
        );
      } catch (error) {
        console.log(error);
      }
    },
    async removeProjectFromFolder(context, { folder, projects }) {
      try {
        await axios.patch(`${baseURL}/folders/${folder}`, {
          projects: projects,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
