<script setup lang="ts">
import { ref } from "vue";
import Model from "./components/Model.vue";
import { idmvton } from "./libs/gradio/idm-vton";

const model = ref<File | null>(null);

async function handleClick() {
  if (!model.value) return;

  const garment = await (
    await fetch(
      "https://yisol-idm-vton.hf.space/file=/tmp/gradio/82d64c45d16c789e83b8a8efb328185aa3d2ef29/09164_00.jpg"
    )
  ).blob();

  const result = await idmvton.predict({
    model: model.value,
    garment,
  });

  console.log(result);
}
</script>

<template>
  <Model @change="(data) => (model = data.files[0])" />
  <button
    class="w-full p-3 bg-purple-600 rounded-lg text-lg text-purple-50"
    @click="handleClick"
  >
    Try on ✨!
  </button>
</template>
