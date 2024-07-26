<script setup lang="ts">
import DnD from "./DnD.vue";

const emit = defineEmits(["change"]);
</script>

<template>
  <section class="mb-6">
    <h2 class="mb-2 text-2xl font-black">Your model photo 👤</h2>
    <DnD
      class="w-full aspect-[3/2] bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg flex justify-center items-center"
      @change="(data) => $emit('change', data)"
    >
      <span>Drag and drop or</span>&nbsp;
      <span class="text-blue-600 underline">choose file</span>
    </DnD>
  </section>
</template>
