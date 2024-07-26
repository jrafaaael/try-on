<script setup lang="ts">
import DnD from "./DnD.vue";
import PreviewImage from "./PreviewImage.vue";

const garnet = defineModel<File | null>();
const emit = defineEmits(["change"]);

function handleChange(data) {
  const file = data.files[0];

  if (!file.type.includes("image")) return;

  emit("change", { file });
}
</script>

<template>
  <section>
    <h2 class="mb-2 text-2xl font-black">Cloth image 👚</h2>
    <DnD
      v-if="garnet === null"
      accept="image/*"
      class="w-full h-64 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg flex justify-center items-center"
      @change="handleChange"
    >
      <span>Drag and drop or</span>&nbsp;
      <span class="text-blue-600 underline">choose file</span>
    </DnD>
    <div
      v-else
      class="w-full h-64 p-4 bg-neutral-100 border border-neutral-200 rounded-lg flex justify-center"
    >
      <PreviewImage class="rounded-lg object-fill" :model="garnet" />
    </div>
  </section>
</template>
