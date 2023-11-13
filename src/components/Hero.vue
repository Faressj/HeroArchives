<template>
    <div v-if="hero" class="hero-container">
        <!-- <img :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" class="hero-thumbnail" /> -->
        <div class="firstpart">
            <h1>{{ hero.name }}</h1>
            <p>Description:<br /> {{ hero.description || 'No description available' }}</p>
            <div class="lastmodified">
                <p>Last Modified: {{ hero.modified }}</p>

            </div>
        </div>

        <div class="parallax-container">
            <div v-if="hero.comics && hero.comics.items.length" class="comics">
                <h2>Comics:</h2>
                <div class="beforeslider">
                    <div class="comics-slider">
                        <splide ref="splideRef" class="all-comics" :options="splideOptions">
                            <splide-slide class="comic-container" v-for="(comic, index) in hero.comics.items"
                                :key="comic.resourceURI">
                                <div class="comic-name">
                                    {{ comic.name }}
                                </div>
                                <div v-if="comic.details" class="comic-thumbnail">
                                    <img :src="comic.details.thumbnail.path + '.' + comic.details.thumbnail.extension" />
                                </div>
                                <div v-if="comic.details" class="comic-details">
                                    <p>{{ comic.details.description }}</p>
                                </div>
                            </splide-slide>
                        </splide>
                    </div>
                    <div class="comicstext">
                        Step into the enthralling universe of {{ hero.name }}] through their Marvel comics. These comic
                        books
                        take you on a journey through rich and captivating stories, where each page unveils a new aspect of
                        this
                        iconic character. From their heroic beginnings to epic confrontations, dive into a world where
                        action,
                        drama, and adventure intertwine to create memorable tales. Follow {{ hero.name }} in their struggles
                        against evil, unexpected alliances, and uncover the stories that have shaped their destiny in the
                        Marvel
                        universe.
                    </div>
                </div>
            </div>

            <div v-if="hero.series && hero.series.items.length" class="series">
                <h2>Series:</h2>
                <div class="beforeslider">
                    <div class="seriestext">
                        Explore the Marvel series dedicated to {{ hero.name }}, where each episode is an engaging adventure.
                        These series reveal the multiple dimensions of [Character Name], from their inner conflicts to their
                        spectacular triumphs. Discover how {{ hero.name }} interacts with other iconic figures of the Marvel
                        universe, faces formidable adversaries, and evolves through deeply human and inspiring narratives.
                        Each
                        series offers a unique immersion into the world of {{ hero.name }}, inviting you to experience their
                        greatest challenges and most shining victories.
                    </div>
                    <div class="series-slider">
                        <splide class="all-series" :options="splideOptions">
                            <splide-slide class="serie-container" v-for="(serie, index) in hero.series.items"
                                :key="serie.resourceURI">
                                <div class="serie-name">
                                    {{ serie.name }}
                                </div>
                                <div v-if="serie.details" class="serie-thumbnail">
                                    <img :src="serie.details.thumbnail.path + '.' + serie.details.thumbnail.extension" />
                                </div>
                                <div v-if="serie.details" class="serie-details">
                                    <p>{{ serie.details.description }}</p>
                                </div>
                            </splide-slide>
                        </splide>
                    </div>
                </div>

            </div>

            <div v-if="hero.stories && hero.stories.items.length" class="stories">
                <h2>Stories:</h2>
                <div class="beforeslider">
                    <div class="stories-slider">
                        <splide class="all-stories" :options="splideOptions">
                            <splide-slide class="story-container" v-for="(story, index) in hero.stories.items"
                                :key="story.resourceURI">
                                <div class="story-name">
                                    {{ story.name }}
                                </div>
                                <div v-if="story.details" class="story-thumbnail">
                                    <img :src="story.details.thumbnail.path + '.' + story.details.thumbnail.extension" />
                                </div>
                                <div v-if="story.details" class="story-details">
                                    <p>{{ story.details.description }}</p>
                                </div>
                            </splide-slide>
                        </splide>
                    </div>
                    <div class="storiestext">
                        Immerse yourself in the Marvel stories of {{ hero.name }}, where each narrative brings a new
                        perspective on this legendary hero. These stories highlight the key moments in the life of {{
                            hero.name
                        }}, offering a deeper understanding of their personality, motivations, and actions. From intimate
                        interactions with other characters to battles for safeguarding the universe, each story is a window
                        into
                        the lesser-known and most fascinating aspects of {{ hero.name }}.
                    </div>
                </div>
            </div>

            <div v-if="hero.events && hero.events.items.length" class="events">
                <h2>Events:</h2>
                <div class="beforeslider">
                    <div class="eventstext">
                        Engage in the major Marvel events that have marked the career of {{ hero.name }}. These events,
                        often
                        on a grand scale, reveal the crucial role played by {{ hero.name }} in decisive moments of the
                        Marvel
                        universe. From cosmic battles to heroic alliances, these events underscore the importance and impact
                        of
                        {{ hero.name }} in the balance between good and evil. Each event is an epic adventure, showcasing
                        the
                        bravery, ingenuity, and dedication of [Character Name] in facing the most extreme challenges.
                    </div>
                    <div class="events-slider">
                        <splide class="all-events" :options="splideOptions">
                            <splide-slide class="event-container" v-for="(event, index) in hero.events.items"
                                :key="event.resourceURI">
                                <div class="event-name">
                                    {{ event.name }}
                                </div>
                                <div v-if="event.details" class="event-thumbnail">
                                    <img :src="event.details.thumbnail.path + '.' + event.details.thumbnail.extension" />
                                </div>
                                <div v-if="event.details" class="event-details">
                                    <p>{{ event.details.description }}</p>
                                </div>
                            </splide-slide>
                        </splide>
                    </div>
                </div>

            </div>
        </div>
        <div v-if="hero.urls && hero.urls.length" class="external-links">
            <h2>More on:</h2>
            <ul>
                <li v-for="url in hero.urls" :key="url.url">
                    <a :href="url.url" target="_blank">{{ url.type }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
  
  
<script>
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
    components: {
        Splide,
        SplideSlide

    },
    data() {
        return {
            hero: null,
            currentComicIndex: 0,
            currentStoryIndex: 0,
            currentSerieIndex: 0,
            currentEventIndex: 0,
            splideOptions: {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '30px',
                autoplay: true,
            },
        };
    },
    watch: {
        '$route.params.id': {
            immediate: true,
            handler(newId) {
                this.fetchHeroData(newId);
            }
        },
    },
    computed: {
        backgroundImageUrl() {
            return this.hero && this.hero.thumbnail
                ? `url(${this.hero.thumbnail.path}.${this.hero.thumbnail.extension})`
                : '';
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        handleScroll() {
            const firstPart = document.querySelector('.firstpart');
            const scrollDistance = window.pageYOffset;
            firstPart.style.transform = `translateY(${scrollDistance * 0.5}px)`;
        },
        async loadInitialData() {
            if (this.hero.comics && this.hero.comics.items.length > 0) {
                await this.loadComics(0, 3);
            }
            if (this.hero.series && this.hero.series.items.length > 0) {
                await this.loadSeries(0, 3);
            }
            if (this.hero.stories && this.hero.stories.items.length > 0) {
                await this.loadStories(0, 3);
            }
            if (this.hero.events && this.hero.events.items.length > 0) {
                await this.loadEvents(0, 3);
            }
        },

        async loadAdditionalData() {
            if (this.hero.comics && this.hero.comics.items.length > 3) {
                await this.loadComics(3, this.hero.comics.items.length);
            }
            if (this.hero.series && this.hero.series.items.length > 3) {
                await this.loadSeries(3, this.hero.series.items.length);
            }
            if (this.hero.stories && this.hero.stories.items.length > 3) {
                await this.loadStories(3, this.hero.stories.items.length);
            }
            if (this.hero.events && this.hero.events.items.length > 3) {
                await this.loadEvents(3, this.hero.events.items.length);
            }
        },

        async loadComics(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                let comic = this.hero.comics.items[i];
                if (comic) {
                    const comicId = comic.resourceURI.split('/').pop();
                    const response = await axios.get(`http://localhost:3001/comic/${comicId}`);
                    this.hero.comics.items[i] = {
                        ...comic,
                        details: response.data.data.results[0]
                    };
                }
            }
        },
        async loadSeries(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                let serie = this.hero.series.items[i];
                if (serie) {
                    const serieId = serie.resourceURI.split('/').pop();
                    const response = await axios.get(`http://localhost:3001/serie/${serieId}`);
                    this.hero.series.items[i] = {
                        ...serie,
                        details: response.data.data.results[0]
                    };
                }
            }
        },
        async loadStories(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                let story = this.hero.stories.items[i];
                if (story) {
                    const storyId = story.resourceURI.split('/').pop();
                    const response = await axios.get(`http://localhost:3001/story/${storyId}`);
                    this.hero.stories.items[i] = {
                        ...story,
                        details: response.data.data.results[0]
                    };
                }
            }
        },
        async loadEvents(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                let event = this.hero.events.items[i];
                if (event) {
                    const eventId = event.resourceURI.split('/').pop();
                    const response = await axios.get(`http://localhost:3001/event/${eventId}`);
                    this.hero.events.items[i] = {
                        ...event,
                        details: response.data.data.results[0]
                    };
                }
            }
        },
        async fetchHeroData(id) {
            console.log("appel api");
            console.log('Fetching data for hero:', id);
            try {
                const response = await axios.get(`http://localhost:3001/hero/${id}`);
                this.hero = response.data.data.results[0];

                this.loadInitialData();

                this.loadAdditionalData();

            } catch (error) {
                console.error(error);
            }
        },
    }
}

