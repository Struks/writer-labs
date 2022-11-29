<script setup>
import { onMounted, inject, computed, ref } from "vue";
import SvgIcon from "../SvgIcon.vue";
import FileButtons from "./FileButtons.vue";

const store = inject("store");

// data
const showButtons = ref(false);
// mounted
onMounted(async () => {
  await store.actions.getStorage(store.state.currentUser.uid);
});
// computed
const getFolders = computed(() => store.state.folders);
const getFiles = computed(() => store.state.files);
const getSelectedFile = computed(() => store.state.selectedFile);
// methods
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
  <div class="directory-grid flex gap-2">
    <div
      v-for="(folder, index) in getFolders"
      :key="index"
      class="folder cursor-pointer basis-1/5"
    >
      <svg-icon name="folder" />
      <div class="folder-name font-mono font-semibold leading-5">
        {{ folder.name }}
      </div>
    </div>
    <div
      @click="setButtons(file)"
      v-for="(file, index) in getFiles"
      :key="index"
      class="folder cursor-pointer basis-1/5 relative hover:underline"
    >
      <svg-icon name="file" title="Click me" />
      <div
        title="Click me"
        class="file-name font-mono font-semibold leading-5 pt-1"
      >
        {{ file.name }}
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
</template>


<style lang="scss" scoped>
</style>