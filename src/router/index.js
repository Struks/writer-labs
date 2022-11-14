import { createRouter, createWebHistory } from "vue-router";

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
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/labaratory",
      name: "labaratory",
      component: UserOwnLabaratory
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    }
  ],
});
//   // ovo cemo srediti preko firebase quth
// router.beforeEach((to, from, next) => {


//   const publicPages = ["/login", "/signup"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   if (authRequired && !loggedIn) {
//     return next("/login");  
//   } else {
//     next();
//   }

// });

export default router;
