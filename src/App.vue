<template>
  <div id="app">
    <div class="bread-selector">
        <div class="bread">
            <h1>Select or write a dog breed to view pictures</h1>
            <b-form-select class="selector" v-if="breeds" v-model="selectedBreed" :options="breeds"></b-form-select>
            <b-form-input class="input" v-model="selectedBreed" placeholder="Enter a dog bread"></b-form-input>
        </div>
        <div v-if="selectedBreed && subBreeds && subBreeds.length > 0" class="block-sub-bread">
            <h2>Select sub-breed</h2>
            <b-form-select v-if="subBreeds" v-model="selectedSubBreed" :options="subBreeds"></b-form-select>
        </div>
    </div>

    <BreedPics v-if="selectedBreed"
        :breed="selectedBreed"
        :subBreed="selectedSubBreed"
        :perPage="20"></BreedPics>
  </div>
</template>

<script>
import BreedPics from './components/BreedPics.vue'
import constants from '@/constants'

export default {
    name: 'app',
    components: {
        BreedPics
    },
    data () {
        return {
            selectedBreed: null,
            selectedSubBreed: null,
            breeds: null,
            subBreeds: null,
            error: null
        }
    },
    created: function () {
        this.getBreeds();
    },
    methods: {
        getBreeds: function () {
            this.axios.get(`${constants.API_URL}breeds/list/all`).then(function (response) {
                var breedsObj = response.data.message;
                this.breeds = [];
                Object.keys(breedsObj).forEach(function(key) {
                    this.breeds.push({value: key, text: key});
                }.bind(this));
            }.bind(this)).catch(function (error) {
                this.error = error;
            }.bind(this));
        },
        getSubBreeds: function () {
            this.axios.get(`${constants.API_URL}breed/${this.selectedBreed}/list`).then(function (response) {
                this.subBreeds = response.data.message.map(function(item) {
                    return {value: item, text: item}
                });
            }.bind(this)).catch(function (error) {
                this.error = error;
            }.bind(this));
        },
    },
    watch: {
        selectedBreed: function() {
            this.getSubBreeds();
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 3rem 1rem;
}

.bread-selector {
    margin-bottom: 2rem;
    max-width: 50rem;
    margin: 0 auto;
}

.input {
    margin-top: 1rem;
}

</style>
