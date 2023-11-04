<template>
  <div class="parallax-container" id="parallaxContainer">
    <img class="parallax-back" :src="milesMoralesBack" />
    <!-- <img class="parallax-front" :src="milesMoralesFront" /> -->
    <img class="parallax-front" :src="milesMoralesGif" />
    <img class="parallax-middle" :src="rain" />
  </div>
  <div class="search-bar">
    <input v-model="searchQuery" @keyup.enter="searchHeroes">

  </div>
</template>

<script>
import milesMoralesBackUrl from '@/assets/images/miles_morales_back.png';
import milesMoralesFrontUrl from '@/assets/images/miles_morales_front.png';
import milesMoralesGifUrl from '@/assets/images/miles_morales_gif.gif';
import rainUrl from '@/assets/images/rain.gif';

export default {
  data() {
    return {
      milesMoralesBack: milesMoralesBackUrl,
      milesMoralesFront: milesMoralesFrontUrl,
      milesMoralesGif: milesMoralesGifUrl,
      rain: rainUrl,
      searchQuery: ''
    };
  },
  methods: {
    searchHeroes() {
      this.$router.push({ name: 'hero', params: { id: this.searchQuery } });
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('parallaxContainer');
  const frontImage = container.querySelector('.parallax-front');

  container.addEventListener('mousemove', (e) => {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    // Calculer le pourcentage de la position de la souris sur l'axe X et Y
    const xPos = (offsetX / clientWidth) - 0.5;
    const yPos = (offsetY / clientHeight) - 0.5;

    // Modifier la position de la deuxième image
    const xOffset = 20 * xPos; // Ces valeurs sont ajustables pour l'effet désiré
    const yOffset = 20 * yPos; // Ces valeurs sont ajustables pour l'effet désiré

    frontImage.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});


</script>

<style>
/* Votre CSS pour l'effet parallaxe */


.search-bar {
  position: absolute;
  top: 100px;
}

.parallax-container {
  position: relative;
  overflow: hidden;
}

.parallax-back {
  width: 100%;
  height: 100vh;
}
.parallax-middle {
    position: absolute;
    right: 0;
    height: 100%;
    opacity: 0.15;
}

.parallax-front {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  /* Ou la taille que vous souhaitez */
  pointer-events: none;
  /* Pour s'assurer que la souris détecte l'événement à travers cette image */
}
</style>
