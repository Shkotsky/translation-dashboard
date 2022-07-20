import { createStore } from "vuex";
import axios from "axios";

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
    setAllFolders(state, payload) {
      state.allFolders = payload;
    },
    setAllSingleProjects(state, payload) {
      state.projects = payload;
      state.isLoading = false;
    },
    setSingleFolder(state, payload) {
      state.projects = payload;
      state.isLoading = false;
    },
    getFolderName(state, title) {
      state.newFolder = title;
    },
    setCreatedFolder(state, payload) {
      console.log(payload, "You Created a Folder");
      state.isLoading = false;
    },
    setProjectParams(state, params) {
      state.newProjectParams = params;
    },
    setCreatedProject(state, payload) {
      console.log(payload, "You Created a Project");
      state.isLoading = false;
    },
  },
  actions: {
    async getAllFolders(context) {
      try {
        const res = await axios.get(
          `http://localhost:3000/folders?_sort=attributes.created_at&_order=desc`
        );

        context.commit("setAllFolders", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getAllSingleProjects(context) {
      try {
        this.state.isLoading = true;
        const res = await axios.get(
          `http://localhost:3000/projects?_sort=attributes.created_at&_order=desc`
        );
        context.commit("setAllSingleProjects", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getSingleFolder(context, id) {
      try {
        this.state.isLoading = true;
        const res = await axios.get(`http://localhost:3000/folders/${id}`);

        const projects = await axios
          .all(
            res.data.projects.map((project) =>
              axios.get(`http://localhost:3000/projects/${project}`)
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

        context.commit("setSingleFolder", projects);
      } catch (error) {
        console.log(error);
      }
    },
    async createFolder(context) {
      try {
        this.state.isLoading = true;
        const res = await axios.post(
          `http://localhost:3000/folders`,
          {
            type: "project-folder",
            attributes: {
              name: this.state.newFolder,
              created_at: new Date(),
              updated_at: new Date(),
            },
            projects: [],
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        context.commit("setCreatedFolder", res);
      } catch (error) {
        console.log(error);
      }
    },
    async createProject(context) {
      console.log(this.state.newProjectParams);
      try {
        this.state.isLoading = true;
        const res = await axios.post(
          `http://localhost:3000/projects`,
          this.state.newProjectParams,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        context.commit("setCreatedProject", res);
      } catch (error) {
        console.log(error);
      }
    },
    async updateFolder(context, {folder, project}) {
      try {
        const res = await axios.patch(
          `http://localhost:3000/folders/${folder}`,
          {
            updated_at: new Date(),
            projects: [project],
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});
