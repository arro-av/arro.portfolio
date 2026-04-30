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
        title="808club.at"
        text="As part of the 808club team, I created the club's website to post upcoming events and other relevant information. The website is built using Wordpress and Elementor, allowing for easy updates and management."
        imagePath="/card_thumbails/www.808club.at.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="TECH">
        <p>
          → Wordpress <br />
          → Elementor 
        </p>
      </Collapsible>

      <Collapsible title="RESOURCES">
        <p>
          <a href="https://808club.at" target="_blank" rel="noopener noreferrer"
            >→ Website 808Club</a
          >
          <br />
          <a
            href="https://www.instagram.com/808club_linz/"
            target="_blank"
            rel="noopener noreferrer"
            >→ Instagram @808club_linz</a
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
