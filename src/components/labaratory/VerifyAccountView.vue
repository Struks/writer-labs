<script setup>
import { ref, computed, inject, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
//components imports
import { ContentLoader } from "vue-content-loader";
import Directory from "./Directory.vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import AddFolderProcess from './AddFolderProcess.vue';
import UploadFileProcess from './UploadFileProcess.vue';

const store = inject("store");
const router = useRoute();
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// variables
const addFolderProcess = ref(false);
const uploadFileProcess = ref(false);

// Mounted
onMounted(() => {
  // in case what is router params set filter to true and others to false
  // const document = router.params.documents;
  // set currentFullPath in store to user uid
  store.state.currentFullPath = props.user.uid;
});

// Computed
const getCurentFullPath = computed(() => store.state.currentFullPath);
const getLabaratoryLoader = computed(() => store.state.labaratoryLoader);

// Watch
watch(getCurentFullPath, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    addFolderProcess.value = false;
    uploadFileProcess.value = false;
  }
});

// Methods
const setAddFolderProcess = () => {
  addFolderProcess.value = !addFolderProcess.value;
  if(uploadFileProcess.value === true) uploadFileProcess.value = false;
};
const setUploadFileProcess = () => {
  uploadFileProcess.value = !uploadFileProcess.value;
  if(addFolderProcess.value === true) addFolderProcess.value = false;
};
</script>

<template>
  <div>
    <h1
      v-if="user && user.userName"
      class="rotate-y text-4xl uppercase font-bold text-center"
    >
      {{ user.userName }}'s library
    </h1>
    <div class="rotate-y breadcrumbs-div mt-6">
      <Breadcrumbs :currentFullPath="getCurentFullPath" />
    </div>
    <div class="rotate-y mt-5 mb-[2rem]">
      <ul class="flex list-none justify-evenly">
        <li
          @click="setAddFolderProcess"
          title="Click me"
          class="text-lg cursor-pointer hover:underline underline-offset-2"
          :class="{ underline: addFolderProcess }"
        >
          Add folder
        </li>
        <li
          @click="setUploadFileProcess"
          title="Click me"
          class="text-lg cursor-pointer hover:underline underline-offset-2"
          :class="{ underline: uploadFileProcess }"
        >
          Upload file
        </li>
      </ul>
    </div>
    <add-folder-process v-model="addFolderProcess" />
    <UploadFileProcess v-if="uploadFileProcess" />
  </div>
  <div class="rotate-y writer-folders-files py-3">
    <div v-if="getLabaratoryLoader">
        <content-loader class="rotate-y" viewBox="0 0 750 300">
            <rect x="0" y="0" rx="3" ry="3" width="120" height="120" />
            <rect x="150" y="0" rx="3" ry="3" width="120" height="120" />
            <rect x="300" y="0" rx="3" ry="3" width="120" height="120" />
            <rect x="450" y="0" rx="3" ry="3" width="120" height="120" />
            <rect x="600" y="0" rx="3" ry="3" width="120" height="120" />

            <rect x="0" y="150" rx="3" ry="3" width="120" height="120" />
            <rect x="150" y="150" rx="3" ry="3" width="120" height="120" />
            <rect x="300" y="150" rx="3" ry="3" width="120" height="120" />
            <rect x="450" y="150" rx="3" ry="3" width="120" height="120" />
            <rect x="600" y="150" rx="3" ry="3" width="120" height="120" />
        </content-loader>
    </div>
    <Directory v-if="!getLabaratoryLoader" />
  </div>
</template>


<style lang="scss" scoped>
</style>