</script>

<style lang="scss" scoped>
.hero-container {

    height: 100vh;
    position: relative;
    top: 0;
    width: 100%;

    .firstpart {
        background-image: linear-gradient(to bottom, rgb(255, 255, 255, 0.01), rgb(0, 0, 0, 1)),
            v-bind(backgroundImageUrl);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        position: relative;
        top: 0;
        height: 100%;
        font-size: 32px;
        display: grid;
        width: 100%;
        background-attachment: fixed;
        h1{
            border-radius: 50px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.2);
            color: white;
            width: 20%;
            height: 20%;
        }

        p {
            height: 100%;
            width: 50%;
            text-align: center;
            margin: auto;
            padding: 20px;
            color: bisque;
            border-radius: 50px 50px 0 0;
            background-color: rgba(0, 0, 0, 0.2);
        }

        .lastmodified {
            position: absolute;
            font-size: 22px;
            right: 0;
            bottom: 0;
        }
    }

    .parallax-container {
        background-color: black;
        z-index: 1;
        position: relative;


        .comics,
        .series,
        .stories,
        .events {
            display: flex;
            flex-direction: column; //
            margin-top: 100px;

            h2 {
                color: white;
                font-size: 40px;
            }


            .beforeslider {
                display: flex;
                width: 100%;

                .comicstext,
                .seriestext,
                .storiestext,
                .eventstext {
                    flex: 1;
                    width: 50%;
                    color: white;
                    font-size: 32px;
                    margin: 20px;
                    text-align: center;
                }

                .comics-slider,
                .series-slider,
                .stories-slider,
                .events-slider {
                    width: 60%;

                    .all-comics,
                    .all-series,
                    .all-stories,
                    .all-events {

                        .comic-container,
                        .serie-container,
                        .story-container,
                        .event-container {
                            max-width: 250px;

                            .comic-name,
                            .serie-name,
                            .story-name,
                            .event-name {
                                max-width: 150px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                background: linear-gradient(to right, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0));
                            }

                            .comic-details,
                            .serie-details,
                            .story-details,
                            .event-details {
                                display: none;
                                position: absolute;
                                background-color: white;
                                padding: 10px;
                                border-radius: 5px;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                                z-index: 1;
                                max-height: 200px;
                                overflow-y: auto;
                                width: 200px;
                                top: 0;
                            }

                            &:hover .comic-details {
                                display: block;
                            }

                            &:hover .serie-details {
                                display: block;
                            }

                            &:hover .story-details {
                                display: block;
                            }

                            &:hover .event-details {
                                display: block;
                            }

                            img {
                                width: 200px;
                            }

                            p {
                                margin: 0;
                            }
                        }
                    }

                    .prevbutton {}

                    .nextbutton {}
                }

            }
        }
    }
    .external-links{
        color: white;
        font-size: 32px;
        ul{
            list-style: none;
            display: flex;
            gap: 20px;
            a{
                text-decoration: none;
                color: white;
            }
        }
    }
}
</style>
