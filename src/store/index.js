import { reactive } from "vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
const router = useRouter();

const state = reactive({
    currentUser: null,
    loader: false,
    // ...
});
const mutations = {
    setcurrentUser(state, payload) {
        state.currentUser = payload;
    },
    setLoader(state, payload) {
        state.loader = payload;
    },
    // ...
};

const actions = {
    signIn: async (payload) => {
        state.loader = true;
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // Signed in 
                router.push({ name: 'labaratory' });
            })
            .catch((error) => {
                console.log('error', error);
                switch(error.code) {
                    case "auth/user-not-found":
                        console.log("User not found");
                        break;
                    case "auth/wrong-password":
                        console.log("Wrong password");
                        break;
                    default:
                        console.log("Something went wrong");
                }
            });

        state.loader = false;
    },
    // call in main.js to fetch current user from firebase auth and set it to state
    fetchCurrentUser: async (payload) => {
        state.loader = true;
        const db = getFirestore();
        const q = query(collection(db, "users"), where("email", "==", payload.email));

        try {
            const querySnapshot = await getDocs(q);
    
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                let user = doc.data();
                user.id = doc.id;
                mutations.setcurrentUser(state, user);
            });

        } catch(error) {
            console.log('error', error);
        }

        state.loader = true;
    },
};

export default {
    state,
    actions
}