<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import ProjectCard from "../components/ProjectCard.vue";

const filters = ["ALL PROJECTS", "AUDIO VISUAL", "DEVELOPMENT", "DESIGN"];

const activeFilter = ref(
  localStorage.getItem("activeFilter") || "ALL PROJECTS",
);
const isMobile = ref(false);
const projectListContainer = ref(null);
const activeMobileProject = ref(null);

let frameId = null;

const projects = ref([
  //___1___
  {
    categories: ["DEVELOPMENT"],
    title: "PROGRESS",
    text: "A gamified pomodoro app with analytics and a progression system.",
    currentProjectView: "/progress",
    imagePath: "/card_thumbails/Progress.jpg",
    link: ["https://github.com/arro-av/progress_app"],
    tag: ["APPLICATION", "ELECTRON", "VUE.JS"],
  },
  //___2___
  {
    categories: ["AUDIO VISUAL"],
    title: "SPOTLIGHT",
    text: "Visuals done for a concert in the Ars ELectronica Deep Space 8K.",
    currentProjectView: "/808Spotlight",
    imagePath: "/card_thumbails/808_Spotlight.jpg",
    link: [
      "https://www.youtube.com/watch?v=R6qUNRbgmk4",
      "https://808club.x-net.dev/808-spotlight/",
    ],
    tag: ["PERFORMANCE", "AEC", "DEEPSPACE"],
  },

  //___3___
  {
    categories: ["DESIGN"],
    title: "SCREENPRINTS",
    text: "Shirt Designs for my little at home screenprinting workshop.",
    currentProjectView: "/screenprints",
    imagePath: "/card_thumbails/Screenprints.jpg",
    tag: ["SCREENPRINTS", "INKSCAPE"],
  },
  //___4___
  /* TO BE ADDED LATER - HAVE NOT PUSHED ALL ATTRACTORS TO GITHUB
  {
    categories: ["AUDIO VISUAL", "DEVELOPMENT"],
    title: "STRANGE ATTRACTORS",
    text: "Various Strange Attractor simulations done using the GLSL language.",
    currentProjectView: "/strange_attractors",
    imagePath: "/card_thumbails/Strange_Attractors.jpg",
    link: ["https://github.com/arro-av/TD_Strange_Attractors_GLSL", "https://www.youtube.com/watch?v=Ty3u7qfPj2E" ],
    tag: ["GLSL", "TOUCHDESIGNER", "SIMULATION"],
  },
  */
  //___5___
  {
    categories: ["AUDIO VISUAL"],
    title: "CODING SOUND",
    text: "A project series on coding techno music using the live coding tool SonicPi.",
    currentProjectView: "/coding_techno",
    imagePath: "/card_thumbails/Coding_Techno.jpg",
    link: [
      "https://www.youtube.com/watch?v=s22yDfzhWoU&list=PLFLuAZh6tS3IfAgWplNl72bJkq3jWkxeA",
      "https://www.youtube.com/watch?v=s2NJrpKzkfQ&list=PLFLuAZh6tS3LepaSGIK9-x468r-3yD4MP",
    ],
    tag: ["LIVE CODING", "SONIC PI", "TECHNO"],
  },
  //___6___
  {
    categories: ["AUDIO VISUAL"],
    title: "TD TUTORIALS",
    text: "A collection of TouchDesigner Tutorials done for my YouTube Channel.",
    currentProjectView: "/TD_tutorials",
    imagePath: "/card_thumbails/TD_Tuts.jpg",
    link: [
      "https://www.youtube.com/watch?v=093l7at3phA&list=PLFLuAZh6tS3Lu9dsZ10a__zXhkrIHYXhE",
    ],
    tag: ["TUTORIALS", "TOUCHDESIGNER"],
  },
  //___7___
  {
    categories: ["DEVELOPMENT", "DESIGN"],
    title: "808CLUB.AT",
    text: "Website created for the linz based arts & culture club I am part of.",
    currentProjectView: "/808club.at",
    imagePath: "/card_thumbails/www.808club.at.jpg",
    link: ["https://808club.at/"],
    tag: ["WEBSITE", "WORDPRESS", "ELEMENTOR"],
  },
  //___8___
  {
    categories: ["DEVELOPMENT"],
    title: "ARRO PORTFOLIO",
    text: "My personal portfolio website, which is constant work in progress.",
    currentProjectView: "/arro",
    imagePath: "/card_thumbails/Portfolio.jpg",
    link: ["https://github.com/arro-av/arro.portfolio"],
    tag: ["WEBSITE", "VUE.JS", "THREE.JS"],
  },
  //___9___
  {
    categories: ["DESIGN"],
    title: "FLYER DESIGNS",
    text: "Designs made to promote various local art and music events.",
    currentProjectView: "/event_posters",
    imagePath: "/card_thumbails/Fyler_Designs.jpg",
    tag: ["GRAPHIC DESIGN", "AFFINITY"],
  },
  //___10___
  {
    categories: ["DEVELOPMENT", "DESIGN"],
    title: "SIDEPROJECTS HAGENBERG",
    text: "An archive containing mini projects I do during uni.",
    currentProjectView: "/hagenberg",
    imagePath: "/card_thumbails/Hagenberg.jpg",
    tag: ["FH HAGENBERG", "MINI PROJECTS"],
  },
]);

