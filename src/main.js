import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faEllipsisVertical, faFolderOpen, faClock } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faFolder, faEllipsisVertical, faFolderOpen, faClock);

import '@/assets/_main.scss'

createApp(App).component('fa', FontAwesomeIcon).use(store).use(router).mount('#app');


