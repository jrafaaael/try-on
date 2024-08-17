<script setup lang="ts">
import Loading from "./Loading.vue";
</script>

<template>
  <div
    class="w-full aspect-square bg-neutral-100 border-2 border-neutral-200 text-neutral-600 text-lg rounded-lg flex flex-col justify-center items-center gap-2 cursor-progress"
  >
    <span class="w-4 aspect-square">
      <Loading />
    </span>
    <span>We're generating your outfit 🔥!</span>
  </div>
</template>
