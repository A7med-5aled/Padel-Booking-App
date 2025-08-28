<template>
  <div class="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow mb-10">
    <h2 class="text-2xl font-bold text-center mb-6">إنشاء حساب</h2>

    <form @submit.prevent="register" class="space-y-4">
      <input
        v-model.trim="name"
        type="text"
        placeholder="الاسم"
        class="w-full border border-gray-300 rounded px-4 py-2"
        required
        @focus="(checkEamil = true), (error = ''), (checkPassword = true)"
      />
      <!-- <input
        v-model="phone"
        type="tel"
        placeholder="رقم التليفون"
        class="w-full border border-gray-300 rounded px-4 py-2"
        required
      /> -->
      <input
        v-model.trim="email"
        type="email"
        placeholder="البريد الإلكتروني"
        :class="{
          'w-full border border-gray-300 rounded px-4 py-2 transition': true,
          'border-red-500 border-3 text-red-600': !checkEamil,
        }"
        @focus="(checkEamil = true), (error = ''), (checkPassword = true)"
        required
      />
      <input
        v-model.trim="password"
        type="password"
        placeholder="كلمة السر"
        :class="{
          'w-full border border-gray-300 rounded px-4 py-2 transition': true,
          'border-red-500 border-2': !checkPassword,
        }"
        required
        @focus="(checkEamil = true), (error = ''), (checkPassword = true)"
      />
      <input
        v-model.trim="confirmPassword"
        type="password"
        placeholder="تأكيد كلمة السر"
        :class="{
          'w-full border border-gray-300 rounded px-4 py-2 transition': true,
          'border-red-500 border-2': !checkPassword,
        }"
        required
        @focus="(checkEamil = true), (error = ''), (checkPassword = true)"
      />

      <p v-if="error" class="text-red-600 text-sm font-bold text-center">
        {{ error }}
      </p>

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
      >
        إنشاء الحساب
      </button>
      <router-link
        :to="{ name: 'Login' }"
        class="block bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 rounded"
      >
        تسجيل دخول
      </router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex/dist/vuex.cjs.js";
// import auth from '../vuex/modules/auth/auth'

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      checkEamil: true,
      checkPassword: true,
    };
  },
  methods: {
    ...mapMutations("auth", {
      loading: "loading",
      stopLoading: "stopLoading",
    }),
    ...mapActions("auth", {
      signUp: "signUp",
    }),
    isValidForm() {
      if (
        this.email != "" &&
        this.name != "" &&
        this.password != "" &&
        this.confirmPassword != ""
      ) {
        return true;
      }
      return false;
    },
    async register() {
      if (!this.isValidForm()) return;
      if (this.password !== this.confirmPassword) {
        this.error = "كلمة السر وتأكيدها مش متطابقين";
        return;
      }
      try {
        this.loading(),
          await this.signUp({
            email: this.email,
            password: this.password,
            name: this.name,
          });
        this.stopLoading();
        console.log(this.$store.getters["auth/userData"]);
      } catch (err) {
        // console.log(err.message);
        this.stopLoading();

        let msg = "";
        if (err.message == "EMAIL_EXISTS") {
          msg = "Email Already Exist";
          this.checkEamil = false;
        }
        if (err.message === "INVALID_EMAIL") msg = "البريد الإلكتروني غير صحيح";
        if (
          err.message ===
          "WEAK_PASSWORD : Password should be at least 6 characters"
        )
          msg = "كلمة السر ضعيفة";

        this.error = msg || "حصل خطاء برجاء المحاوله مره اخري";
      }
    },
  },
};
</script>
