<template>
    <div class="hero-container">
        <!-- Affichage des détails du héros ici -->
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            hero: null
        };
    },
    created() {
        this.fetchHeroData();
    },
    methods: {
        async fetchHeroData() {
            const id = this.$route.params.id;
            // Utilisez `id` pour faire votre appel API et assignez les données à `hero`
        }
    }
}
</script>
  