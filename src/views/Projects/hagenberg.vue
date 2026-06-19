<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
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

const dropzone = ref(null);
const originalPreview = ref(null);
const cleanPreview = ref(null);
const statusText = ref("No file");
const originalMeta = ref("-");
const cleanMeta = ref("-");
const downloadUrl = ref("");
const downloadName = ref("");
const isDragOver = ref(false);
const isProcessing = ref(false);
const lottieReady = ref(false);

const canDownload = computed(() => Boolean(downloadUrl.value));

let originalAnimation = null;
let cleanAnimation = null;
let lottieLoadPromise = null;
let originalPreviewUrl = "";
let cleanPreviewUrl = "";

function loadLottie() {
  const bodymovin = window.bodymovin || window.lottie;

  if (bodymovin) {
    lottieReady.value = true;
    return Promise.resolve(bodymovin);
  }

  if (lottieLoadPromise) {
    return lottieLoadPromise;
  }

  lottieLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";
    script.async = true;
    script.onload = () => {
      const loadedBodymovin = window.bodymovin || window.lottie;

      if (!loadedBodymovin) {
        reject(new Error("Could not load Lottie preview"));
        return;
      }

      lottieReady.value = true;
      resolve(loadedBodymovin);
    };
    script.onerror = () => reject(new Error("Could not load Lottie preview"));
    document.head.appendChild(script);
  });

  return lottieLoadPromise;
}

function handleDragOver(event) {
  event.preventDefault();
  isDragOver.value = true;
}

function handleDragLeave(event) {
  if (!dropzone.value?.contains(event.relatedTarget)) {
    isDragOver.value = false;
  }
}

function handleDrop(event) {
  event.preventDefault();
  isDragOver.value = false;
  handleFile(event.dataTransfer.files[0]);
}

function handleFileSelect(event) {
  handleFile(event.target.files[0]);
  event.target.value = "";
}

async function handleFile(file) {
  if (!file) return;

  isProcessing.value = true;
  statusText.value = "Processing...";

  try {
    const lottie = await loadLottie();
    const fileText = await file.text();
    const animation = JSON.parse(fileText);

    if (!animation || !Array.isArray(animation.layers)) {
      throw new Error("Invalid Lottie JSON");
    }

    const cleaned = clone(animation);
    const cleanup = removeLottielabWatermarks(cleaned);
    const outputName = file.name.replace(/\.json$/i, "") + "_removed.json";
    const output = JSON.stringify(cleaned, null, 2);

    revokeDownloadUrl();
    downloadUrl.value = URL.createObjectURL(
      new Blob([output], { type: "application/json" }),
    );
    downloadName.value = outputName;

    originalPreviewUrl = replaceObjectUrl(
      originalPreviewUrl,
      new Blob([fileText], { type: "application/json" }),
    );
    cleanPreviewUrl = replaceObjectUrl(
      cleanPreviewUrl,
      new Blob([output], { type: "application/json" }),
    );

    renderPreview(
      lottie,
      originalPreview.value,
      originalPreviewUrl,
      "original",
    );
    renderPreview(lottie, cleanPreview.value, cleanPreviewUrl, "clean");

    originalMeta.value = `${animation.layers.length} layers`;
    cleanMeta.value = `${cleaned.layers.length} layers`;
    statusText.value = `${cleanup.removed} removed`;
  } catch (error) {
    clearPreview();
    statusText.value = error.message;
  } finally {
    isProcessing.value = false;
  }
}

function renderPreview(lottie, container, path, type) {
  if (!container) return;

  if (type === "original" && originalAnimation) originalAnimation.destroy();
  if (type === "clean" && cleanAnimation) cleanAnimation.destroy();

  container.replaceChildren();

  const instance = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path,
  });

  if (type === "original") originalAnimation = instance;
  if (type === "clean") cleanAnimation = instance;
}

function clearPreview() {
  if (originalAnimation) originalAnimation.destroy();
  if (cleanAnimation) cleanAnimation.destroy();

  originalAnimation = null;
  cleanAnimation = null;
  originalPreview.value?.replaceChildren();
  cleanPreview.value?.replaceChildren();
  originalPreviewUrl = revokeObjectUrl(originalPreviewUrl);
  cleanPreviewUrl = revokeObjectUrl(cleanPreviewUrl);
  originalMeta.value = "-";
  cleanMeta.value = "-";
  downloadName.value = "";
  revokeDownloadUrl();
}

function replaceObjectUrl(currentUrl, blob) {
  revokeObjectUrl(currentUrl);
  return URL.createObjectURL(blob);
}

function revokeObjectUrl(url) {
  if (url) URL.revokeObjectURL(url);
  return "";
}

function revokeDownloadUrl() {
  if (downloadUrl.value) {
    URL.revokeObjectURL(downloadUrl.value);
    downloadUrl.value = "";
  }
}

