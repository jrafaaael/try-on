<script setup lang="ts">
import "two-up-element";

defineProps<{
  model: { file: File; url: string };
  result: string;
}>();
</script>

<template>
  <two-up
    class="slider w-full aspect-square border-2 border-neutral-200 rounded-lg overflow-hidden"
  >
    <img slot="first" :src="$props.model.url" />
    <img slot="second" :src="$props.result" />
  </two-up>
</template>

<style>
.slider {
  --track-color: white;
  --thumb-color: white;
  --thumb-background: transparent;
  --thumb-size: 40px;
  --bar-size: 2px;
  --bar-touch-size: 30px;
}

.slider > div {
  @apply opacity-40 transition-opacity duration-75;
}

.slider:hover > div {
  @apply opacity-100;
}

.slider div::before {
  box-shadow: none;
}

.slider div div {
  @apply h-auto aspect-square p-0 border-[2px] border-white justify-center items-center shadow-none;
}

.slider svg {
  @apply w-5 aspect-square !flex-[none];
}
</style>
