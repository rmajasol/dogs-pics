<template>
    <div class="list-container">
        <div class="pagination">
            <b-pagination
                v-if="picsPage && picsPage.length > 0"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
        <b-container fluid class="list">
            <b-img class="picture"
                v-for="picture in picsPage"
                v-bind:key="picture"
                thumbnail
                rounded
                fluid
                :src="picture"></b-img>
        </b-container>
        <div class="pagination">
            <b-pagination
                v-if="picsPage && picsPage.length > 0"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
            ></b-pagination>
        </div>
  </div>

</template>

<script>
import constants from "@/constants"

export default {
    name: 'BreedPics',
    props: {
        breed: String,
        subBreed: String,
        perPage: Number
    },
    data () {
        return {
            picsList: null,
            picsPage: null,
            error: null,
            currentPage: Number,
            totalRows: Number
        }
    },
    created: function () {
        this.getPicsList();
        this.currentPage = 1;
    },
    methods: {
        getPicsList: function () {
            this.currentPage = 1;
            var breedStr = this.subBreed ? `${this.breed}/${this.subBreed}` : this.breed;
            this.axios.get(`${constants.API_URL}breed/${breedStr}/images`).then(function (response) {
                this.picsList = response.data.message;
                this.totalRows = this.picsList.length;
                this.updatePage();
            }.bind(this)).catch(function (error) {
                this.error = error;
            }.bind(this));
        },
        updatePage: function () {
            var sliceStart = (this.currentPage-1) * this.perPage;
            var sliceEnd = sliceStart + this.perPage;
            this.picsPage = this.picsList.slice(sliceStart, sliceEnd);
        }
    },
    watch: {
        breed: function() {
            this.getPicsList();
        },
        subBreed: function() {
            this.getPicsList();
        },
        currentPage: function () {
            this.updatePage();
        }
    }
}
</script>

<style>
.list {
    margin: 2rem;
}
.list-container {
    margin-top: 1rem;
}
.picture {
    margin: .2rem;
}
.pagination {
    text-align: center;
}
</style>
