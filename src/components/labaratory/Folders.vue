<script setup>
import { onMounted, inject, computed } from 'vue';

const store = inject('store');

// computed
const getFolders = computed(() => store.state.folders);

onMounted(async () => {
    console.log('mounted folders');
    await store.actions.getFolders(store.state.currentUser.uid);

});
</script>


<template>
    <div class="folder-grid">

    </div>
</template>


<style lang="scss" scoped>

</style>