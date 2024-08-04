<script setup lang="ts">
import { ref } from "vue";
import confetti from "canvas-confetti";
import Model from "./components/Model.vue";
import Garnet from "./components/Garnet.vue";
import ResultPlaceholder from "./components/ResultPlaceholder.vue";
import ResultSlider from "./components/ResultSlider.vue";
import { idmvton } from "./libs/gradio/idm-vton";

const model = ref<{ file: File; url: string } | null>(null);
const garnet = ref<{ file: File; url: string } | null>(null);
const isPredicting = ref(false);
const result = ref<string | null>(null);

async function handleSubmit() {
  if (!model.value) return;
  if (!garnet.value) return;
  if (isPredicting.value) return;

  isPredicting.value = true;

  await idmvton
    .predict({
      model: model.value.file,
      garment: garnet.value.file,
    })
    .then((res) => {
      const [data, error] = res;

      if (error) {
        throw new Error(
          "\n" +
            error.errors.map((e, idx) => `${idx + 1}. ${e.message}`).join("\n")
        );
      }

      result.value = data[0].url;

      confetti({
        particleCount: 100,
      });
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      isPredicting.value = false;
    });
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <Model v-model="model" />
    <Garnet v-model="garnet" />
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
    <ResultSlider v-else-if="result" :model="model!" :result="result" />
  </form>
</template>
