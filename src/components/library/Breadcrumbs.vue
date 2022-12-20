

<script setup>
import { ref, computed, inject, onMounted } from "vue";

const store = inject("store");
const props = defineProps({
  currentFullPath: {
    type: String,
    required: true,
  },
});
// Computed
// create breadcrumbs from currentFullPath
const breadcrumbs = computed(() => {
  const path = props.currentFullPath.split("/");
  const breadcrumbs = [];
  let fullPath = "";
  for (let i = 0; i < path.length; i++) {
    fullPath += path[i] + "/";
    breadcrumbs.push({
      name: path[i],
      fullPath: fullPath,
    });
  }
  return breadcrumbs;
});

// Methods
// call getStorage action from store
const navigateToFolder = async (path) => {
  // only call api if path is not the same as currentFullPath
  if(path === store.state.currentFullPath) return;
  // set store currentFullPath to path
  store.state.currentFullPath = path;
  // call api
  store.state.libraryLoader = true;
  await store.actions.getStorage();
  store.state.libraryLoader = false;
};
</script>

<template>
  <ul class="breadcrumbs__list flex list-none justify-center">
    <li
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.fullPath"
      @click="navigateToFolder(breadcrumb.fullPath)"
      class="text-xs font-serif font-bold cursor-pointer hover:underline underline-offset-2"
    >
      /{{ breadcrumb.name }}
    </li>
  </ul>
</template>

<style  scoped>
</style>