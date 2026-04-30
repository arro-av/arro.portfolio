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
        title="Event Posters"
        text="Various flyer designs I made primarily for our club 808club. These here are exclusively pieces I designed for real events. I am looking forward to be designing such things for other projects in the future as well."
        imagePath="/card_thumbails/Fyler_Designs.jpg"
      />

    </section>

    <section class="projectDetails">
      <Collapsible title="HOUSE OF ARTS">
          <p>
          House of Arts #1- Affinity & Procreate
        </p>
          <Image src="/project_images/d_808_img2.jpg" alt="Flyer" style="width: 500px;" />


        

         <p>
          House of Arts #2- Photoshop | Event sadly canceled
        </p>

          <Image src="/project_images/d_808_img5.jpg" alt="Flyer" style="width: 500px;" />
       

        
      </Collapsible>

            <Collapsible title="GAME OF SKATE">
  
          <p>
          Game of Skate #1- Affinity
        </p>
          <Image src="/project_images/d_808_img3.jpg" alt="Flyer" style="width: 500px;" />

        


          <p>
          Game of Skate #2- Affinity
        </p>

          <Image src="/project_images/d_808_img4.jpg" alt="Flyer" style="width: 500px;" />
       

        
      </Collapsible>

      <Collapsible title="RESOURCES">
        <p>

          <a
            href="https://808club.at/events/"
            target="_blank"
            rel="noopener noreferrer"
            >→ Events 808Club</a
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
