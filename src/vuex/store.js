import { createStore } from "vuex";
import auth from "./modules/auth/auth";
const store = createStore({
  modules: { auth },
  state() {
    return {};
  },
});
export default store;
