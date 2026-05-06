<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";

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

function loadLottie() {
  if (window.lottie) {
    lottieReady.value = true;
    return Promise.resolve(window.lottie);
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
      lottieReady.value = true;
      resolve(window.lottie);
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
    const animation = JSON.parse(await file.text());

    if (!animation || !Array.isArray(animation.layers)) {
      throw new Error("Invalid Lottie JSON");
    }

    const cleaned = clone(animation);
    const cleanup = removeLottielabWatermarks(cleaned);
    const outputName = file.name.replace(/\.json$/i, "") + "_removed.json";
    const output = JSON.stringify(cleaned, null, 2);

    revokeDownloadUrl();
    downloadUrl.value = URL.createObjectURL(
      new Blob([output], { type: "application/json" })
    );
    downloadName.value = outputName;

    renderPreview(lottie, originalPreview.value, animation, "original");
    renderPreview(lottie, cleanPreview.value, cleaned, "clean");

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

function renderPreview(lottie, container, animationData, type) {
  if (!container) return;

  if (type === "original" && originalAnimation) originalAnimation.destroy();
  if (type === "clean" && cleanAnimation) cleanAnimation.destroy();

  container.replaceChildren();

  const instance = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData,
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
  originalMeta.value = "-";
  cleanMeta.value = "-";
  downloadName.value = "";
  revokeDownloadUrl();
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
      (layer) => !isLottielabWatermarkLayer(layer, animation)
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

  return score >= 6 || (score >= 5 && layer.ty === 4 && Array.isArray(layer.shapes));
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
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="Watermark Remover"
        text="Drop your Lottielab exports to remove the waterma.... wait thats illegal!? 
        Anyways, fuck you Adobe → Have fun animating ツ"
        imagePath="/card_thumbails/Lottie_Hack.jpg"
      />
    </section>

    <section class="projectDetails">
      <Collapsible title="TOOL" :is-visible="true">
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
              <div ref="originalPreview" class="stage"></div>
            </article>

            <article class="previewPanel">
              <div class="previewHead">
                <span>Removed</span>
                <span>{{ cleanMeta }}</span>
              </div>
              <div ref="cleanPreview" class="stage"></div>
            </article>
          </section>

          <div class="actions">
            <span v-if="!lottieReady" class="helperText">Preview loads on first file.</span>
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

      <Collapsible title="TECH">
        <p>
          → Vue.js <br />
          → Lottie <br />
          → Browser File API <br />
          → JSON
        </p>
      </Collapsible>
    </section>
  </div>
</template>

<style scoped>
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

.toolHeader h3 {
  margin: 0;
  color: var(--text-color);
  font-size: clamp(2rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 0.9;
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
  transition: border-color 0.16s ease, transform 0.16s ease,
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
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  background-size: 20px 20px;
}

.previewHead {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--text-color), transparent 72%);
  background: var(--background-color);
  color: var(--text-color);
  font-weight: 700;
}

.previewHead span:last-child {
  font-weight: 500;
  opacity: 0.6;
}

.stage {
  min-height: 300px;
  display: grid;
  place-items: center;
  padding: 22px;
}

.stage :deep(svg) {
  max-width: 100%;
  max-height: 100%;
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

@media (max-width: 760px) {
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
</style>
