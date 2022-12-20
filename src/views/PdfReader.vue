<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';

const store = inject("store");

// computed
const pdfUrl = computed(() => store.state.pdfUrl);

// Before Route Leave
onBeforeRouteLeave((to, from, next) => {
  bookHelper.navigateAnimation();
  next();
});

</script>

<template>
  <!-- create iFrame when user can read pdf file on page -->
  <iframe
    :src="pdfUrl + '#toolbar=0'"
    class="h-full rotate-y rounded-l-xl" 
    width="110%"
  ></iframe>
</template>

<style lang="scss" scoped>
</style>