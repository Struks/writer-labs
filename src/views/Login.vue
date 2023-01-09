<script setup>
import { reactive, toRef, inject } from "vue";
import { onBeforeRouteLeave } from "vue-router";
// modules
import { bookHelper } from "../helpers/bookHelper";
// vuelidation
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

// inject
const store = inject('store');

// Variables
const loginForm = reactive({
  email: "",
  password: "",
});

// Vue validation
const rules = {
  email: {
    email,
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
};
const vv = useVuelidate(rules, {
  email: toRef(loginForm, "email"),
  password: toRef(loginForm, "password"),
});


// Methods
const login = async  () => {
  try {
    // check validation
    vv.value.$touch();
    if (vv.value.$invalid) {
      return;
    }
    // login action
    await store.actions.signIn(loginForm);
  } catch(err) {
    console.log(err);
  }
};

// Before Route Leave 
onBeforeRouteLeave((to, from, next) => {
  bookHelper.navigateAnimation();
  next();
});
</script>


<template>
  <!-- login form -->
  <h1 class="rotate-y text-4xl uppercase font-bold text-center text-default">Sign In</h1>
  <form @submit.prevent="login" class="rotate-y">
    <div class="mb-6">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-default"
        >Email address</label
      >
      <input
        v-model="vv.email.$model"
        type="text"
        id="email"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          text-default
        "
        placeholder="john.doe@company.com"
        :class="{ 'border-2 border-[#ff0000]': vv.email.$error }"
      />
      <template v-if="vv.email.$dirty">
        <div v-for="error of vv.email.$errors" :key="error.$message">
          <div :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.email.$dirty }">
            {{ error.$message }}
          </div>
        </div>
      </template>
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-default"
        >Password</label
      >
      <input
        v-model="vv.password.$model"
        type="password"
        id="password"
        class="
          bg-gray-50
          border border-gray-300
          text-gray-900 text-sm
          rounded-lg
          focus:ring-blue-500 focus:border-blue-500
          block
          w-full
          p-2.5
          text-default
        "
        placeholder="•••••••••"
        :class="{ 'border-2 border-[#ff0000]': vv.password.$error }"
      />
      <div class="flex justify-between">
        <template v-if="vv.password.$dirty">
          <div v-for="error of vv.password.$errors" :key="error.$message">
            <div
              :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.password.$dirty }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
        <div
          class="
            max-w-max
            cursor-pointer
            block
            ml-auto
          "
        >
        <router-link class="text-sm text-gray-300 opacity-80 hover:underline hover:opacity-100 text-default" to="/reset-password">Forgot?</router-link>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="
        text-[#fff]
        bg-[#C2400D]
        hover:bg-[#9A3412]
        focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        w-full
        px-5
        py-2.5
        text-center
      "
      :class="{
        'cursor-not-allowed opacity-50 disabled:bg-[#C2400D]': vv.$error,
      }"
      :disabled="vv.$error"
    >
      Submit
    </button>
  </form>
  <div class="rotate-y text-sm opacity-100 text-center text-default">
    Not yet have own laboratory?
    <router-link to="/signup" class="text-sm opacity-100 underline font-bold"
      >Create one now!</router-link
    >
  </div>
</template>


<style scoped>
</style>