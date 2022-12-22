<script setup>
import { ref, computed, inject, onMounted } from "vue";

const store = inject("store");
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
// local variables
const folderName = ref("");

// Methods
const addFolder = async () => {
  // call addFolder action from store
  await store.actions.addFolder(folderName.value);
  // set addFolderProcess to false
  emit("update:modelValue", false);
  folderName.value = '';
};
</script>

<template>
  <!-- make little form with one text input and submit button -->
  <!-- when user click on submit button -->
  <!-- call addFolder method from store -->
  <!-- and pass to it the value of input -->
  <!-- and the currentFullPath from store -->
  <!-- and then set addFolderProcess to false -->
  <!-- and then call getStorage method from store -->
  <!-- and pass to it the currentFullPath from store -->
  <form v-if="props.modelValue"  class="rotate-y w-10/12 m-auto">
    <div class="flex items-center border-b border-teal-500 py-2">
      <input
      v-model="folderName"
        class="
          appearance-none
            bg-page-special
          border-none
          w-full
          text-[#2c3e50]
          mr-3
          py-1
          px-2
          leading-tight
          focus:outline-none
        "
        type="text"
        placeholder="Folder name"
        aria-label="Full name"
      />
      <button
      @click="addFolder"
        class="
          flex-shrink-0
          text-[#fff]
            bg-[#C2400D]
        hover:bg-[#9A3412]  
        border-[#C2400D]
        border-2
          text-sm
          text-white
          py-1
          px-4
          rounded
        "
        type="button"
      >
        Add
      </button>
      <button
      @click="emit('update:modelValue', false)"
        class="
          flex-shrink-0
          text-sm
          py-1
          px-2
          rounded
          text-[#C2400D]
        "
        type="button"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
</style>