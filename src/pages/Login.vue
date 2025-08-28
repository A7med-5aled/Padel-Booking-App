<template>
  <div>
    <h1 v-if="loginFirst" class="font-bold text-center mt-20 text-red-600 text-[25px]">سجل دخول الاول</h1>
    <div class="max-w-md mx-auto mt-5 bg-white p-6 rounded-lg shadow my-10">
      <h2 class="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>

      <form @submit.prevent="onLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="البريد الإلكتروني"
          class="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="كلمة السر"
          class="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <p v-if="error" class="text-red-600 text-sm text-center text-[20px]">{{ error }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          تسجيل الدخول
        </button>
        <router-link
          :to="{ name: 'register' }"
          class="block bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-2 rounded"
        >
          انشاء حساب
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      errors: {
        INVALID_LOGIN_CREDENTIALS: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        USER_DISABLED: "تم تعطيل الحساب بواسطة الإدارة",
        INVALID_EMAIL: "صيغة البريد الإلكتروني غير صحيحة",
      },
    };
  },
  computed: {
    loginFirst() {
      return this.$route.query.loginFirst;
    },
  },
  methods: {
    ...mapActions("auth", {
      login: "login",
    }),
    ...mapMutations("auth", {
      loading: "loading",
      stopLoading: "stopLoading",
    }),
    async onLogin() {
      try {
        this.loading();
        await this.login({ email: this.email, password: this.password });
        this.stopLoading();
      } catch (err) {
        this.stopLoading();
        this.error =
          this.errors[err.message] || "Something went wrong please try again";
        console.log(err.message);
      }
    },
  },
};
</script>
