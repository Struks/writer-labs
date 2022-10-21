import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import UserOwnLibrary from "../views/UserOwnLibrary.vue";

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
      component: Signup
    },
    {
      path: "/library",
      name: "library",
      component: UserOwnLibrary
    },
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
