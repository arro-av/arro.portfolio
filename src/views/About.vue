<script setup>
import Collapsible from "../components/Collapsibles.vue";
import Image from "../components/Image.vue";
</script>

<template>
  <div class="aboutSite">
    <section class="aboutGeneral">
      <Image src="/project_images/me_about.png" alt="Me" />

      <div class="aboutTextWrapper">
        <h5>hi, my name is...</h5>
        <h2>ROBERT ARDELEANU</h2>
        <p>
          I am a creative coding enthusiast & love tinkering with all sorts of technology. Actually I really enjoy the process of creating stuff as a whole. ツ<br /> <br>
        </p>
        <div class="iconInfoContainer">
          <img src="../assets/images/education.svg" alt="Education icon - a graduation cap used to indicate educational background.">
          <p>MtD Student @FH Hagenberg</p>
        </div>
        <div class="iconInfoContainer">
          <img src="../assets/images/location.svg" alt="Location icon - a pin used to indicate the location of a place.">
          <p>Linz, Upper Austria</p>
        </div>
      </div>
    </section>

    <section class="aboutDetails">

      
      <Collapsible title="BACKGROUND" isVisible="True">
        <p>
          While born in Râmnicu Vâlcea, I grew up in Linz from the age of six. One of the first German movies I remember watching was The Land Before Time. I was so invested in those little dinosaurs that I couldn’t accept it ending. That’s when my first crayon comic was born.
          <br> <br>
          I’ve always loved making stuff. Random scribbles on my parents’ walls. This first hairdresser job at my cousin’s place, even though our moms said scissors were a NoNo (we looked fresh tho). Saving up for an Elgato for 6 months straight, so I could upload SICK let’s plays to YouTube. 
          <br> <br>
          Yeah, I’m getting off track. Point is, I’ve never been obsessed with one thing, but passionate about many. A dedicated learner of a lot, if you will. Being somewhat of a nerd, the preferred tool nowadays is my laptop.
          <br> <br>
          Looking ahead, I want to continue experimenting, work with like-minded people, and make the most of my time studying. I don’t know where it will lead, but I’ll figure out along the way.
        </p>
        
      </Collapsible>
      <Collapsible title="THINGS I LOVE">
        <h4>Coding Stuff</h4>
        <p>visuals, audio, apps, websites & more</p>

        <h4>Designing Stuff</h4>
        <p>shirts, patches, buttons & whatnot</p>

        <h4>Fluffy Stuff</h4>
        <p>loving cat dad of two little fellas :3</p>

        <h4>Bassy Stuff</h4>
        <p>four on the floor is my jam ~.~</p>
      </Collapsible>

      <Collapsible title="TECHNOLOGIES">
        <h4>Programming</h4>
        <p>JS/TS, Python, Java, GLSL</p>

        <h4>Frameworks</h4>
        <p>Vue.js, Electron, SASS</p>

        <h4>AI Tools</h4>
        <p>Copilot, Codex, ComfyUI, Stitch</p>

        <h4>Realtime</h4>
        <p>TouchDesigner, Unity</p>

        <h4>Audio</h4>
        <p>SonicPi, Ableton</p>

        <h4>Video</h4>
        <p>DaVinci Resolve, OBS</p>

        <h4>Design</h4>
        <p>Figma, Affinity Suite, AdobeCC</p>
      </Collapsible>
    </section>
  </div>
</template>

<style scoped>
.rotated {
  transform: rotate(45deg);
  transition: transform 0.5s ease;
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
</style>
