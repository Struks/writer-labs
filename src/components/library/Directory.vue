<script setup>
import { onMounted, inject, computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import SvgIcon from "../SvgIcon.vue";

const store = inject("store");
const router = useRouter();

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
const getPdfUrl = computed(() => store.state.pdfUrl);

// Methods
// call getStorage action from store
const getStorage = async (path) => {
  // set store currentFullPath to path
  store.state.currentFullPath = path + '/';
  // call api
  store.state.libraryLoader = true;
  await store.actions.getStorage();
  store.state.libraryLoader = false;
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
const readPdf = async file => {
  // true in action means that acction get only url
  await store.actions.downloadFile(file, true);
  // remove extention from file name
  const name = editFileName(file.name);
  router.push({ name: 'pdf-reader', params: { pdf: name } });

}
// create method to display file if his name isn't 'null'
const displayFile = (files) => {
  // filter array of files and return only files with name !== 'null'
  return files.filter((file) => file.name !== "null");
};
// create method to cut text if it's too long
const cutText = (text) => {
  if (text.length > 25) {
    return text.slice(0, 25) + "...";
  } else {
    return text;
  }
};
</script>


<template>
  <div v-if="getFolders?.length || getFiles?.length" class="directory-grid flex gap-2 justify-center flex-wrap">
    <div
      v-for="(folder, index) in getFolders"
      :key="index"
      @click="getStorage(folder.path)"
      :title="folder.name"
      class="folder cursor-pointer basis-1/5 hover:underline underline-offset-2"
    >
      <svg-icon name="folder" />
      <div class="folder-name font-mono font-semibold leading-5">
        {{ cutText(folder.name) }}
      </div>
    </div>
    <div
      v-for="(file, index) in displayFile(getFiles)"
      :key="index"
      @click="setButtons(file)"
      class="folder cursor-pointer basis-1/5 relative hover:underline underline-offset-2"
    >
      <svg-icon :name="getFileType(file)" title="Click me" />
      <div
        :title="editFileName(file.name)"
        class="file-name font-mono font-semibold leading-5 pt-1"
      >
        {{ cutText(editFileName(file.name)) }}
      </div>
      <div
        v-if="showButtons && getSelectedFile.name === file.name"
        class="absolute top-[-37%] right-0"
      >
        <div class="relative flex justify-center gap-4">
          <svg-icon
            @click="downloadFile(file)"
            name="download"
            title="Download"
            class="
              flex-auto
              bg-page
            "
            :class="{'animate-[move-download-button-3icons_500ms_ease-in-out]': getFileType(file) === 'pdf', 'animate-[move-download-button_500ms_ease-in-out]': getFileType(file) !== 'pdf'}"
          />
          <svg-icon
            @click="deleteFile(file)"
            name="delete"
            title="Delete"
            class="
              flex-auto
              bg-page
            "
            :class="{'animate-[move-delete-button-3icons_500ms_ease-in-out]': getFileType(file) === 'pdf', 'animate-[move-delete-button_500ms_ease-in-out]': getFileType(file) !== 'pdf'}"
          />
          <svg-icon
            v-if="getFileType(file) === 'pdf'"
            @click="readPdf(file)"
            name="read"
            title="Read"
            class="
              flex-auto
              bg-page
              animate-[move-read-button_500ms_ease-in-out]
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