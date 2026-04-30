<script setup>
import { ref, computed } from "vue";
import ProjectCard from "../components/ProjectCard.vue";

const activeFilter = ref(localStorage.getItem("activeFilter") || "ALL PROJECTS");

const projects = ref([
  //DEVELOPMENT
  {
    categories: ["DEVELOPMENT"],
    title: "PROGRESS",
    text: "A gamified pomodoro system featuring quests, analyitics and a progression system.",
    currentProjectView: "/progress",
    imagePath: "/card_thumbails/Progress.jpg",
    link: ["https://github.com/arro-av/progress_app"],
    tag: ["#APPLICATION", "#ELECTRON", "#VUE.JS"],
  },

  //AUDIO VISUAL
  {
    categories: ["AUDIO VISUAL"],
    title: "TD Tutorials",
    text: "A collection of TouchDesigner Tutorials I did for my YouTube Channel.",
    currentProjectView: "/TD_tutorials",
    imagePath: "/card_thumbails/TD_Tuts.jpg",
    link: ["https://www.youtube.com/watch?v=093l7at3phA&list=PLFLuAZh6tS3Lu9dsZ10a__zXhkrIHYXhE"],
    tag: ["#Touchdesigner", "#Tutorials"],
  },
  {
    categories: ["AUDIO VISUAL"],
    title: "Coding Techno",
    text: "A project series focused on coding techno music using the live coding environment SonicPi.",
    currentProjectView: "/coding_techno",
    imagePath: "/card_thumbails/Coding_Techno.jpg",
    link: ["https://www.youtube.com/watch?v=s22yDfzhWoU&list=PLFLuAZh6tS3IfAgWplNl72bJkq3jWkxeA"],
    tag: ["#SonicPi", "Techno", "#LiveSessions"],
  }
]);

const filteredProjects = computed(() => {
  if (!activeFilter.value || activeFilter.value === "ALL PROJECTS") {
    return projects.value;
  }
  return projects.value.filter((project) =>
    project.categories.includes(activeFilter.value)
  );
});

function updateActiveFilter(filter) {
  if (activeFilter.value === filter) {
    activeFilter.value = null;
  } else {
    activeFilter.value = filter;
    localStorage.setItem("activeFilter", filter);
  }
}
</script>

<template>
  <div class="projectsWrapper">
    <div class="projectNav">
      <li
        v-for="filter in ['ALL PROJECTS','AUDIO VISUAL', 'DEVELOPMENT', 'DESIGN']"
        :key="filter"
        :id="activeFilter === filter ? 'activeFilter' : ''"
        @click="updateActiveFilter(filter)"
      >
        {{ filter }}
      </li>
    </div>

    <div class="projectListContainer">
      <TransitionGroup name="project" tag="div" class="project-list">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.title"
          :projectTitle="project.title"
          :projectInfo="project.text"
          :currentProjectView="project.currentProjectView"
          :imagePath="project.imagePath"
          :projectTags="project.tag"
          :projectLinks="project.link"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
