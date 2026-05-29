<script setup>
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
import gameHtml from "../../assets/dino_runner/game.html?raw";
import cactusCollideUrl from "../../assets/dino_runner/animations/cactus_collide.json?url";
import cactusIdleUrl from "../../assets/dino_runner/animations/cactus_idle.json?url";
import dinoEatUrl from "../../assets/dino_runner/animations/dino_eat.json?url";
import dinoIdleUrl from "../../assets/dino_runner/animations/dino_idle.json?url";
import dinoRunUrl from "../../assets/dino_runner/animations/dino_run.json?url";
import haxenCollectUrl from "../../assets/dino_runner/animations/haxen_collect.json?url";
import haxenIdleUrl from "../../assets/dino_runner/animations/haxen_idle.json?url";
import highscoreUrl from "../../assets/dino_runner/animations/highscore.json?url";
import stoneButtonClickUrl from "../../assets/dino_runner/animations/stonebtn_click.json?url";
import stoneButtonHoverUrl from "../../assets/dino_runner/animations/stonebtn_hover.json?url";
import stoneButtonUrl from "../../assets/dino_runner/animations/stonebtn.json?url";
import sunRotateUrl from "../../assets/dino_runner/animations/sun_rotate.json?url";
import cavemanWoffUrl from "../../assets/dino_runner/font/PrehistoricCaveman.woff?url";
import cavemanWoff2Url from "../../assets/dino_runner/font/PrehistoricCaveman.woff2?url";
import groundUrl from "../../assets/dino_runner/vectors/Ground.svg?url";
import hillUrl from "../../assets/dino_runner/vectors/Hill.svg?url";

const heroImage = hillUrl;
const gameAssetUrls = {
  "./animations/cactus_collide.json": cactusCollideUrl,
  "./animations/cactus_idle.json": cactusIdleUrl,
  "./animations/dino_eat.json": dinoEatUrl,
  "./animations/dino_idle.json": dinoIdleUrl,
  "./animations/dino_run.json": dinoRunUrl,
  "./animations/haxen_collect.json": haxenCollectUrl,
  "./animations/haxen_idle.json": haxenIdleUrl,
  "./animations/highscore.json": highscoreUrl,
  "./animations/stonebtn_click.json": stoneButtonClickUrl,
  "./animations/stonebtn_hover.json": stoneButtonHoverUrl,
  "./animations/stonebtn.json": stoneButtonUrl,
  "./animations/sun_rotate.json": sunRotateUrl,
  "./font/PrehistoricCaveman.woff2": cavemanWoff2Url,
  "./font/PrehistoricCaveman.woff": cavemanWoffUrl,
  "./vectors/Ground.svg": groundUrl,
  "./vectors/Hill.svg": hillUrl,
};

const gameSrcDoc = Object.entries(gameAssetUrls).reduce(
  (html, [sourcePath, assetUrl]) => html.replaceAll(sourcePath, assetUrl),
  gameHtml,
);
</script>

<template>
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="Dino Lottie Runner"
        text="A chrome inspired dino runner but built with Lottie animations! This project was part of the Applied Motion Design class at FH Hagenberg."
        imagePath="/card_thumbails/Dino_Runner.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="GAME" :is-visible="true">
        <div class="gameFrameWrapper">
          <iframe
            class="gameFrame"
            title="Dino Lottie Runner playable game"
            :srcdoc="gameSrcDoc"
          ></iframe>
        </div>
        <p class="gameHint">SPACEBAR → JUMP</p>
      </Collapsible>

      <Collapsible title="ABOUT">
        <p>
          This project was developed for a university class at FH Hagenberg
          called Applied Motion Graphics. Lottie was the core technology in the
          course, which is why I chose it as the visual foundation here, even
          though Lottie was not designed with games in mind.
        </p>

        <p>
          The game still has three clear states - menu, active run and highscore
          - and uses requestAnimationFrame for the loop, DOM bounding boxes for
          collision checks, and localStorage to keep the best score between page
          refreshes.
        </p>
      </Collapsible>

      <Collapsible title="TECH">
        <p>
          -> HTML / CSS / JavaScript <br />
          -> Lottie-web / Bodymovin <br />
          -> SVG assets <br />
          -> requestAnimationFrame <br />
          -> DOM collision detection <br />
          -> localStorage <br />
        </p>
      </Collapsible>
    </section>
  </div>
</template>

<style scoped>
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

@media (max-width: 680px) {
  .gameFrameWrapper .gameFrame {
    height: 430px;
  }
}
</style>
