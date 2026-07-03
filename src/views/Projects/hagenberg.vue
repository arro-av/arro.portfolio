<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
import Image from "../../components/Image.vue";
</script>

<template>
  <div class="project hagenbergProject">
    <Back />

    <section class="projectOverview">
      <Overview
        title="Sideprojects Hagenberg"
        text="Archive containing a whole bunch of sideprojects I did during uni. These were developed for different classses and are mostly not related to each other. Ranging from tools to games, designs and experiments."
        imagePath="/card_thumbails/Hagenberg.jpg"
      />
    </section>

    <section id="PrintPortfolio" class="hagenbergEntry projectDetails">
      <Collapsible title="Print Portfolio — 1. SEMESTER" :is-visible="false">
        <p>
          A collection of my first semester work. This was developed for the
          <span class="highlight">"2D Design"</span> class. It also includes
          some work I did in my freetime during the semester.
        </p>
        <p>
          <span class="highlight">The Portfolio: </span>
          <a
            target="_blank"
            href="https://drive.google.com/file/d/18GAOEvxXWaD3Pvr4apUIzXjAwTwsZfBV/view?usp=drive_link"
            >Print Portfolio - Robert Ardeleanu</a
          >
        </p>
      </Collapsible>
    </section>

    <section id="DinoRunner" class="hagenbergEntry projectDetails">
      <Collapsible title="LOTTIE DINO RUNNER — 2. SEMESTER" :is-visible="false">
        <p>
          This was developed for the
          <span class="highlight">"Applied Motion Graphics"</span> class. Lottie
          based SVG animation was the core concept discussed. Thus Lottie was
          used as the visual foundation for this project.
        </p>
        <Image src="/project_images/d_dinorunner.png" alt="DinoRunner" />
        <p>
          <span class="highlight">The Game: </span>
          <a target="_blank" href="https://lottie-dino-runner.netlify.app/"
            >Lottie - Dino Runner</a
          >
        </p>
      </Collapsible>
    </section>

    <section class="hagenbergEntry projectDetails">
      <Collapsible
        title="BUTTNUGGET PROTOTYPE — 2. SEMESTER"
        :is-visible="false"
      >
        <p>
          This Unity game prototype was developed for the
          <span class="highlight">"Gameproduction"</span> class. First Playable
          Prototype will be launched on itch.io → soon.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/qCA9wGw1p1U?si=BvMlO3V2L41PADkp"
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
        <p>
          Find <span class="highlight">Devlogs </span>
          <a target="_blank" href="https://hub.hagenberg.games/s/buttnugget"
            >HERE</a
          >
          !
        </p>
      </Collapsible>
    </section>

    <section id="ExamSimulator" class="hagenbergEntry projectDetails">
      <Collapsible title="EXAM SIMULATOR — 2. SEMESTER" :is-visible="false">
        <h4>Overview</h4>
        <p>
          A simple exam simulation tool I built for my own studies. It uses a
          collection of questions and answers stored in a predefined format to
          generate randomized practice exams. The questions are created from my
          study material using an LLM.
        </p>

        <h4>Features</h4>
        <p>
          Complete randomized exam simulations with automatic grading upon
          completion. The complete exam results can also be exported as a PDF
          for documentation or later reference.
        </p>

        <h4>Tech</h4>
        <p>
          Built with Vue.js as a Static Site. Localstorage is is used to store
          user data and exam results. The questions are generated using a custom
          LLM prompt and stored in a JSON format.
        </p>

        <p>
          <span class="highlight">The Tool: </span>
          <a target="_blank" href="https://mtd-exam-simulation.netlify.app/"
            >MTD - Exam Simulator</a
          >
        </p>
      </Collapsible>
    </section>
  </div>
</template>

<style scoped>
.hashNav,
.hagenbergEntry {
  width: 82%;
  max-width: 840px;
  margin-inline: auto;
}

.hashNav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  margin-bottom: 36px;
}

.hashNav a {
  padding: 8px 12px;
  border: 1px solid var(--text-color);
  color: var(--text-color);
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.72;
}

.hashNav a:hover {
  background: var(--text-color);
  color: var(--background-color);
  opacity: 1;
}

.hagenbergEntry {
  scroll-margin-top: 32px;
  margin-bottom: 72px;
}

.entryHeader {
  margin-bottom: 20px;
}

.entryHeader p {
  margin: 0 0 6px;
  color: var(--text-color);
  font-family: "Space Mono", monospace;
  opacity: 0.62;
}

.entryHeader h3 {
  margin: 0;
  color: var(--text-color);
  font-size: clamp(2.25rem, 8vw, 5rem);
  line-height: 0.9;
}

.gameFrameWrapper {
  width: 100%;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--text-color), transparent 72%);
  border-radius: 8px;
  background: #0e1721;
}

.gameFrameWrapper .gameFrame {
  display: block;
  width: 100%;
  max-width: 100%;
  height: clamp(420px, 58vw, 620px);
  aspect-ratio: auto;
  border: 0;
}

.gameHint {
  margin-top: 14px;
}

.flotte-lotte-tool {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.toolHeader {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
}

.toolHeader p,
.helperText {
  margin: 0;
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.6;
  text-align: right;
}

.dropzone {
  position: relative;
  min-height: 132px;
  border: 1px dashed color-mix(in srgb, var(--text-color), transparent 45%);
  border-radius: 6px;
  background: color-mix(in srgb, var(--text-color), transparent 96%);
  color: var(--text-color);
  display: grid;
  place-items: center;
  overflow: hidden;
  transition:
    border-color 0.16s ease,
    transform 0.16s ease,
    background-color 0.16s ease;
}

.dropzone.is-dragover {
  border-color: var(--text-color);
  background: color-mix(in srgb, var(--text-color), transparent 92%);
  transform: translateY(-2px);
}

.dropzone span {
  opacity: 0.7;
}

.dropzone strong {
  opacity: 1;
}

.fileInput {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.previewGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.previewPanel {
  min-height: 360px;
  border: 1px solid color-mix(in srgb, var(--text-color), transparent 72%);
  border-radius: 6px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  background:
    linear-gradient(45deg, rgba(127, 127, 127, 0.08) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(127, 127, 127, 0.08) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(127, 127, 127, 0.08) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(127, 127, 127, 0.08) 75%),
    var(--background-color);
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0;
  background-size: 20px 20px;
}

.previewHead {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid
    color-mix(in srgb, var(--text-color), transparent 72%);
  background: var(--background-color);
  color: var(--text-color);
  font-weight: 700;
}

.previewHead span:last-child {
  font-weight: 500;
  opacity: 0.6;
}

.stageShell {
  min-height: 300px;
  display: grid;
  place-items: center;
  padding: 22px;
}

.stage {
  width: min(100%, 500px);
  aspect-ratio: 1 / 1;
}

.stage :deep(*) {
  transition: none !important;
}

.stage :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.downloadButton {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 6px;
  background: var(--text-color);
  color: var(--background-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-decoration: none;
}

.downloadButton.disabled {
  pointer-events: none;
  opacity: 0.35;
}

@media (max-width: 760px) {
  .hashNav,
  .hagenbergEntry {
    width: 90%;
  }

  .toolHeader,
  .actions {
    align-items: start;
    flex-direction: column;
  }

  .toolHeader p,
  .helperText {
    text-align: left;
  }

  .previewGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .gameFrameWrapper .gameFrame {
    height: 430px;
  }
}
</style>
