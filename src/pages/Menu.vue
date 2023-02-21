<template>
  <div id="box-primary">
    <HeaderComponent></HeaderComponent>
    <RedComponent></RedComponent>
    <div class="container py-3" v-if="menu">
      <div class="d-flex flex-wrap justify-content-between">

        <div class="menu">

          <div>
            <div class="d-flex align-items-center box-info">
              <div class="restaurant-img-box col-4 p-2">
                <img :src="`${store.imagBasePath}${menu.image}`" :alt="menu.name" />
              </div>
              <div class="ms-3">
                <h4>{{ menu.name }}</h4>
                <span v-for="(tipo, index) in menu.types" class="text-capitalize">
                  {{ index<menu.types.length - 1 ? tipo.name + ", " : tipo.name }} </span>
                    <div v-if="isIntervalActive()">
                      <span class="text-success"><i class="fa-solid fa-circle text-success"> </i>Ristorante
                        aperto</span>
                    </div>
                    <div v-else>
                      <span class="text-danger"><i class="fa-solid fa-circle text-danger"> </i> Ristorante chiuso apre
                        alle {{ menu.opening_hours.slice(0, 5) }},
                        preordina</span>
                    </div>
              </div>
            </div>
            <div class="row g-3 mt-3">
              <div v-for="(dish, i) in menu.dishes" class="col-12 col-lg-6 my-card" :key="i">
                <div class="inner-card d-flex">
                  <div class="img-box col-5">
                    <img v-if="dish.image" :src="`${store.imagBasePath}${dish.image}`" alt="">
                    <img v-else src="/img/dd-slide.png" alt="">
                    <div class="price">{{ dish.price }} &nbsp;&euro; </div>
                  </div>
                  <div class="dish-info px-3 pt-2 col-7">
                    <div class="fw-bold mb-1 text-capitalize">{{ dish.name }}</div>
                    <div class="fst-italic">{{ dish.ingredients }}</div>
                  </div>
                  <button :disabled="vueLocalStorage.includes(dish.slug)"
                    :class="{ 'color-red': vueLocalStorage.includes(dish.slug) }"
                    @click="tryAddToCart(dish, menu.slug)"><i class="fa-solid fa-cart-shopping"></i></button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="cart-box">
          <CartComponent />
        </div>

        <!-- <div v-for="(category, i) in categories" :key="i">
                                                          <div v-if="restaurantCategories.includes(category.name)">
                                                            <h2 class="title" >{{ category.name }}</h2>
                                                            <div class="d-flex flex-wrap">
                                                              <div  v-for="(dish,j) in menu.dishes" :key="j" class="col-12 col-md-6 col-lg-4">
                                                                <div class="my-card " v-if="category.name == dish.category.name" >{{ dish.name }} </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div> -->
        <!-- <div v-for="(item, i) in restaurantMenu" :key="i">
                                                          <h2 class="title" >{{ item.category }}</h2>
                                                          <div class="d-flex flex-wrap">
                                                            <div  v-for="(dish,j) in item.dishes" :key="j" class="col-12 col-md-6 col-lg-4">
                                                              {{ dish.name }}
                                                            </div>
                                                          </div>
                                                        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import RedComponent from "../components/RedComponent.vue";
import axios from "axios";
import { store } from "../store";
import Swal from 'sweetalert2';
import CartComponent from "../components/CartComponent.vue";

