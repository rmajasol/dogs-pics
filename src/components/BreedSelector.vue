<template>
    
</template>

<script>
import constants from "@/constants"

export default {
    name: 'BreedSelector',
    data () {
        return {
            selectedBreed: null,
            loading: true,
            error: null
        }
    },
    created: function () {
        this.axios.get(`${constants.API_URL}breeds/list/all`).then(function (response) {
            this.breeds = response;
        }).catch(function (error) {
            this.error = error;
        }).finally(function () {
            this.loading = false;
        })
    },
    watch: {
        selectedBreed: function () {
            this.$emit("selectedBreed", this.selectedBreed);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
