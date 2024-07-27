<script setup lang="ts">
import { effect, ref } from "vue";

const props = defineProps({
  model: File,
});
const url = ref<string>();

effect(() => {
  url.value = URL.createObjectURL(props.model);
});
</script>

<template>
  <img alt="Model image" :src="url" />
</template>
