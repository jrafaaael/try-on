<script setup lang="ts">
import { ref } from "vue";
import Model from "./components/Model.vue";
import Garnet from "./components/Garnet.vue";
import ResultPlaceholder from "./components/ResultPlaceholder.vue";
import { idmvton } from "./libs/gradio/idm-vton";

const model = ref<File | null>(null);
const garnet = ref<File | null>(null);
const isPredicting = ref(false);

async function handleSubmit() {
  if (!model.value) return;
  if (!garnet.value) return;
  if (isPredicting.value) return;

  isPredicting.value = true;

  const data = await idmvton.predict({
    model: model.value,
    garment: garnet.value,
  });

  isPredicting.value = false;

  console.log(data);
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <Model v-model="model" @change="(data) => (model = data.file)" />
    <Garnet v-model="garnet" @change="(data) => (garnet = data.file)" />
    <button
      class="w-full p-3 rounded-lg text-lg text-purple-50"
      :class="[
        model && garnet && !isPredicting
          ? 'bg-purple-600'
          : 'bg-purple-400 cursor-not-allowed',
      ]"
    >
      Try on ✨!
    </button>
    <ResultPlaceholder v-if="isPredicting" />
  </form>
</template>
