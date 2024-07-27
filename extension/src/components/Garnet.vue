<script setup lang="ts">
import DnD from "./DnD.vue";

const garnet = defineModel<{ file: File; url: string } | null>();
const emit = defineEmits(["change"]);

function handleChange(data: { files: FileList }) {
  const file = data.files[0];

  if (!file.type.includes("image")) return;

  garnet.value && URL.revokeObjectURL(garnet.value?.url);

  garnet.value = {
    file: file,
    url: URL.createObjectURL(file),
  };
}
</script>

<template>
  <section>
    <h2 class="mb-2 text-2xl font-black">Cloth image 👚</h2>
    <DnD
      accept="image/*"
      class="w-full h-64 p-4 bg-neutral-100 border-2 border-neutral-200 text-neutral-600 rounded-lg flex flex-col justify-center items-center gap-2"
      :classes="{ dragging: 'border-dashed !border-blue-400' }"
      @change="handleChange"
    >
      <template v-if="garnet === null">
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
          alt="Garnet image"
          :src="garnet?.url"
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