const filteredProjects = computed(() => {
  if (!activeFilter.value || activeFilter.value === "ALL PROJECTS") {
    return projects.value;
  }
  return projects.value.filter((project) =>
    project.categories.includes(activeFilter.value),
  );
});

function updateActiveFilter(filter) {
  activeFilter.value = filter;
  localStorage.setItem("activeFilter", filter);
}

function handleResize() {
  isMobile.value = window.innerWidth <= 506;

  if (!isMobile.value) {
    activeMobileProject.value = null;
  }
}

function updateCenteredProject() {
  if (!isMobile.value || !projectListContainer.value) {
    activeMobileProject.value = null;
    return;
  }

  const cards = Array.from(
    projectListContainer.value.querySelectorAll(
      ".projectCardLink[data-project-id]",
    ),
  );

  if (!cards.length) {
    activeMobileProject.value = null;
    return;
  }

  const viewportCenter = window.innerHeight / 2;
  const visibleCards = cards.filter((card) => {
    const rect = card.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  });

  const cardsToCheck = visibleCards.length ? visibleCards : cards;
  let closestCardId = null;
  let closestDistance = Number.POSITIVE_INFINITY;

  cardsToCheck.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const distanceToCenter = Math.abs(cardCenter - viewportCenter);

    if (distanceToCenter < closestDistance) {
      closestDistance = distanceToCenter;
      closestCardId = card.dataset.projectId;
    }
  });

  activeMobileProject.value = closestCardId;
}

function queueCenteredProjectUpdate() {
  if (frameId) {
    cancelAnimationFrame(frameId);
  }

  frameId = requestAnimationFrame(() => {
    frameId = null;
    updateCenteredProject();
  });
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", queueCenteredProjectUpdate, {
    passive: true,
  });
  nextTick(() => {
    queueCenteredProjectUpdate();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", queueCenteredProjectUpdate);

  if (frameId) {
    cancelAnimationFrame(frameId);
  }
});

watch([filteredProjects, isMobile], async () => {
  await nextTick();
  queueCenteredProjectUpdate();
});
</script>

<template>
  <div class="projectsWrapper">
    <div class="projectNav" :class="{ mobile: isMobile }">
      <select
        v-if="isMobile"
        class="projectNavDropdown"
        :value="activeFilter"
        @change="updateActiveFilter($event.target.value)"
      >
        <option v-for="filter in filters" :key="filter" :value="filter">
          {{ filter }}
        </option>
      </select>

      <li
        v-else
        v-for="filter in filters"
        :key="filter"
        :id="activeFilter === filter ? 'activeFilter' : ''"
        @click="updateActiveFilter(filter)"
      >
        {{ filter }}
      </li>
    </div>

    <div class="projectListContainer" ref="projectListContainer">
      <TransitionGroup name="project" tag="div" class="project-list">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.title"
          :projectId="project.currentProjectView || project.title"
          :isActive="
            isMobile &&
            activeMobileProject ===
              (project.currentProjectView || project.title)
          "
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
