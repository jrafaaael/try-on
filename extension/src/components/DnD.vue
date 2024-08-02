<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  accept: string;
  classes?: { default?: string; dragging?: string };
}>();
const inputRef = ref<HTMLInputElement>();
const isDragging = ref(false);
const emit = defineEmits(["change"]);

function handleUpload(e: Event) {
  const el = e.target as HTMLInputElement;
  const files = el.files;

  if (!files || files.length <= 0) return;

  emit("change", { files });
}

function handleDrop(e: DragEvent) {
  const dt = e.dataTransfer;
  const files = dt?.files;

  isDragging.value = false;

  if (!files || files.length <= 0) return;

  emit("change", { files });
}
</script>

<template>
  <input
    type="file"
    name="model"
    id="model"
    class="sr-only"
    ref="inputRef"
    :accept="$props.accept"
    @change="handleUpload"
  />
  <button
    class="dropzone"
    :class="[
      $attrs.class ?? $props.classes?.default,
      isDragging ? $props.classes?.dragging : '',
    ]"
    @click="() => inputRef && inputRef.click()"
    @drag.prevent.stop=""
    @dragstart.prevent.stop=""
    @dragend.prevent.stop=""
    @dragenter.prevent.stop="isDragging = true"
    @dragover.prevent.stop=""
    @dragleave.prevent.stop="isDragging = false"
    @drop.prevent.stop="handleDrop"
  >
    <slot></slot>
  </button>
</template>

<style>
.dropzone * {
  pointer-events: none;
}
</style>
