<script setup>
import { onMounted, inject, computed, ref } from "vue";
import SvgIcon from "../SvgIcon.vue";
import FileButtons from "./FileButtons.vue";

const store = inject("store");

// data
const showButtons = ref(false);
// mounted
onMounted(async () => {
  await store.actions.getStorage();
});

// Computed
const getFolders = computed(() => store.state.folders);
const getFiles = computed(() => store.state.files);
const getSelectedFile = computed(() => store.state.selectedFile);

// Methods
// call getStorage action from store
const getStorage = async (path) => {
  // set store currentFullPath to path
  store.state.currentFullPath = path;
  // call api
  await store.actions.getStorage();
};
// edit file name by except extention
const editFileName = (name) => {
  const extention = name.split(".").pop();
  return name.replace(`.${extention}`, "");
};
// create method to find extenzion of file and set file type
const getFileType = (file) => {
  const ext = file.name.split(".").pop();
  switch (ext) {
    case "pdf":
      return "pdf";
    case "doc":
      return "doc";
    case "docx":
      return "doc";
    case "txt":
      return "txt";
    default:
      return "file";
  }
};
const setButtons = (file) => {
  // if clicked file is not the same as the selected file
  if (store.state.selectedFile !== file) {
    store.state.selectedFile = file;
    showButtons.value = true;
  }
  // if clicked file is the same as the selected file
  else {
    showButtons.value = false;
    store.state.selectedFile = null;
  }
};
const downloadFile = async (file) => {
  await store.actions.downloadFile(file);
  showButtons.value = false;
  store.state.selectedFile = null;
};
const deleteFile = async (file) => {
  await store.actions.deleteFile(file);
  showButtons.value = false;
  store.state.selectedFile = null;
};
</script>


<template>
  <div v-if="getFolders?.length || getFiles?.length" class="directory-grid flex gap-2 justify-center">
    <div
      v-for="(folder, index) in getFolders"
      :key="index"
      @click="getStorage(folder.path)"
      class="folder cursor-pointer basis-1/5 hover:underline"
    >
      <svg-icon name="folder" />
      <div class="folder-name font-mono font-semibold leading-5">
        {{ folder.name }}
      </div>
    </div>
    <div
      v-for="(file, index) in getFiles"
      :key="index"
      @click="setButtons(file)"
      class="folder cursor-pointer basis-1/5 relative hover:underline"
    >
      <svg-icon :name="getFileType(file)" title="Click me" />
      <div
        title="Click me"
        class="file-name font-mono font-semibold leading-5 pt-1"
      >
        {{ editFileName(file.name) }}
      </div>
      <div
        v-if="showButtons && getSelectedFile.name === file.name"
        class="absolute left-[-33%] top-[-37%]"
      >
        <div class="relative flex justify-center gap-4">
          <svg-icon
            @click="downloadFile(file)"
            name="download"
            title="Download"
            class="
              flex-auto
              bg-page
              animate-[move-download-button_500ms_ease-in-out]
            "
          />
          <svg-icon
            @click="deleteFile(file)"
            name="delete"
            title="Delete"
            class="
              flex-auto
              bg-page
              animate-[move-delete-button_500ms_ease-in-out]
            "
          />
        </div>
      </div>
    </div>
  </div>
  <!-- no files or folder -->
  <div v-if="!getFolders?.length && !getFiles?.length">
    <div class="flex justify-center">
      <svg-icon name="empty" />
    </div>
    <div class="flex justify-center">
      <div class="text-center">
        <div class="font-semibold text-2xl pb-1">Empty</div>
        <div class="text-gray-500">There is no file or folder</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>