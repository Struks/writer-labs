import { createRouter, createWebHistory } from "vue-router";
import store from '../store';

import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import UserOwnLibrary from "../views/UserOwnLibrary.vue";
import ResetPassword from "../views/ResetPassword.vue";
import PdfReader from "../views/PdfReader.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/library",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
    // library
    {
      path: "/library",
      name: "library",
      component: UserOwnLibrary,
    },
    // pdf reader
    {
      path: "/pdf-reader/:pdf",
      name: "pdf-reader",
      component: PdfReader,
    },

  ],
});
// if user is logged in and try to access login or signup page redirect to library
router.beforeEach((to, from, next) => {
  if (['login', 'signup', 'reset-password'].includes(to.name) && store.state.currentUser) {
    next({ name: 'library' });
  } else {
    next();
  }
});

export default router;
