// VUE 3
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Firebase
import './firebase/init';
import { getAuth, onAuthStateChanged } from "firebase/auth";
// CSS
import './index.css'
import "./assets/main.css";
// Store
import store from './store';
// Toasted
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


let app = '';
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (!app) {
        app = createApp(App);
        app.use(router);
        app.use(Toast, {
            // ... options
        });
        app.mount("#app");
    }
    console.log('user', user);
    // is email verified
    if (user) {
        store.actions.fetchCurrentUser(user);
        router.push({ name: 'labaratory' });
    }
    // after sign up user need to verify email
     else if (!user && window.location.pathname.includes('/signup')) {
        return
    }
    // default opinion is that user is not logged in
    else {
        router.push({ name: 'login' });
    }
}
);


