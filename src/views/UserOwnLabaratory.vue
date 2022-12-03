
<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';
// toasted
import { useToast } from "vue-toastification";
// components imports
import VerifyAccountView from '../components/labaratory/VerifyAccountView.vue';
import NotVerifyAccountView from '../components/labaratory/NotVerifyAccountView.vue';

const toast = useToast();
const router = useRouter();
const store = inject('store');


// mounted
onMounted(() => {
    if(!userVerified.value) {
        toast.warning('Please verify your email address');
    }
});

// Computed
const currentUser = computed(() => store.state.currentUser);
const userVerified = computed(() => store.state.userVerified);

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
    <VerifyAccountView v-if="userVerified && currentUser" :user="currentUser" />

    <!-- if user account has not verified -->   
    <NotVerifyAccountView v-if="!userVerified" />
    
    <div class="writer-footer">
        <div @click="signOut" class="rotate-y text-sm opacity-80 cursor-pointer max-w-max mr-auto hover:opacity-100 hover:font-bold">Sign Out --></div>
    </div>

</template>

<style lang="scss" scoped>

</style>