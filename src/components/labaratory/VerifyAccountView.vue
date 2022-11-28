<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { useRoute } from "vue-router";
//components imports
import Directory from './Directory.vue';

const router = useRoute();

defineProps({
    user: {
        type: Object,
        required: true
    }
});

// variables
const showFiles = ref(true);
const showFolders = ref(false);
const showRecentFiles = ref(false);

// Mounted
onMounted(() => {
    // in case what is router params set filter to true and others to false
    const document = router.params.documents;
    console.log('route document', document)
    if (document === 'files') {
        showFilesHandler();
    } else if (document === 'folders') {
        showFoldersHandler();
    } else if (document === 'recent-files') {
        showRecentFilesHandler();
    }
});

// Methods

// nested methods
const showFilesHandler = () => {
    showFiles.value = true;
    showFolders.value = false;
    showRecentFiles.value = false;
};
const showFoldersHandler = () => {
    showFiles.value = false;
    showFolders.value = true;
    showRecentFiles.value = false;
};
const showRecentFilesHandler = () => {
    showFiles.value = false;
    showFolders.value = false;
    showRecentFiles.value = true;
};
// handlers for nested methods
const activeTab = (documentKind) => {
    switch (documentKind) {
        case 'files':
            // router.push('/labaratory/files');
            showFilesHandler();
            break;
        case 'folders':
        // router.push('/labaratory/folders');
            showFoldersHandler();
            break;
        case 'recent-files':
        // router.push('/labaratory/recent-files');
            showRecentFilesHandler();
            break;
        default:
            // showFilesHandler();
            break;
    }
}
</script>

<template>
    <div>
        <h1 v-if="user && user.userName" class="rotate-y text-4xl uppercase font-bold text-center">{{user.userName}}'s library</h1>
        <!-- <div class="rotate-y flex justify-evenly mt-10">
            <router-link to="/labaratory/files" @click="activeTab('files')" ><h3 class="text-lg cursor-pointer hover:underline underline-offset-2" :class="{'underline': showFiles}">Files</h3></router-link>
            <router-link to="/labaratory/folders" @click="activeTab('folders')"><h3 class="text-lg cursor-pointer hover:underline underline-offset-2" :class="{'underline': showFolders}">Folders</h3></router-link>
            <router-link to="/labaratory/recent-files" @click="activeTab('recent-files')"><h3 class="text-lg cursor-pointer hover:underline underline-offset-2" :class="{'underline': showRecentFiles}">Recent files</h3></router-link>
        </div> -->

    </div>
    <div class="rotate-y writer-folders-files">
        <Directory />
    </div>
</template>


<style lang="scss" scoped>

</style>