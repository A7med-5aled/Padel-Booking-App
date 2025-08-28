<template>
  <header class="bg-gray-950 text-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <router-link
        to="/"
        class="text-2xl font-bold hover:text-blue-400 transition"
      >
        Best Padel
      </router-link>

      <!-- Burger button (hidden on desktop) -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none text-xl">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Links (desktop) -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium">
        <router-link
          to="/"
          class="hover:text-blue-400"
          exact-active-class="text-blue-400"
          >الرئيسية</router-link
        >
        <router-link
          to="/booking"
          class="hover:text-blue-400"
          exact-active-class="text-blue-400"
          >احجز</router-link
        >
        <router-link
          v-if="isAuth"
          to="/profile"
          class="hover:text-blue-400"
          exact-active-class="text-blue-400"
          >صفحتي الشخصيه</router-link
        >
        <router-link
          v-if="!isAuth"
          to="/login"
          class="hover:text-blue-400"
          exact-active-class="text-blue-400"
          >تسجيل دخول</router-link
        >
        <button
          v-else
          @click="logout"
          :class="{
            'hover:text-blue-400 cursor-pointer': true,
          }"
        >
          تسجيل خروج
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      :class="{
        'md:hidden bg-gray-900 px-4 py-0 space-y-2 text-sm font-medium text-white/80 max-h-0 transition-all duration-300 ease-in-out ': true,
        'max-h-[300px] py-4': isOpen,
      }"
    >
      <router-link
        to="/"
        @click="closeMenu"
        :class="{
          'block hover:text-blue-400 text-right py-2 border-b shadow shadow-white px-2': true,
          'pointer-events-none': !isOpen,
        }"
        >الرئيسية</router-link
      >
      <router-link
        v-if="isAuth"
        to="/profile"
        :class="{
          'block hover:text-blue-400 text-right py-2 border-b shadow shadow-white px-2': true,
          'pointer-events-none': !isOpen,
        }"
        >صفحتي الشخصيه</router-link
      >
      <router-link
        to="/booking"
        @click="closeMenu"
        :class="{
          'block hover:text-blue-400 text-right py-2 border-b shadow shadow-white px-2': true,
          'pointer-events-none': !isOpen,
        }"
        >احجز</router-link
      >
      <router-link
        v-if="!isAuth"
        to="/login"
        @click="closeMenu"
        :class="{
          'block hover:text-blue-400 text-right py-2 border-b shadow shadow-white px-2': true,
          'pointer-events-none': !isOpen,
        }"
        >تسجيل دخول</router-link
      >
      <button
        v-else
        @click="logout"
        :class="{
          'block w-full hover:text-blue-400 text-right py-2 border-b shadow shadow-white px-2': true,
          'pointer-events-none': !isOpen,
        }"
      >
        تسجيل خروج
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAuth: "isAuth",
    }),
  },
  methods: {
    ...mapMutations("auth", {
      logout: "logout",
    }),
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
  },
};
</script>
