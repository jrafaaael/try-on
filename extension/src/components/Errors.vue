<script setup lang="ts">
import Warning from "./icons/Warning.vue";
import TurnDownRight from "./icons/TurnDownRight.vue";

defineProps<{ errors: { message: string }[] }>();
</script>

<template>
  <div class="border-2 border-red-300 rounded-lg overflow-hidden">
    <header
      class="p-3 bg-red-100 border-b-2 border-red-300 text-red-700 flex items-center gap-1"
    >
      <span class="size-5 inline-block">
        <Warning />
      </span>
      <h4>
        {{ $props.errors.length }}
        {{ $props.errors.length > 1 ? "errors" : "error" }} have ocurred
      </h4>
    </header>
    <ul class="p-3">
      <li
        v-for="error in $props.errors"
        class="text-red-600 flex items-center gap-1"
      >
        <span class="inline-block size-5">
          <TurnDownRight />
        </span>
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>
