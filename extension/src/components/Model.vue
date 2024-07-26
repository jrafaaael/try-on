<script setup lang="ts">
import { ref } from "vue";

const inputRef = ref<HTMLInputElement>();
const emit = defineEmits(["change"]);

function handleClick() {
  inputRef.value && inputRef.value.click();
}

function handleUpload(e: Event) {
  const el = e.target as HTMLInputElement;
  const files = el.files;

  if (!files) return;

  emit("change", { files });
}
</script>

<template>
  <section class="mb-6">
    <h2 class="mb-2 text-2xl font-black">Your model photo 👤</h2>
    <input
      type="file"
      name="model"
      id="model"
      accept="image/*"
      class="sr-only"
      ref="inputRef"
      @change="handleUpload"
    />
    <button
      class="w-full aspect-[3/2] bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg flex justify-center items-center"
      @click="handleClick"
    >
      <span>Drag and drop or</span>&nbsp;
      <span class="text-blue-600 underline">choose file</span>
    </button>
  </section>
</template>
