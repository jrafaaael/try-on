<script setup lang="ts">
import { ref } from "vue";

defineProps({ accept: String });
const inputRef = ref<HTMLInputElement>();
const emit = defineEmits(["change"]);

function handleUpload(e: Event) {
  const el = e.target as HTMLInputElement;
  const files = el.files;

  if (!files) return;

  emit("change", { files });
}

function handleDrop(e: Event) {
  const dt = e.dataTransfer;
  const files = dt?.files;

  if (!files) return;

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
    :class="$attrs.class"
    @click="() => inputRef && inputRef.click()"
    @drag.prevent.stop=""
    @dragstart.prevent.stop=""
    @dragend.prevent.stop=""
    @dragenter.prevent.stop=""
    @dragover.prevent.stop=""
    @dragleave.prevent.stop=""
    @drop.prevent.stop="handleDrop"
  >
    <slot></slot>
  </button>
</template>
