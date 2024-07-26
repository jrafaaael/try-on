<script setup lang="ts">
import { idmvton } from "./libs/gradio/idm-vton";

async function handleClick() {
  const model = await (
    await fetch(
      "https://yisol-idm-vton.hf.space/file=/tmp/gradio/96741724e32388a6ef1ec541f0d3ae37ccac11f8/00034_00.jpg"
    )
  ).blob();
  const garment = await (
    await fetch(
      "https://yisol-idm-vton.hf.space/file=/tmp/gradio/82d64c45d16c789e83b8a8efb328185aa3d2ef29/09164_00.jpg"
    )
  ).blob();

  const result = await idmvton.predict({
    model,
    garment,
  });

  console.log(result);
}
</script>

<template>
  <button
    class="w-full p-3 bg-purple-600 rounded-lg text-lg text-purple-50"
    @click="handleClick"
  >
    Try on ✨!
  </button>
</template>
