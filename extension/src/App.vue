<script setup lang="ts">
import { ref } from "vue";
import confetti from "canvas-confetti";
import Model from "./components/Model.vue";
import Garment from "./components/Garment.vue";
import ResultPlaceholder from "./components/ResultPlaceholder.vue";
import ResultSlider from "./components/ResultSlider.vue";
import Errors from "./components/Errors.vue";
import { ValidateError, idmvton } from "./libs/gradio/idm-vton";
import { convertImageToJPEG } from "./utils/convert-image-to-jpeg";

const model = ref<{ file: File; url: string } | null>(null);
const garment = ref<{ file: File; url: string } | null>(null);
const isPredicting = ref(false);
const validationError = ref<ValidateError[]>([]);
const result = ref<string | null>(null);

async function handleSubmit() {
  if (!model.value) return;
  if (!garment.value) return;
  if (isPredicting.value) return;
  if (validationError.value.length > 0) return;

  isPredicting.value = true;
  validationError.value = [];

  const modelDotJPEG = await convertImageToJPEG({
    input: model.value.url,
    filename: model.value.file.name,
    quality: 0.5,
  });
  const garmentDotJPEG = await convertImageToJPEG({
    input: garment.value.url,
    filename: garment.value.file.name,
    quality: 0.5,
  });

  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  await idmvton
    .predict({
      model: modelDotJPEG,
      garment: garmentDotJPEG,
    })
    .then((res) => {
      const [data, error] = res;

      if (error) {
        validationError.value = error;

        throw new Error(
          "\n" + error.map((e, idx) => `${idx + 1}. ${e.message}`).join("\n")
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
  <form class="mb-6 flex flex-col gap-6" @submit.prevent="handleSubmit">
    <Model
      v-model="model"
      :has-error="
        validationError?.some((error) => error.code === 'INVALID_MODEL') ??
        false
      "
      @change="
        () => {
          validationError =
            validationError?.filter(
              (error) => error.code !== 'INVALID_MODEL'
            ) ?? null;
          result = null;
        }
      "
    />
    <Garment
      v-model="garment"
      :has-error="
        validationError?.some((error) => error.code === 'INVALID_GARMENT') ??
        false
      "
      @change="
        () => {
          validationError =
            validationError?.filter(
              (error) => error.code !== 'INVALID_GARMENT'
            ) ?? null;
        }
      "
    />
    <button
      class="w-full p-3 rounded-lg text-lg text-purple-50"
      :class="[
        model && garment && !isPredicting && validationError.length <= 0
          ? 'bg-purple-600'
          : 'bg-purple-400 cursor-not-allowed',
      ]"
    >
      Try on ✨!
    </button>
  </form>
  <ResultPlaceholder v-if="isPredicting" />
  <ResultSlider v-else-if="result" :model="model!" :result="result" />
  <Errors v-else-if="validationError.length > 0" :errors="validationError" />
</template>
