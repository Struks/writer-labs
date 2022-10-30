
<script setup>
import { ref, computed, inject } from 'vue';
import { onBeforeRouteLeave } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';
// store
const store = inject('store');

// Variables
// const firstName = ref('Edvin');
// const lastName = ref('Strujic');
// const userName = ref('Strux');
// const email = ref('strux1@outlook.com');

// Computed
const currentUser = computed(() => store.state.currentUser);

// Methods
function signup() {
    console.log('signup');
}

// Before Route Leave
onBeforeRouteLeave((to, from, next) => {    
    bookHelper.navigateAnimation();
    next();
});

</script>

<template>
    <!-- writer's library -->
    <h1 v-if="currentUser" class="rotate-y text-4xl uppercase font-bold text-center">{{currentUser.userName}}'s library</h1>
    <div class="foler">
        
    </div>
</template>

<style lang="scss" scoped>

</style>