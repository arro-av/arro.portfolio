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
        title="Progress v0.5"
        text="Yet another productivity tool, but unlike the usual to-do list, it’s a gamified pomodoro app with quests, skills, analytics and a progression system. Polish yet to come, but the core features are all there. I actually use it on a daily basis!"
        imagePath="/card_thumbails/Progress.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="ABOUT" :is-visible="true">
        <p>
          I love the concept of focused pomodoro sessions, but what i was
          missing with most apps is the dopamine hit and the capability to
          visualize my progress. This is what
          <span style="font-weight: 800">Progress</span> solves.
        </p>
        <Image src="/project_images/progress_img1.png" />

        <p>
          <span style="font-weight: 800">Progress</span> not only allows me to
          manage personal and uni projects in a fun way, but also helps me track
          my skill progressions by seeing them level up. <br />
        </p>
        <Image src="/project_images/progress_img2.png" />

        <p>
          It might not be the most user-friendly project management tool out
          there in the current state, but for me it does the job better than any
          other tool I have tried. It combines all the features i wanted for my
          personal workflow, while keeping everything modular and key elements
          like the pomodoro timer easy to use.
        </p>
        <Image src="/project_images/progress_img3.png" />
      </Collapsible>
      <Collapsible title="TECH">
        <p>
          → HTML / SCSS / Javascript <br />
          → Typescript <br />
          → Vue.js 3 <br />
          → Pinia <br />
          → Electron <br />
          → LowDB <br />
          → Vite <br />
          → Figma
        </p>
      </Collapsible>
      <Collapsible title="FEATURES">
        <h4>Timer</h4>
        <p>
          Flexible project timer (1-240 min) with manual time adjustments and
          Pomodoro-style workflow. Adding time manually also works.
        </p>
        <h4>Projects</h4>
        <p>
          Organize projects into Epics with their tasks and skills assigned.
          Each project has its own completion rewards based on project rank and
          invested time.
        </p>
        <h4>Skills</h4>
        <p>
          Can be general skills, software proficiencies, or hobbies. Level them
          up based on focus time and project completions.
        </p>
        <h4>Rewards</h4>
        <p>
          Define your own rewards and purchase them with earned crystals
          (repeatable or one-time).
        </p>
        <h4>Statistics</h4>
        <p>
          Track your progress with various statistics and visualizations. See
          your skill progression, time invested in projects, and more.
          <br />
          ____
        </p>
        <br />
        <h4>Future Updates (v1.0)</h4>
        <p>
          → Fancy UI Animations <br />
          → Sound Effects for extra motivation <br />
          → More detailed statistics and visualizations <br />
          → Extended Settings <br />
          → Refactor & Bug Fixes <br />
        </p>

        <p style="color: #f01e2c">Testing Phase 2.0: Bugs & Tasks on GitHub.</p>
      </Collapsible>
      <Collapsible title="RESOURCES">
        <p>
          <a target="_blank" href="https://github.com/arro-av/progress_app"
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
