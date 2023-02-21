<template>
    <div class="container-sm mb-4">
        <h2>Cibo a domicilio per veri FoodLovers</h2>
        <p>Voglia di pizza o hamburger? Oppure oggi sei da cucina fusion? Essere food lovers vuol dire sperimentare
            sapori
            nuovi ogni giorno ! Ricevi il cibo a domicilio più adatto alla tua giornata !</p>
    </div>
    <div class="container-sm">
        <div class="row gy-4 g-md-3">
            <div v-for="(image, index) in pathHomeImg" :key="index" class="col-12 col-lg-6 my-info">
                <div class="col-container">
                    <img class="info-img" :src="image.img" alt="">
                    <div class="triangolo">

                    </div>
                    <div class="info-info">
                        <h3>{{ image.title }}</h3>
                        <p>{{ image.desc }}</p>
                    </div>
                </div>
            </div>


        </div>
    </div>




</template>

<script>

import { pathHomeImg } from '../data/data';
export default {
    data() {
        return {
            pathHomeImg: pathHomeImg,
        }
    },

}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_mixins' as *;
@use '../assets/styles/partials/_variables' as *;

h2 {
    color: $red;
    font-weight: $font-w-lg;
}

p {
    font-weight: $font-w-md;
}

.my-info {

    &:hover .triangolo {
        opacity: 1;
    }

    .col-container {

        overflow: hidden;
        position: relative;


        img {
            width: 100%;
            display: block;
            object-fit: cover;
        }

    }

    // .info-img {
    //     max-width: fit-content;
    //     width: 670px;
    //     height: 425px;
    //     object-fit: cover
    // }

    .triangolo {

        @include triangolo(425px, 540px);
        top: 0;
        left: 0;

    }

    .info-info {
        position: absolute;
        top: 10px;
        left: 10px;
        color: $white;
        width: 300px;
        text-shadow: 2px 2px $black ;
    }
}
</style>