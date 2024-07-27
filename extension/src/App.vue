<script setup lang="ts">
import { ref } from "vue";
import Model from "./components/Model.vue";
import Garnet from "./components/Garnet.vue";
import { idmvton } from "./libs/gradio/idm-vton";

const model = ref<File | null>(null);
const garnet = ref<File | null>(null);

async function handleSubmit() {
  if (!model.value) return;
  if (!garnet.value) return;

  const result = await idmvton.predict({
    model: model.value,
    garment: garnet.value,
  });

  console.log(result);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Model v-model="model" @change="(data) => (model = data.file)" />
    <Garnet v-model="garnet" @change="(data) => (garnet = data.file)" />
    <button
      class="w-full mt-6 p-3 rounded-lg text-lg text-purple-50"
      :class="[
        model && garnet ? 'bg-purple-600' : 'bg-purple-400 cursor-not-allowed',
      ]"
    >
      Try on ✨!
    </button>
  </form>
</template>
