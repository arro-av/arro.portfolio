<script setup>
const props = defineProps({
  title: String,
  text: String,
  imagePath: String,
});
</script>

<template>
  <div class="projectHeaderImage" :style="{ backgroundImage: 'url(' + imagePath + ')' }"></div>
  <div class="textProjectContent">
    <h2>{{ title }}</h2>
    <p>
      {{ text }}
    </p>
  </div>
</template>