export default {
  name: "Menu",
  components: { HeaderComponent, RedComponent, CartComponent },
  data() {
    return {
      store,
      menu: null,
      categories: [],
      restaurantCategories: [],
      restaurantMenu: null,
      vueLocalStorage: []
    };
  },
  watch: {
    'store.cart': {
      handler() {
        this.getStorageKeys()
      },
      deep: true
    }
  },
  mounted() {
    this.getDishes();
    store.cart = this.getAllCart
    this.getStorageKeys()
    this.getCategories();
  },
  computed: {
    getAllCart() {
      let storage = JSON.parse(localStorage.getItem('cart')) || [];
      return storage;
    },

  },
  methods: {
    getDishes() {
      axios
        .get(`${this.store.apiBaseUrl}/restaurants/${this.$route.params.slug}`)
        .then((response) => {
          // console.log(response.data.results);
          if (response.data.success) {
            this.menu = response.data.results;

            // console.log(this.menu)
            // const restaurantMenu = [];
            // const item = {
            //     category : '',
            //     dishes : []
            //   }
            // for(let i = 0; i<this.menu.dishes.length ; i++){
            //   if(i == 0){
            //     item.category = this.menu.dishes[i].category.name
            //   }

            //   if(item.category == this.menu.dishes[i].category.name){
            //     item.dishes.push(this.menu.dishes[i])
            //   }else{
            //     restaurantMenu.push(item)
            //     item.category = this.menu.dishes[i].category.name
            //     item.dishes = []
            //   }
            // }
            // this.restaurantMenu = restaurantMenu
          } else {
            this.$router.push({ name: "notfound" });
          }
        });
    },
    getCategories() {
      axios
        .get(`${this.store.apiBaseUrl}/categories`)
        .then((response) => {
          // console.log(response.data.categories);
          if (response.data.success) {
            this.categories = response.data.categories;
          } else {
            this.$router.push({ name: "notfound" });
          }
        });
    },
    isIntervalActive() {
      if (!this.menu || !this.menu.opening_hours || !this.menu.closing_hours) {
        return false;
      }
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHours + currentMinutes / 60;
      const openingTime = parseInt(this.menu.opening_hours.split(":")[0]) + parseInt(this.menu.opening_hours.split(":")[1]) / 60;
      const closingTime = parseInt(this.menu.closing_hours.split(":")[0]) + parseInt(this.menu.closing_hours.split(":")[1]) / 60;
      return currentTime >= openingTime && currentTime <= closingTime;
    },
    tryAddToCart(dish, restaurantSlug) {
      // console.log(restaurantSlug)
      const isNotEmpty = !!localStorage.getItem('cart') && !!JSON.parse(localStorage.getItem('cart')).length
      if (isNotEmpty) {
        const restaurantId = JSON.parse(localStorage.getItem('cart'))[0].restaurant_id;
        if (dish.restaurant_id != restaurantId) {
          this.sendError()
          return
        } else {
          this.addToCart(dish, restaurantSlug)
          return
        }
      }
      this.addToCart(dish, restaurantSlug)
    },
    addToCart(dish, restaurantSlug) {

      localStorage.setItem('restaurantSlug', restaurantSlug);

      dish.quantity = 1
      store.cart.push(dish)
      if (localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(dish);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      else {
        const cart = [];
        cart.push(dish);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Il piatto è stato aggiunto all\'ordine',
        showConfirmButton: false,
        timer: 1500
      });
    },
    sendError() {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Non puoi ordinare da due ristoranti diversi',
        showConfirmButton: false,
        timer: 2000
      });
    },
    getStorageKeys() {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.vueLocalStorage = [];
      if (cart && cart.length) {
        for (let i = 0; i < cart.length; i++) {
          this.vueLocalStorage.push(cart[i].slug);
        }

      }
    },



  },
};
</script>

<style lang="scss">
@use '../assets/styles/partials/_variables' as *;

.menu {
  width: 65%;
  display: flex;
  align-items: flex-start;

  .box-info {
    border: 1px solid rgba(99, 98, 98, 0.346);
    border-radius: 10px;
  }



}

.cart-box {
  width: 35%;
}

.title {
  text-transform: capitalize;
}

.my-card {
  // padding: 1rem;

  .color-red {
    color: $red !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  .inner-card {
    padding: 0.7rem;
    position: relative;
    background-color: $white;
    border-radius: 6px;
    cursor: pointer;
    height: 158px;
    -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);


    &:hover button {
      cursor: pointer;
      visibility: visible;
      opacity: 1;
    }

    &:hover .dish-info::-webkit-scrollbar {
      display: block;
    }

    &:hover .img-box img {
      transform: scale(1.1);
    }

    .img-box {
      // width: 140px;
      height: 136px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: all 1s cubic-bezier(.215, .61, .355, 1);
      }

      .price {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 75px;
        text-align: center;
        padding: 3px 3px;
        background-color: $red;
        color: $white;
        font-weight: $font-w-md;
      }

    }

    .dish-info {
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
        width: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $red;
        border-radius: 30px;
      }

      &::-webkit-scrollbar-track {
        background-color: $border-grey;
        border-radius: 30px;
      }



    }



    button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: 0;
      background-color: $orange;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      font-size: 1.2rem;
      color: $white;
      visibility: hidden;
      opacity: 0;
      transition: all 0.4s cubic-bezier(.215, .61, .355, 1);
    }

  }
}


@media (max-width: 1199px) {


  #box-primary {

    position: relative;
    height: 100%;

    .menu {
      width: 100%;
      display: block !important;
    }

  }

}


@media (max-width: 576px) {
  #box-primary {
    .menu {
      .my-card {
        .inner-card {
          button {
            height: 38px;
            width: 38px;
            opacity: 1!important;
            visibility: visible;
            font-size: 1rem;

          }
        }
      }
    }

  }

}
</style>
