<template>
  <div class="min-h-screen flex flex-col">
    <LayoutNavbar />

    <!-- المحتوى الرئيسي -->
    <loading-spinner v-if="isLoading"></loading-spinner>
    <router-view class="flex-grow" />

    <LayoutFooter />
  </div>
</template>

<script>
import LayoutNavbar from "./components/layout/Navbar.vue";
import LayoutFooter from "./components/layout/Footer.vue";
import LoadingSpinner from "./components/layout/LoadingSpinner.vue";
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("auth/autoLogin")
    const userData = JSON.parse(localStorage.getItem("userData")) || null;
    const userBookings = JSON.parse(localStorage.getItem("userBookings")) || null;
    userData ? this.$store.commit("auth/setUserData", userData) : "";
    userBookings ? this.$store.commit("auth/setUserBookings", userBookings) : "";
  },
  computed: {
    ...mapGetters("auth", {
      isLoading: "isLoading",
    }),
  },
  components: {
    LayoutFooter,
    LayoutNavbar,
    LoadingSpinner,
  },
};
</script>
