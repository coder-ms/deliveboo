<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <div class="container-fluid">
            <div class="slider-box container-lg py-4">
                <SliderComponent :types="types" :imgUrl="store.imagBasePath"></SliderComponent>
            </div>
            <div class="cards-box container-lg py-4">
                <div v-if="restaurants.length" class="row g-3">
                    <RestaurantCardComponent v-for="(restaurant, i) in restaurants" :restaurant="restaurant" :types=types>
                    </RestaurantCardComponent>
                </div>
                <div v-else id="loader" class="container-loader loader">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import RestaurantCardComponent from '../components/RestaurantCardComponent.vue';
import { store } from '../store';
import SliderComponent from '../components/SliderComponent.vue';



export default {
    name: "Restaurants",
    components: { HeaderComponent, RestaurantCardComponent, SliderComponent },

    data() {
        return {
            restaurants: [],
            types: [],
            store,
        }
    },

    mounted() {
        setTimeout(this.getRestaurants, 2000);
        //this.getRestaurants();
        this.getRestaurantsTypes();
    },


    methods: {
        getRestaurants() {

            // this.$route.query.types.split('+')

            const data = {

                params: {
                    typeFilter: [],
                }

            }
            if (this.$route.query.type) {

                data.params.typeFilter = this.$route.query.type.split('+');

            }


            axios.get(this.store.apiBaseUrl + "/restaurants", data).then(response => {
                this.restaurants = response.data.results;
                // console.log(response.data.results);
            });
        },

        getRestaurantsTypes() {
            axios.get(this.store.apiBaseUrl + "/types").then(response => {
                this.types = response.data.types
                // console.log(response.data.types);
            });
        },


    },
    watch: {
        "store.data": {
            handler() {
                this.getRestaurants();
            },
            deep: true,
        },

        '$route': function () {
            this.getRestaurants();

        }
    }

}



</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_mixins' as *;
@use '../assets/styles/partials/_variables' as *;

div {
    .container-fluid {
        .cards-box {
            .container-loader {
                padding: 4rem 0 10rem 0;
                text-align: center;
                color: $red;
                font-size: 60px;
                margin: 30px 0;

                // .box-loading {
                //     animation: spin 1s linear infinite;
                // }

                // @keyframes spin {
                //     0% {
                //         transform: rotate(1turn);
                //     }

                //     90% {
                //         transform: rotate(90deg);
                //     }
                // }
            }
        }
    }
}

.loader {
    -webkit-perspective: 700px;
    perspective: 700px;
}

.loader>span {
    font-size: 130px;
    font-family: "franklin gothic medium", sans-serif;
    display: inline-block;
    animation: flip 2s infinite linear;
    transform-origin: 0 70%;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
}

@keyframes flip {
    35% {
        transform: rotateX(360deg);
    }

    100% {
        transform: rotatex(360deg);
    }
}


.loader>span:nth-child(even) {
    color: $orange;

}

.loader>span:nth-child(2) {
    animation-delay: 0.2s;
}

.loader>span:nth-child(3) {
    animation-delay: 0.5s;
}

.loader>span:nth-child(4) {
    animation-delay: 0.8s;
}

.loader>span:nth-child(5) {
    animation-delay: 1.1s;
}

.loader>span:nth-child(6) {
    animation-delay: 1.4s
}

.loader>span:nth-child(7) {
    animation-delay: 1.7s
}




@media (max-width: 768px) {

    #loader {
        span {
            font-size: 50px;
        }
    }

}
</style>