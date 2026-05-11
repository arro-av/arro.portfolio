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
        title="808Spotlight"
        text="I had the opportunity to create the visuals for a concert in the Ars Electronica Deep Space 8K, as part of the 808Spotlight event. I designed and built an interactive visual system that was controlled in real-time using a MIDI controller, allowing me to manipulate procedural visuals during the performance."
        imagePath="/card_thumbails/808_Spotlight.jpg"
      />

      <div class="mainProjectContent"></div>
    </section>

    <section class="projectDetails">
      <Collapsible title="VISUALS OVERVIEW">
        <p>Intro Visual | 808</p>
        <Image src="/project_images/o_events_img5.jpg" alt="Spotlight" />

        <p>Visual | Luzius P</p>
        <Image src="/project_images/o_events_img1.jpg" alt="Spotlight" />

        <p>Visual | Blue</p>
        <Image src="/project_images/o_events_img2.jpg" alt="Spotlight" />
      </Collapsible>

      <Collapsible title="PERFORMANCE SETUP">
        <p>
          Here’s the basic setup – each visual is housed in its own Base
          component. I MIDI-mapped each value, but you can also just use the
          sliders in the 'Constant CHOP'.
          <br />
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1q3PbSq1VdNGDDjJ9tW2eAR2bjTQ2lTS3?usp=sharing"
            >→ TOE File</a
          >
        </p>
        <Image src="/project_images/v_spotlight_img2.jpg" alt="VJ_System" />
      </Collapsible>

      <Collapsible title="RESOURCES">
        <p>
          <a target="_blank" href="https://www.youtube.com/watch?v=R6qUNRbgmk4"
            >→ YouTube Video</a
          >
          <br />
          <a target="_blank" href="https://808club.x-net.dev/808-spotlight/"
            >→ Website Entry</a
          >
          <br />
          <a target="_blank" href="https://www.instagram.com/p/DG5g0ggN2Oq/"
            >→ Promo Reel</a
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
