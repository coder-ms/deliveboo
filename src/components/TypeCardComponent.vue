<template>
  <h2>Cosa Mangiamo oggi ?</h2>
  <p>Beh se la scelta non è ovvia questa e la selezione delle pietanze più ordinate dalla community di FoodLover come
    te!</p>
  <div v-if="types.length">
    <TransitionGroup name="list" tag="ul"  class=" row g-3">
    <div v-for="(item, i) in filteredTypes" :key="item.id" class="col-12 col-md-6 col-lg-4">
      <router-link :to="{ name: 'restaurants', query: { type: item.slug } }">
        <div class="card my-cards">
          <div class="img-typebox">

            <img class="img-type" :src="`http://127.0.0.1:8000/storage/${item.image}`" :alt="item.name" />
          </div>
          <div class="card-body triangolo">

          </div>
          <div>
            <h5 class="type-title">{{ item.name == 'pizzeria' ? 'pizza' : item.name }}</h5>
          </div>
        </div>
      </router-link>
    </div>
  </TransitionGroup>
  </div>

  <div class="bottone my-5">
    <button class="button-more" role="button" @click="showAll">{{
      showAllTypes? "Mostra Meno": "Mostra di più"
    }}</button>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      types: [],
      showAllTypes: false,
    };
  },
  computed: {
    filteredTypes() {
      return this.showAllTypes ? this.types : this.types.slice(0, 6);
    },
  },

  mounted() {
    axios.get("http://127.0.0.1:8000/api/types").then((response) => {
      // console.log(response.data.types);
      this.types = response.data.types;
    });
  },
  methods: {
    showAll() {
      this.showAllTypes = !this.showAllTypes;
    },
  }
};
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

.my-cards {
  position: relative;
  overflow: hidden;

  &:hover .triangolo {
    opacity: 1;
  }

  .img-typebox {
    width: 100%;
    height: 186px;



    .img-type {

      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;

    }
  }

  .triangolo {
    @include triangolo(192px, 200px);

  }

  .type-title {
    color: white;
    position: absolute;
    top: 10px;
    left: 10px;
    text-transform: capitalize;
  }
}

.bottone {
  text-align: center;
}

/* CSS */
.button-more {
  background-color: $red;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px;
  color: $white;
  cursor: pointer;
  display: inline-block;
  padding: 12px 28px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: $font-sl;
  font-weight: $font-w-lg;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-more:hover {
  box-shadow: rgba(44, 187, 99, .35) 0 -25px 18px -14px inset, rgba(44, 187, 99, .25) 0 1px 2px, rgba(44, 187, 99, .25) 0 2px 4px, rgba(44, 187, 99, .25) 0 4px 8px, rgba(44, 187, 99, .25) 0 8px 16px, rgba(44, 187, 99, .25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