function removeLottielabWatermarks(animation) {
  let removed = 0;

  visitLayerContainers(animation, (container) => {
    const before = container.layers.length;
    container.layers = container.layers.filter(
      (layer) => !isLottielabWatermarkLayer(layer, animation),
    );
    removed += before - container.layers.length;
  });

  return { removed };
}

function visitLayerContainers(value, callback, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);

  if (Array.isArray(value.layers)) callback(value);

  Object.values(value).forEach((child) => {
    if (child && typeof child === "object") {
      visitLayerContainers(child, callback, seen);
    }
  });
}

function isLottielabWatermarkLayer(layer, animation) {
  const name = String(layer.nm || "").toLowerCase();
  const position = readStaticVector(layer.ks?.p?.k);
  const scale = readStaticVector(layer.ks?.s?.k);
  const opacity = readStaticNumber(layer.ks?.o?.k);
  const width = Number(animation.w) || 0;
  const height = Number(animation.h) || 0;
  let score = 0;

  if (layer.ind === 12345679) score += 6;
  if (/made\s*with\s*lottielab/.test(name)) score += 6;
  if (name === "group layer 8" || name.includes("lottielab watermark")) {
    score += 2;
  }
  if (layer.ty === 4 && Array.isArray(layer.shapes)) score += 1;
  if (opacity === 100) score += 0.5;

  if (position && width && height) {
    const [x, y] = position;
    if (x > width * 0.58 && y > height * 0.82) score += 2;
  }

  if (scale) {
    const [sx, sy] = scale;
    if (sx > 12 && sx < 45 && sy > 12 && sy < 45) score += 1.5;
  }

  return (
    score >= 6 || (score >= 5 && layer.ty === 4 && Array.isArray(layer.shapes))
  );
}

function readStaticVector(value) {
  if (!Array.isArray(value)) return null;
  if (value.every((entry) => typeof entry === "number")) return value;
  return null;
}

function readStaticNumber(value) {
  return typeof value === "number" ? value : null;
}

function clone(value) {
  return typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
}

onBeforeUnmount(() => {
  clearPreview();
});
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

    <section class="hagenbergEntry projectDetails">
      <Collapsible title="BUTTNUGGET - PROTOTYPE" :is-visible="false">
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

    <section id="DinoRunner" class="hagenbergEntry projectDetails">
      <Collapsible title="LOTTIE DINO RUNNER" :is-visible="false">
        <p>
          This was developed for the
          <span class="highlight">"Applied Motion Graphics"</span> class. Lottie
          based SVG animation was the core concept discussed. Thus Lottie was
          used as the visual foundation for this project.
          <br />
          <span class="highlight" style="color: red">DESKTOP ONLY</span>
        </p>
        <div class="gameFrameWrapper">
          <iframe
            class="gameFrame"
            title="Dino Lottie Runner playable game"
            :srcdoc="gameSrcDoc"
          ></iframe>
        </div>
        <p class="gameHint"><span class="highlight">SPACEBAR</span> -> JUMP</p>
      </Collapsible>
    </section>

    <section id="LottieHack" class="hagenbergEntry projectDetails">
      <Collapsible title="WATERMARK REMOVER" :is-visible="true">
        <p>
          A browser tool for cleaning Lottie JSON exports from unwanted
          elements. Drop a JSON file in, compare the original and cleaned
          animation, then download the modified file. → For broke students only
          ツ
        </p>
        <div class="flotte-lotte-tool">
          <div class="toolHeader">
            <p>{{ statusText }}</p>
          </div>

          <label
            ref="dropzone"
            class="dropzone"
            :class="{ 'is-dragover': isDragOver }"
            @dragenter="handleDragOver"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
          >
            <input
              class="fileInput"
              type="file"
              accept=".json,application/json"
              @change="handleFileSelect"
            />
            <span>
              <strong>{{ isProcessing ? "Processing" : "Drop JSON" }}</strong>
              / Click
            </span>
          </label>

          <section class="previewGrid">
            <article class="previewPanel">
              <div class="previewHead">
                <span>Original</span>
                <span>{{ originalMeta }}</span>
              </div>
              <div class="stageShell">
                <div ref="originalPreview" class="stage"></div>
              </div>
            </article>

            <article class="previewPanel">
              <div class="previewHead">
                <span>Removed</span>
                <span>{{ cleanMeta }}</span>
              </div>
              <div class="stageShell">
                <div ref="cleanPreview" class="stage"></div>
              </div>
            </article>
          </section>

          <div class="actions">
            <span v-if="!lottieReady" class="helperText">
              Preview loads on first file.
            </span>
            <a
              class="downloadButton"
              :class="{ disabled: !canDownload }"
              :href="canDownload ? downloadUrl : undefined"
              :download="downloadName || undefined"
              :aria-disabled="!canDownload"
            >
              Download
            </a>
          </div>
        </div>
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
