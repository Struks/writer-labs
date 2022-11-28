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
// svg icon components (global components)
import './plugins/global-components';


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
    if (user) {
        store.actions.fetchCurrentUser(user);
        // if location pathname is login, signup or reset-password redirect to labaratory
        if (['/login', '/signup', '/reset-password'].includes(window.location.pathname)) {
            console.log('hellooo');
            router.push({ name: 'labaratory', params: { documents: 'files' } });
        }
        // set userVerified to true if email is verified and false if not
        store.state.userVerified = user.emailVerified;
    }
    // after sign up user need to verify email
    else if (!user && window.location.pathname.includes('/signup')) {
        console.log('hellooo 2');
        return
    }
    // default opinion is that user is not logged in
    else {
        console.log('hellooo 3');
        router.push({ name: 'login' });
    }
});


