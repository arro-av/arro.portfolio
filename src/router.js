import { createRouter, createWebHistory } from "vue-router";
import Projects from "./views/Projects.vue";
import About from "./views/About.vue";
import LinkTree from "./views/LinkTree.vue";

//DEVELOPMENT PROJECTS
import progress from "./views/Projects/progress.vue";
import arro from "./views/Projects/arro.vue";

//DESIGN PROJECTS
import eioeiclub from "./views/Projects/808club.vue";
import screenprints from "./views/Projects/screenprints.vue";
import event_posters from "./views/Projects/event_posters.vue";

//AV PROJECTS
import TD_tutorials from "./views/Projects/TD_tutorials.vue";
import coding_techno from "./views/Projects/coding_techno.vue";
import eioeispotlight from "./views/Projects/808spotlight.vue";

const routes = [
  //Main Routes
  {
    path: "/",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/LinkTree",
    name: "LinkTree",
    component: LinkTree,
  },

  //Project Routes
  //DEVELOPMENT
  {
    path: "/arro",
    name: "arro",
    component: arro,
  },
  {
    path: "/progress",
    name: "progress",
    component: progress,
  },
  //DESIGN
  {
    path: "/808club.at",
    name: "eioeiclub",
    component: eioeiclub,
  },
  {
    path: "/screenprints",
    name: "screenprints",
    component: screenprints,
  },
  {
    path: "/event_posters",
    name: "event_posters",
    component: event_posters,
  },

  //AUDIO VISUAL
  {
    path: "/TD_tutorials",
    name: "TD_tutorials",
    component: TD_tutorials,
  },
  {
    path: "/coding_techno",
    name: "coding_techno",
    component: coding_techno,
  },
  {
    path: "/808Spotlight",
    name: "eioeispotlight",
    component: eioeispotlight,
  },
];

const projectRoutes = routes
  .filter((route) => !["/", "/About", "/LinkTree"].includes(route.path))
  .map((route) => route.path);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.path === "/" && projectRoutes.includes(from.path)) {
      return { top: 460 };
    }

    return { top: 0 };
  },
});

export default router;
