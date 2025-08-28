import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.js";
import store from '../vuex/store.js';

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});
router.beforeEach((to, _, next) => {
 if(to.meta.auth && !store.getters['auth/userId']){
  next({path:'/login' ,query:{loginFirst:true}})
 }
 else if (to.meta.auth == false && store.getters['auth/userId']){
  next('/')
 }
 else{
  next()
 }
});

export default router;
