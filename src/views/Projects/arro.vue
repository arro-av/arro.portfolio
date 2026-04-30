<script setup>
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
import Image from "../../components/Image.vue";
</script>

<template>
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="arro Portfolio"
        text="This portfolio website, which allows me to share my personal and university related projects, as well as my growth as a creative technologist. It’s a constant work in progress, and I’ll continue to expand it along the way."
        imagePath="/card_thumbails/Portfolio.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="TECH">
        <p>
          → HTML / SCSS / Javascript <br />
          → Vue.js 3 <br />
          → THREE.js <br />
          → Vite <br />
          → Netlify <br />
          → Figma 
        </p>
      </Collapsible>
      <Collapsible title="FEATURES">
        <p>
          → Project Filter <br />
          → Light & Dark Mode <br />
          → Collapsibles <br />
          → NJAN Easter Egg <br />
          → THREE interactive Hero <br />
          → Responsive Design
        </p>
      </Collapsible>
      <Collapsible title="RESOURCES">
        <p>
          <a
            target="_blank"
            href="https://github.com/arro-av/arro.portfolio"
            >→ Codebase on GitHub</a
          >
        </p>
      </Collapsible>
    </section>
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
