import { reactive } from "vue"
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, deleteObject, uploadBytesResumable, uploadBytes, getDownloadURL } from 'firebase/storage';
// toasted
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const state = reactive({
    currentUser: null,
    bookPageLoader: false,
    libraryLoader: false,
    userVerified: null,
    folders: [],
    files: [],
    selectedFile: null,
    currentFullPath: null,
    uploadProcess: null, // upload process in %
    // PDF reader
    pdfUrl: null,
    viewport: {
        width: 500, // initial state
        height: 600, // initial state
    },
    pdfReaderActive: false,
    pdfReaderName: null,
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
    },
    setUploadProcess(payload) {
        state.uploadProcess = payload;
    },
    setPdfUrl(payload) {
        state.pdfUrl = payload;
    },
    setViewport(payload) {
        state.viewport = payload;
    },
    setPdfReaderActive(payload) {
        state.pdfReaderActive = payload;
    },
    setPdfReaderName(payload) {
        state.pdfReaderName = payload;
    },
};

const actions = {
    addFolder: async (folderName) => {
        // Only way to create folder in firebase storage is to upload a file with null value and then delete it
        const storage = getStorage();
        const storageRef = ref(storage, `${state.currentFullPath}/${folderName}/${null}`); 
        // create null file in new folder path 
        await uploadBytes(storageRef, null).then(() => {
            toast.success('Folder created successfully');
            // delete null file
            deleteObject(storageRef);
            // update current path in store and access to new folder
            mutations.setCurrentFullPath(`${state.currentFullPath}/${folderName}/`);
            actions.getStorage(`${state.currentFullPath}`);
        }).catch((error) => {
            toast.error(error.message);
        });
    },
    uploadFile: async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `${state.currentFullPath}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);  
        await uploadTask.on('state_changed', (snapshot) => {  
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            state.uploadProcess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(state.uploadProcess);
            switch (snapshot.state) {
                case 'paused':
                    toast.info('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            // Handle unsuccessful uploads
            toast.error(error.message);
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            mutations.setUploadProcess(null);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                toast.success('File uploaded successfully');

                actions.getStorage(state.currentFullPath); 
            });
        });
    },
    downloadFile: async (file, onlyGetUrl = false) => {
        const storage = getStorage();
        await getDownloadURL(ref(storage, file.path)).then((url) => {
            if(onlyGetUrl) {
                mutations.setPdfUrl(url);
            } else {
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
            }

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
            toast.error(error.message);
        });
        // state.libraryLoader = false;
        // store folders and files in state
        mutations.setFolders(folders);
        mutations.setFiles(files);
    },

    signIn: async (payload) => {
        state.bookPageLoader = true;
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then((userCredential) => {
                // navigate to user's library page 
                router.push('/library');
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

    // empty state after user sign out
    emptyState: async () => {
        mutations.setFolders([]);
        mutations.setFiles([]);
        mutations.setcurrentUser(null);
    }
};

export default {
    state,
    actions
}