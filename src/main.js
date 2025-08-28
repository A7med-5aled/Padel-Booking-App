import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import store from './vuex/store.js'
import '@fortawesome/fontawesome-free/css/all.min.css'


const app = createApp(App);
app.use(router).use(store).mount('#app');