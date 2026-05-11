<script setup>
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
</script>

<template>
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="Coding Sound"
        text="When i discovered SonicPi, I was amazed by the idea of creating music through code. It opened up a whole new world of possibilities for me, and I started experimenting with it right away. I love this piece of software eversince."
        imagePath="/card_thumbails/Coding_Techno.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="MIDI LIVE SESSION" :is-visible="true">
        <iframe
          width="810"
          height="460"
          src="https://www.youtube.com/embed/s2NJrpKzkfQ?si=d48rpA60YI1kL5PM"
          title="YouTube video player"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          width="810"
          height="460"
          src="https://www.youtube.com/embed/s2NJrpKzkfQ?si=d48rpA60YI1kL5PM"
          title="YouTube video player"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Collapsible>

      <Collapsible title="CODING TECHNO">
        <iframe
          width="810"
          height="460"
          src="https://www.youtube.com/embed/s22yDfzhWoU?si=COQA_DoxZE3mcwwd"
          title="YouTube video player"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
            web-share;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </Collapsible>

      <Collapsible title="RESOURCES">
        <p>
          <a
            target="_blank"
            href="https://github.com/arro-av/archive.sonicpipatches"
            >→ Archive of SonicPi Patches</a
          >
          <br />
          <a
            target="_blank"
            href="https://github.com/arro-av/sonicpi_livejam_boilerplate/blob/main/live_jam_boilerplate.rb"
            >→ Ruby-File | Live Jam Boilerplate</a
          >
          <br />
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=s2NJrpKzkfQ&list=PLFLuAZh6tS3LepaSGIK9-x468r-3yD4MP"
            >→ YouTube Playlist | MIDI Sessions</a
          >
          <br />
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=s22yDfzhWoU&list=PLFLuAZh6tS3IfAgWplNl72bJkq3jWkxeA"
            >→ Playlist | Coding Techno</a
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
