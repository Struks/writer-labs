import { reactive } from "vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, deleteObject, getDownloadURL } from 'firebase/storage';
// toasted
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const state = reactive({
    currentUser: null,
    bookPageLoader: false,
    userVerified: null,
    folders: [],
    files: [],
    selectedFile: null,
    currentFullPath: null,
});
const mutations = {
    setcurrentUser(payload) {
        state.currentUser = payload;
    },
    setBookPageLoader(payload) {
        state.bookPageLoader = payload;
    },
    setUserVerified(payload) {
        state.userVerified = payload;
    },
    setFolders(payload) {
        state.folders = payload;
    },
    setFiles(payload) {
        state.files = payload;
    },
    setSelectedFile(payload) {
        state.selectedFile = payload;
    },
    setCurrentFullPath(payload) {
        state.currentFullPath = payload;
    }
};

const actions = {
    downloadFile: async (file) => {
        const storage = getStorage();
        await getDownloadURL(ref(storage, file.path)).then((url) => {
            console.log('url', url);
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            // open url in new tab  
            window.open(url, '_blank');

        }).catch(error => {
            switch (error.code) {
                case 'storage/object-not-found':
                    toast.error('File doesn\'t exist');
                    break;
                case 'storage/unauthorized':
                    toast.error('User doesn\'t have permission to access the object');
                    break;
                case 'storage/canceled':
                    toast.error('User canceled the operation');
                    break;
                case 'storage/unknown':
                    toast.error('Unknown error occurred, inspect the server response')
                    break;
            }
        });


    },
    deleteFile: async (file) => {
        const storage = getStorage();
        const desertRef = ref(storage, file.path);
        try {
            // Create a reference to the file to delete  
            await deleteObject(desertRef);
            toast.success('File deleted successfully');
            // get parent path folder
            const parentPath = file.path.split('/').slice(0, -1).join('/');
            // todo: path ce biti univerzalan za sve fajlove
            await actions.getStorage(parentPath);

        } catch (err) {
            toast.error('Error deleting file');
        }
    },
    getStorage: async () => {
        // state.bookPageLoader = true;
        // get all folders and files from firebase storage from specific folder
        const storage = getStorage();
        const listRef = ref(storage, `/${state.currentFullPath}/`);
        const folders = [];
        const files = [];
        await listAll(listRef).then((res) => {
            // folders
            res.prefixes.forEach(folderRef => {
                folders.push({
                    name: folderRef.name,
                    path: folderRef.fullPath,
                    type: 'folder',
                });
            });
            // files
            res.items.forEach((itemRef) => {
                files.push({
                    name: itemRef.name,
                    path: itemRef.fullPath,
                    type: 'file',
                });
            });
        }).catch((error) => {
            console.log(error);
            toast.error(e.message);
        });
        // store folders and files in state
        mutations.setFolders(folders);
        mutations.setFiles(files);
        // state.bookPageLoader = false;
    },

    signIn: async (payload) => {
        state.bookPageLoader = true;
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // navigate to user's library page 
                router.push('/labaratory/files');
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/user-not-found":
                        toast.error("User not found");
                        break;
                    case "auth/wrong-password":
                        toast.error("Wrong password");
                        break;
                }
            });
        state.bookPageLoader = false;
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
        state.bookPageLoader = true;
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
        state.bookPageLoader = false;
    },
    // reset password
    resetPassword: async (email) => {
        state.bookPageLoader = true;
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
        state.bookPageLoader = false;
    },

    // call in main.js to fetch current user from firebase auth and set it to state
    fetchCurrentUser: async (payload) => {
        state.bookPageLoader = true;
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

        } catch (error) {
            console.log('fetchCurrentUser error', error);
        }

        state.bookPageLoader = false;
    },
};

export default {
    state,
    actions
}