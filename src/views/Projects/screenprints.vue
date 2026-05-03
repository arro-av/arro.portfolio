<script setup>
import Collapsible from "../../components/Collapsibles.vue";
import Back from "../../components/ProjectBack.vue";
import Overview from "../../components/ProjectOverview.vue";
import Image from "../../components/Image.vue";
</script>

<template>
  <div class="project">
    <Back />

    <section class="projectOverview">
      <Overview
        title="Screenprints"
        text="The idea of individualizing my own wardrobe always kinda appealed to me. I have been designing and drawing for quite some time now, and started screeenprinting 5 years ago. By now I have my own small printing workshop at home."
        imagePath="/card_thumbails/Screenprints.jpg"
      />

      <div class="mainProjectContent">



      </div>
    </section>

    <section class="projectDetails">
      <Collapsible title="PRINTS">
        
        <Image src="/project_images/d_durch_img3.jpg" alt="Printdesign" />
        <p>Big Brother - Procreate & TouchDesigner</p>

        <Image src="/project_images/d_durch_img2.jpg" alt="Printdesign" />
         <p>Doooooodle - Procreate</p>
        
        <Image src="/project_images/d_durch_img4.jpg" alt="Printdesign" />
        <p>Bananana - TouchDesigner</p>

        <Image src="/project_images/d_durch_img1.jpg" alt="Printdesign" />
        <p>
          Beeware - Ink Marker & Illustrator
        </p>

        
        <Image src="/project_images/d_durch_img5.jpg" alt="Printdesign" />
        <p>Soundsystem - Procreate</p>
        
       
        <Image src="/project_images/d_durch_img6.jpg" alt="Printdesign" />
         <p>
          Shroompa Mario - Inkpens & Procreate
        </p>
        
      </Collapsible>
      <Collapsible title="RESOURCES">
        <p>
          <a
            href="https://www.instagram.com/durch.durch.durch/"
            target="_blank"
            rel="noopener noreferrer"
            >→ Instagram @durch.durch.durch</a
          >
        </p>
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
