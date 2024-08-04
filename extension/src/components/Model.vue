<script setup lang="ts">
import DnD from "./DnD.vue";

defineProps<{ hasError: boolean }>();
const model = defineModel<{ file: File; url: string } | null>();
const emit = defineEmits(["change"]);

function handleChange(data: { files: FileList }) {
  const file = data.files[0];

  if (!file.type.includes("image")) return;

  model.value && URL.revokeObjectURL(model.value?.url);

  model.value = {
    file,
    url: URL.createObjectURL(file),
  };

  emit("change");
}
</script>

<template>
  <section>
    <h2 class="mb-2 text-2xl font-black">Your model photo 👤</h2>
    <DnD
      accept="image/*"
      class="w-full h-64 p-4 border-2 rounded-lg text-neutral-600 flex flex-col justify-center items-center gap-2"
      :class="
        hasError
          ? 'bg-red-100 border-red-300'
          : 'bg-neutral-100 border-neutral-200'
      "
      :classes="{ dragging: 'border-dashed !border-blue-400' }"
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
        <img
          class="max-h-full min-h-0 rounded-lg object-cover"
          alt="Model image"
          :src="model?.url"
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
