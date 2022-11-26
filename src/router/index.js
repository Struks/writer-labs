import { createRouter, createWebHistory } from "vue-router";
import store from '../store';

import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import UserOwnLabaratory from "../views/UserOwnLabaratory.vue";
import ResetPassword from "../views/ResetPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
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
      path: "/labaratory/:documents(.*)",
      name: "labaratory",
      component: UserOwnLabaratory,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    }
  ],
});
// if user is logged in and try to access login or signup page redirect to labaratory
// router.beforeEach((to, from, next) => {
//   if (['login', 'signup', 'reset-password'].includes(to.name) && store.state.currentUser) {
//     next({ name: 'labaratory', params: { documents: 'files' } });
//   } else {
//     next();
//   }
// });

export default router;
