import { reactive } from "vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, listAll } from 'firebase/storage';
// toasted
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const state = reactive({
    currentUser: null,
    loader: false,
    userVerified: null,
    folders: [],
    // ...
});
const mutations = {
    setcurrentUser(payload) {
        state.currentUser = payload;
    },
    setLoader(payload) {
        state.loader = payload;
    },
    setUserVerified(payload) {
        state.userVerified = payload;
    },
    setFolders(payload) {
        state.folders = payload;
    },
};

const actions = {
    getFolders: async (uid) => {
        // get all folders from firebase storage
        const storage = getStorage();   
        const listRef = ref(storage, `/${uid}/`);
        const folders = [];
        await listAll(listRef).then((res) => {
            // folders
            res.prefixes.forEach((folderRef) => {
                console.log('folderRef', folderRef);
                folders.push({
                    name: folderRef.name,
                    path: folderRef.fullPath,
                    type: 'folder',
                });
            });
            // // files
            res.items.forEach((itemRef) => {
                console.log('itemRef', itemRef);

                // All the items under listRef.
            });
        }).catch((error) => {
            console.log(error);
        });

        mutations.setFolders(folders);
    },
        
    signIn: async (payload) => {
        state.loader = true;
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // navigate to user's library page 
                router.push('/labaratory/files');
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        toast.error("User not found");
                        break;
                    case "auth/wrong-password":
                        toast.error("Wrong password");
                        break;
                }
            });
        state.loader = false;         
    },
    signOut: async () => {
        const auth = getAuth();
        await signOut(auth).then(() => {
            mutations.setcurrentUser(null);
        }).catch((error) => {
            // An error happened.
            console.log('error', error);
        });
    },
    signUp: async (payload) => {
        state.loader = true;
        const auth = getAuth();
        const db = getFirestore();
        await createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // Signed in
                const authUser = userCredential.user;
                const docRef = addDoc(collection(db, "users"), {
                    email: payload.email,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    userName: payload.userName,
                    uid: authUser.uid,
                });

                sendEmailVerification(authUser)
                    .then(() => {
                        // Email verification sent!
                        toast.info('Email verification sent!')
                    });
                console.log("Document written with ID: ", docRef.id);
                signOut(auth);
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
        state.loader = false;
    },
    // reset password
    resetPassword: async (email) => {
        state.loader = true;
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // add modal about email sent user info
                toast.info('Password reset email sent!');
            })
            .catch((error) => {
                console.warn("Error rest password email", error);
                // const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
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
            let user = null;
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                user = doc.data();
                user.id = doc.id;
                user.emailVerified = payload.emailVerified;
            });
            mutations.setcurrentUser(user);

        } catch(error) {
            console.log('fetchCurrentUser error', error);
        }

        state.loader = false;
    },
};

export default {
    state,
    actions
}