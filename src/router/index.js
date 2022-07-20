import { createRouter, createWebHistory } from 'vue-router'
import WorkspaceView from '../views/WorkspaceView.vue'
import SingleFolder from '../views/SingleFolder.vue'

const routes = [
  {
    path: '/',
    name: 'WorkspaceView',
    component: WorkspaceView,
    meta: {
      breadcrumb: [
        { name: 'My Folders' },

      ]
    }
  },
  {
    path: '/:id/:folderName',
    name: 'SingleFolder',
    component: SingleFolder,
    props: true,
    meta: {
      breadcrumb: [
        { name: 'My Folders', link: '../../' },
        { name: 'SingleFolder' },
      ]
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
