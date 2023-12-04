<template>
  <div class="home-container">

    <div class="gallery">

      <img class="leftImage" :src="imageLeft" @click="handleImageClick('left')" />
      <img class="rightImage" :src="imageRight" @click="handleImageClick('right')" />
    </div>


    <div class="leftImageContent" v-if="currentImage === 'left'">
      <button class="back-button" @click="resetView('left')">Retour</button>

      <p class="marveltext">Dive into the thrilling Marvel Universe, a realm where heroes like Spider-Man and Iron Man
        battle against evil. Marvel Comics brings you a spectacular lineup of iconic characters and stories filled with
        heroism, conflict, and triumph. Experience adventures where courage and justice stand tall in the face of
        darkness.

      </p>
      <div class="inputcontainer">
        <span class="search-bar inputmarvel">
          <input type="text" placeholder="Choose your marvel Hero" v-model="searchQuery" @input="searchHeroes('marvel')">
          <span></span>
        </span>
        <div class="search-results">
          <ul v-if="heroSuggestions && heroSuggestions.length">
            <li v-for="hero in heroSuggestions" :key="hero.id" @click="goToHero(hero.id)">
              <img :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" class="hero-thumbnail" />
              <span class="hero-name">{{ hero.name }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>


    <div class="rightImageContent" v-if="currentImage === 'right'">
      <button class="back-button" @click="resetView('right')">Retour</button>
      <p class="dctext">Step into the legendary world of DC Comics, home to Superman and Batman, where heroism meets
        timeless storytelling. DC Comics has crafted a rich tapestry of narratives where bravery, mystery, and morality
        intertwine. Join the journey through epic tales of good versus evil, in a quest for truth and justice.</p>
      <div class="inputcontainer">
        <span class="search-bar inputdc">
          <input type="text" placeholder="Choose your DC Hero" v-model="searchQuery" @input="searchHeroes('dc')">
          <span></span>
        </span>
        <div class="search-results">
          <ul v-if="heroSuggestions && heroSuggestions.length">
            <li v-for="hero in heroSuggestions" :key="hero.id" @click="goToHero(hero.id)">
              <img :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" class="hero-thumbnail" />
              <span class="hero-name">{{ hero.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import milesMoralesGifUrl from '@/assets/images/miles_morales_gif.gif';
import imagemarvel from '@/assets/images/marvel.jpg';
import imagedc from '@/assets/images/dc_comics.jpg';
import _ from 'lodash';
import axios from 'axios';
console.log("Developed by Fares Kouki")


export default {
  data() {
    return {
      imageLeft: imagemarvel,
      imageRight: imagedc,
      milesMoralesGif: milesMoralesGifUrl,
      searchQuery: '',
      heroSuggestions: [],
      currentImage: null
    };
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
    handleImageClick(image) {
      this.currentImage = image;

      this.$nextTick(() => {
        const leftImageEl = document.querySelector('.leftImage');
        const rightImageEl = document.querySelector('.rightImage');
        const leftContentEl = document.querySelector('.leftImageContent');
        const rightContentEl = document.querySelector('.rightImageContent');

        [leftImageEl, rightImageEl, leftContentEl, rightContentEl].forEach(el => {
          if (el) {
            el.style.display = 'none';
          }
        });

        if (image === 'left') {
          if (leftImageEl && leftContentEl) {
            leftImageEl.style.display = 'block';
            leftContentEl.style.display = 'grid';
            leftImageEl.classList.add("img-fullscreen");
            leftContentEl.classList.add("fade-in");
            setTimeout(() => leftContentEl.classList.add("show"), 10);
          }
        } else if (image === 'right') {
          if (rightImageEl && rightContentEl) {
            rightImageEl.style.display = 'block';
            rightContentEl.style.display = 'grid';
            rightImageEl.classList.add("img-fullscreen");
            rightContentEl.classList.add("fade-in");
            setTimeout(() => rightContentEl.classList.add("show"), 10);
          }
        }
      });
    },
    resetView(imageside) {
      this.currentImage = null;
      const leftImageEl = document.querySelector('.leftImage');
      const rightImageEl = document.querySelector('.rightImage');
      const leftContentEl = document.querySelector('.leftImageContent');
      const rightContentEl = document.querySelector('.rightImageContent');
      document.querySelectorAll('.leftImageContent, .rightImageContent').forEach(el => {
        el.style.display = 'none';
      });
      if (imageside === 'left') {
        if (leftImageEl && leftContentEl) {
          rightImageEl.style.display = 'block';
          leftContentEl.style.display = 'none';
          leftImageEl.classList.remove("img-fullscreen");
        }
      } else if (imageside === 'right') {
        if (rightImageEl && rightContentEl) {
          leftImageEl.style.display = 'block';
          rightContentEl.style.display = 'none';
          rightImageEl.classList.remove("img-fullscreen");
        }
      }
    },


    searchHeroes: _.debounce(async function (universe) {
      if (!this.searchQuery) return;
      if (universe == "marvel") {
        try {
          const response = await axios.get('http://localhost:3001/search-hero', {
            params: { name: this.searchQuery }
          });
          this.heroSuggestions = response.data.data.results; // Assurez-vous que ce chemin correspond à la structure de données de l'API Marvel
        } catch (error) {
          console.error(error);
        }
      } else {

      }
    }, 500),

    goToHero(id) {
      this.$router.push({ name: 'hero', params: { id: id } });
    },

  }
}

</script>

<style  lang="scss">
.home-container {
  margin: 0;
  height: 100vh;

  .gallery {
    --g: 8px;
    height: 100vh;
    width: 100vw;
    display: grid;
    clip-path: inset(1px);

    img {
      --_p: calc(-1*var(--g));
      height: 100%;
      grid-area: 1/1;
      width: 100%;
      // aspect-ratio: 1;
      cursor: pointer;
      transition: .4s .1s;
    }

    img:first-child {
      clip-path: polygon(0 0, calc(100% + var(--_p)) 0, 0 calc(100% + var(--_p)))
    }

    img:last-child {
      clip-path: polygon(100% 100%, 100% calc(0% - var(--_p)), calc(0% - var(--_p)) 100%)
    }

    .img-fullscreen {
      clip-path: none !important;
    }
  }

  .gallery:hover>img:last-child,
  .gallery:hover>img:first-child:hover {
    --_p: calc(50% - var(--g));
  }

  .gallery:hover>img:first-child,
  .gallery:hover>img:first-child:hover+img {
    --_p: calc(-50% - var(--g));
  }

  .leftImageContent,
  .rightImageContent {
    display: none;
    opacity: 0;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;

    .back-button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 10px 15px;
      background-color: #f2f2f2;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      z-index: 2;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .inputcontainer {
      display: grid;
      justify-content: center;

      .search-bar {
        position: relative;
        display: inherit;
        z-index: 1;
        width: 600px;
        height: 100px;
        font-size: 1.5em;
        background: linear-gradient(21deg, #10abff, #1beabd);
        padding: 5px;
        border-radius: 9999em;

        *:not(span) {
          border-radius: inherit;
          border: none;

          &:focus+span {
            opacity: 1;
            transform: scale(1);
          }
        }

        span {
          transform: scale(.993, .94);
          transition: transform .5s, opacity .25s;
          opacity: 0;
          position: absolute;
          z-index: 0;
          margin: 5px;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 0 0 3px #fff,
            0 0 0 4px #fff,
            3px -3px 30px #1beabd,
            -3px 3px 30px #10abff;
        }

        input {
          text-align: center;
          font-size: 32px;
          font-family: inherit;
          line-height: inherit;
          color: #2e3750;
          min-width: 12em;
        }

        ::placeholder {
          color: #cbd0d5;
        }
      }


      .search-results {
        background-color: rgb(255, 255, 255, 0.2);
        height: fit-content;
        font-size: 32px;
        width: 100%;
        ul {
          list-style: none;

          li {
            align-items: center;
            display: flex;
            margin: 20px;
            cursor: pointer;

            .hero-thumbnail {
              width: 75px;
              height: 75px;
              object-fit: cover;
              border-radius: 50%;
              margin-right: 10px;
            }

            .hero-name {
              font-weight: bold;
            }
          }
        }
      }
    }

    .marveltext,
    .dctext {
      font-size: 32px;
      text-align: center;
      background-color: rgb(0, 0, 0, 0.2);
      border-radius: 15%;
      color: white;
      width: 25%;
      padding: 50px;
      margin: 40px auto;
    }

    .dctext {}
  }


}

body {
  background: #000000;
}

.fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  &.show {
    opacity: 1;
  }
}
</style>
