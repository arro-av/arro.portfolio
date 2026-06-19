<script setup>
import { ref, onMounted } from "vue";
import { useTheme } from "../composables/useTheme";

const nyanCat = ref(null);

const { toggleTheme } = useTheme();

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

onMounted(() => {
  const nyanButton = document.getElementById("nyan");
  if (nyanButton) {
    nyanButton.addEventListener("click", () => {
      if (nyanCat.value) {
        nyanCat.value.classList.add("flyAnim");
        // Optionally remove the class after the animation completes
        nyanCat.value.addEventListener(
          "animationend",
          () => {
            nyanCat.value.classList.remove("flyAnim");
          },
          { once: true }, // remove listener after 1 execution
        );
      }
    });
  }
});
</script>

<template>
  <nav class="mainNavigation">
    <div class="flyingCat" style="z-index: 5000" ref="nyanCat">
      <img
        src="../assets/images/flying_nyan.gif"
        alt="Nyan Cat flying over screen"
        width="270px"
      />
    </div>

    <div class="logoContainer">
      <RouterLink to="/" class="navLink">
        <img
          src="../assets/images/logo2.svg"
          alt="A monochrome logo resembling the initials AR."
          id="logoImage"
        />
      </RouterLink>
      <img src="../assets/images/nyan_button.png" alt="NYAN Button" id="nyan" />
    </div>

    <button
      type="button"
      id="menu"
      class="menuToggle"
      :class="{ open: menuOpen }"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation menu"
      @click="toggleMenu"
    >
      <span class="menuLine top"></span>
      <span class="menuLine bottom"></span>
    </button>

    <ul :class="{ 'mobile-active': menuOpen }">
      <div class="navItemsContainer">
        <RouterLink to="/" class="navLink" @click="toggleMenu">
          <li>PROJΞCTS</li>
        </RouterLink>
        <RouterLink to="/About" class="navLink" @click="toggleMenu">
          <li>ΛBOUT</li>
        </RouterLink>
        <RouterLink to="/LinkTree" class="navLink" @click="toggleMenu">
          <li>LIΠKS</li>
        </RouterLink>
        <li id="lastNavLink" style="opacity: 30%; margin-top: 2px">|</li>

        <div class="modeSwitchContainer">
          <img
            src="../assets/images/darkmode_icon.svg"
            alt="A moon icon - used to switch to darkmode."
            class="modeSwitch dark"
            @click="toggleTheme"
          />
          <img
            title="Wait. This is illegal."
            src="../assets/images/lightmode_icon.svg"
            alt="A sun icon - used to switch to lightmode."
            class="modeSwitch light"
            @click="toggleTheme"
          />
        </div>
      </div>
    </ul>
  </nav>
</template>

<style scoped>
.router-link-active {
  opacity: 100%;
}
</style>
