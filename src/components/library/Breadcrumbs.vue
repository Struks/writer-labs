

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
  // if any element is empty remove it
  removeEmptyElements(path);
  // create breadcrumbs array
  const breadcrumbs = [];
  // Create fullPath variable to store full path of each breadcrumb element 
  // and push it to breadcrumbs array as object with name and fullPath properties
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
const navigateToFolder = async (fullPath) => {
  // only call api if path is not the same as currentFullPath
  if(fullPath === store.state.currentFullPath) return;
  // set store currentFullPath to path
  store.state.currentFullPath = fullPath;
  // call api
  store.state.libraryLoader = true;
  await store.actions.getStorage();
  store.state.libraryLoader = false;
};
// change first breadcrumb to user name
const changeFirstBreadCrumb = (name) => {
  // if name is not user uid return name
  const user = store.state.currentUser;
  let result = name;
  // if name is user uid return user name
  if (user) {
    const userUid = user.uid;
    const userName = user.userName;
    result = name.replace(userUid, userName);
  }

  return result;
};
// remove empty elements from array
const removeEmptyElements = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === "") {
      array.splice(i, 1);
    }
  }
};

</script>

<template>
  <ul class="breadcrumbs__list flex list-none justify-center">
    <li
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.fullPath"
      @click="navigateToFolder(breadcrumb.fullPath)"
      class="text-xs font-serif font-bold cursor-pointer hover:underline underline-offset-2 text-default"
    >
      /{{ changeFirstBreadCrumb(breadcrumb.name) }}
    </li>
  </ul>
</template>

<style  scoped>
</style>