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


let app = '';
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if(!app) {
        app = createApp(App);
        app.use(router);
        app.mount("#app");
    }
    console.log('user', user);
    if (user) {
        router.push({ name: 'labaratory' });
        store.actions.fetchCurrentUser(user);
    } else {
        router.push({ name: 'login' });
    }
}
);


