const routes = [
  { path: "/", name: "Home", component: () => import("../pages/Home.vue") },
  {
    path: "/booking",
    name: "Booking",
    meta: { auth: true },
    component: () => import("../pages/Booking.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { auth: false },

    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { auth: false },

    component: () => import("../pages/Register.vue"),
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: () => import("../pages/VerifyEmail.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { auth: true },
    component: () => import("../pages/Profile.vue"),
  },
];

export default routes;
