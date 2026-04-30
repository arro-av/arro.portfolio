<script setup>
import { onMounted, nextTick } from "vue";
import Prism from "prismjs";

import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
import Image from "../../components/Image.vue";

onMounted(() => {
  nextTick(() => {
    Prism.highlightAll();
  });
});
</script>

<template>
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="TD Tutorials"
        text="This is a collection of tutorials I made for TouchDesigner, covering a range of topics from beginner to intermediate level. While sharing my knowlege, I also get to solidify my own understanding of the software."
        imagePath="/card_thumbails/TD_Tuts.jpg"
      />

    </section>

    <section class="projectDetails">
        <Collapsible title="RESOURCES">
         <p>
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=093l7at3phA&list=PLFLuAZh6tS3Lu9dsZ10a__zXhkrIHYXhE"
            >→ YouTube Playlist</a
          >
        </p>
        <p>
          <a
            target="_blank"
            href="https://drive.google.com/drive/folders/1Hxd5kI1gWZXB3dU15D3aQc7badd6mQHl?usp=sharing"
            >→ Tutorial Files + Assets</a
          >
        </p>
      </Collapsible>
      <Collapsible title="SPIRAL BANANA">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/093l7at3phA?si=cXa1TXao2kWWFYhe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Collapsible>
            <Collapsible title="STRANGE ATTRACTOR">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/Ty3u7qfPj2E?si=dZSUhSgTcBR6IP0k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Collapsible>
            <Collapsible title="POKEMORPH SHADER">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/l1wTkWRXGMg?si=P4UnQY6eRIrtAfUf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Collapsible>
            <Collapsible title="INSTANCE DISPLACEMENT">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/GtS-Kc-UkYI?si=vLAi9XUSeBd6doBz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Collapsible>
            <Collapsible title="CACHING CALEIDOSCOPE">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/XJpCGcrML-E?si=BwrjvjKekMg5FP0_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </Collapsible>
            <Collapsible title="FUNKY AUDIOSPECTRUM">
        <iframe width="810" height="460" src="https://www.youtube.com/embed/h-AJN-XxsGE?si=TfpGFDVJB7g5a8fK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
