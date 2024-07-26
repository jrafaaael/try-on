<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  model: File,
});
const url = ref<string>();

onMounted(() => {
  url.value = URL.createObjectURL(props.model);
});
</script>

<template>
  <img alt="Model image" :src="url" />
</template>
