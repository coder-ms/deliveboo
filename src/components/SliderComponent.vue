
<template>
    <swiper :modules="modules" :slides-per-view="1" :space-between="10" :breakpoints="{
        '425': {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        '768': {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        '1024': {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        '1400': {
            slidesPerView: 5,
            spaceBetween: 20,
        },
    }" navigation @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide :class="{ 'active': Object.keys($route.query).length == 0 || $route.query.type == '' }">
            <div class="slide-image" @click="resetType()">
                <img src="/img/dd-slide.png" alt="alltype">
                <div class="slide-type">
                    <h6>Guarda tutti i ristoranti</h6>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide v-for="(type, i) in  types"
            :class="{ 'active': $route.query.type && $route.query.type.split('+').includes(type.slug) }">
            <div class="slide-image" @click="getRestaurantbyTypes(type.slug)">
                <div v-if="type.image"><img :src="`${imgUrl}${type.image}`" alt=""></div>
                <div class="slide-type">
                    <h6>{{ type.name }}</h6>
                </div>
            </div>

        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { store } from '../store';
import axios from 'axios';
import { Navigation } from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';


export default {

    name: 'SliderComponent',

    components: {
        Swiper,
        SwiperSlide,
    },

    props: ['types', 'imgUrl'],

    data() {
        return {
            store,
        }
    },


    setup() {
        const onSwiper = (swiper) => {
            // console.log(swiper);
        };
        const onSlideChange = () => {
            // console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation],
        };
    },
    methods: {
        getRestaurantbyTypes(slug) {

            if (this.$route.query.type) {

                const slugArray = this.$route.query.type.split('+');

                if (!slugArray.includes(slug)) {

                    const fullSlag = this.$route.query.type + '+' + slug;

                    this.$router.push({ path: this.$route.path, query: { type: fullSlag } });
                } else {

                    slugArray.splice(slugArray.indexOf(slug), 1);
                    const fullSlag = slugArray.join('+');
                    this.$router.push({ path: this.$route.path, query: { type: fullSlag } });

                }


            } else {

                this.$router.push({ path: this.$route.path, query: { type: slug } });

            }


            console.log(this.$route.query);

            // if (!store.data.params.typeFilter.includes(id)) {

            //     store.data.params.typeFilter.push(id);
            // } else {
            //     store.data.params.typeFilter.splice(store.data.params.typeFilter.indexOf(id), 1);
            // }
        },

        resetType() {
            this.$router.push({ path: this.$route.path });

        }
    },


}




</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;


.swiper {

    padding: 4px 4px;

    .swiper-slide {
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
        opacity: 0.6;
        border: 3px solid transparent;
        outline: 3px solid transparent;
        transition: all 0.4s cubic-bezier(.215, .61, .355, 1);


        &:hover {
            outline: 3px solid $red;
        }

        .slide-image {
            height: 134px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }


            .slide-type {
                background-color: rgba(255, 255, 255, 0.6);
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;

                h6 {
                    padding: 4px 6px;
                    margin: 0;
                    text-transform: capitalize;
                    font-weight: $font-w-md;
                    margin-left: 12px;
                }
            }
        }

    }

    .active {
        opacity: 1;
    }

}
</style>