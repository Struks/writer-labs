<script setup>
import { onMounted, inject, computed } from "vue";
import SvgIcon from "../SvgIcon.vue";

const store = inject("store");

// computed
const getFolders = computed(() => store.state.folders);
const getFiles = computed(() => store.state.files);

onMounted(async () => {
    await store.actions.getStorage(store.state.currentUser.uid);
});
</script>


<template>
    <div class="directory-grid flex gap-2">
        <div v-for="(folder, index) in getFolders" :key="index" class="folder cursor-pointer basis-1/5">
            <svg-icon name="folder" />
            <div class="folder-name font-mono font-semibold leading-5">{{ folder.name }}</div>
        </div>
        <div v-for="(file, index) in getFiles" :key="index" class="folder cursor-pointer basis-1/5">
            <svg-icon name="file" />
            <div class="file-name font-serif">{{ file.name }}</div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>