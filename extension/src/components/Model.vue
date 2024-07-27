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
      accept="image/*"
      class="w-full h-64 p-4 bg-neutral-100 border-2 border-neutral-200 text-neutral-600 rounded-lg flex flex-col justify-center items-center gap-2"
      :classes="{ dragging: 'border-2 border-dashed border-blue-400' }"
      @change="handleChange"
    >
      <template v-if="model === null">
        <p>
          <span>Drag and drop or</span>&nbsp;<span
            class="text-blue-600 underline"
            >choose file</span
          >
        </p>
      </template>
      <template v-else>
        <PreviewImage
          class="max-h-full min-h-0 rounded-lg object-cover"
          :model="model"
        />
        <p>
          <span>Drag and drop or</span>&nbsp;<span
            class="text-blue-600 underline"
            >choose</span
          >&nbsp;<span>a new image</span>
        </p>
      </template>
    </DnD>
  </section>
</template>
