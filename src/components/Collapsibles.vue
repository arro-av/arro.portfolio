<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const isVisible = ref(props.isVisible);
</script>

<template>
  <div class="collapsibleWrapper">
    <div class="collapspreview" @click="isVisible = !isVisible">
      <h4>{{ title }}</h4>
      <button
        type="button"
        class="collapseToggle"
        :class="{ open: isVisible }"
        :aria-expanded="isVisible"
        aria-label="Toggle collapse section"
        @click.stop="isVisible = !isVisible"
      >
        <span class="collapseLine horizontal"></span>
        <span class="collapseLine vertical"></span>
      </button>
    </div>
    <transition name="ease-in">
      <div v-if="isVisible" class="collapsibleContent">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.ease-in-enter-active,
.ease-in-leave-active {
  transition: opacity 0.2s ease-in;
  overflow: hidden;
}

.ease-in-enter-from,
.ease-in-leave-to {
  opacity: 0;
  max-height: fit-content;
}
</style>
