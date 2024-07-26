<script setup lang="ts">
import DnD from "./DnD.vue";
import PreviewImage from "./PreviewImage.vue";

const model = defineModel<File | null>();
const emit = defineEmits(["change"]);

function handleChange(data) {
  const file = data.files[0];

  if (!file.type.includes("image")) return;

  emit("change", { file });
}
</script>

<template>
  <section class="mb-6">
    <h2 class="mb-2 text-2xl font-black">Your model photo 👤</h2>
    <DnD
      v-if="model === null"
      accept="image/*"
      class="w-full aspect-[3/2] bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg flex justify-center items-center"
      @change="handleChange"
    >
      <span>Drag and drop or</span>&nbsp;
      <span class="text-blue-600 underline">choose file</span>
    </DnD>
    <PreviewImage
      v-else
      class="w-full bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg object"
      :model="model"
    />
  </section>
</template>
