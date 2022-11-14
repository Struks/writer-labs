
<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';
import verification from '../assets/images/verification.png';

const router = useRouter();
// store
const store = inject('store');

// Variables
const userVerified = ref(true);
// const firstName = ref('Edvin');
// const lastName = ref('Strujic');
// const userName = ref('Strux');
// const email = ref('strux1@outlook.com');


// mounted
onMounted(() => {
    // if user is not verified email send him message
    if (currentUser.value && !currentUser.value.emailVerified) {
        userVerified.value = false;
        alert('Please verify your email address');
    }

});

// Computed
const currentUser = computed(() => store.state.currentUser);

// Methods
const signOut = async () => {
    await store.actions.signOut();
    router.push({ name: 'login' });
}

// Before Route Leave
onBeforeRouteLeave((to, from, next) => {
    bookHelper.navigateAnimation();
    next();
});

</script>

<template>
    <!-- writer's library -->

    <!-- if user account verified -->
    <h1 v-if="userVerified && currentUser" class="rotate-y text-4xl uppercase font-bold text-center">{{currentUser.userName}}'s library</h1>
    <div v-if="userVerified" class="writer-folders">
        
    </div>

    <!-- if user account has not verified -->   
    <h1 v-if="!userVerified" class="rotate-y text-2xl uppercase font-bold text-center">Your account has not been verified. Please do it.</h1>
    <div v-if="!userVerified" class="must-verify-icon block w-[200px] h-[163px] m-auto rotate-y">
        <img class="w-full h-full" :src="verification" alt="verification-account">
        
    </div>

    
    <div class="writer-footer">
        <div @click="signOut" class="rotate-y text-sm opacity-80 cursor-pointer max-w-max mr-auto hover:opacity-100 hover:font-bold">Sign Out --></div>
    </div>

</template>

<style lang="scss" scoped>

</style>