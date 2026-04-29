<script setup>
import { useRouter } from "vue-router";
import githubIcon from "../assets/images/GitHub.svg";
import youtubeIcon from "../assets/images/YouTube.svg";
import webIcon from "../assets/images/Web.svg";

const router = useRouter();

defineProps({
  imagePath: String,
  projectTitle: String,
  projectInfo: String,
  projectTags: Array,
  projectLinks: Array,
  currentProjectView: String,
});

function getLinkUrl(link) {
  return typeof link === "string" ? link : link?.url || "";
}

function getLinkLabel(link) {
  if (typeof link === "string") {
    return link;
  }

  return link?.name || getLinkUrl(link);
}

function getLinkIcon(linkUrl) {
  const normalizedUrl = (linkUrl || "").toLowerCase();

  if (normalizedUrl.includes("youtube")) {
    return youtubeIcon;
  }

  if (normalizedUrl.includes("github")) {
    return githubIcon;
  }

  return webIcon;
}

function openProject(currentProjectView) {
  if (!currentProjectView) {
    return;
  }

  router.push(currentProjectView);
}
</script>

<template>
  <TransitionGroup name="project" tag="div" class="project-list">
      <div
      class="projectCardLink"
      role="link"
      tabindex="0"
      @click="openProject(currentProjectView)"
      @keydown.enter="openProject(currentProjectView)"
      @keydown.space.prevent="openProject(currentProjectView)"
    >
      <div
      class="projectContainer"
    >
        <div class="projectImage" :style="{ backgroundImage: `url(${imagePath})` }">
          <div class="externalLink">
            <a
              v-for="link in projectLinks"
              :key="getLinkUrl(link)"
              :href="getLinkUrl(link)"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
            >
              <img
                class="externalLinkIcon"
                :src="getLinkIcon(getLinkUrl(link))"
                :alt="`${getLinkLabel(link)} icon`"
              />
            </a>
          </div>
        </div>  

          <h2>
            {{ projectTitle }}
          </h2>
          <p>
            {{ projectInfo }}
          </p>

          <div class="projectTags">
            <p v-for="tag in projectTags" :key="tag">{{ tag }}</p>
          </div>
        </div>
      </div>
  </TransitionGroup>
</template>

<style scoped>
.project-enter-active,
.project-leave-active {
  transition: opacity 0.1s ease;
}

.project-enter-from,
.project-leave-to {
  opacity: 0;
}

.project-enter-to,
.project-leave-from {
  opacity: 1;
}
</style>
