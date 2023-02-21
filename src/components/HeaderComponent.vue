<template>
  <Transition name="scroll">
    <nav class="navbar bg-white nav-position" v-show="showNav" :class="{ 'nav-block': $route.name != 'home' }">

      <div class="container-lg menu-box">


        <router-link to="/" class="navbar-brand">
          <img src="/img/dish-drop-rb-01.png" alt="logo" width="80" height="80" />
        </router-link>


        <div class="menu-link">
          <router-link to="/restaurants"><span>Tutti i Ristoranti</span></router-link>
          <router-link to="/contact"><span>Contatti</span></router-link>
          <a href="http://127.0.0.1:8000/" target="_blank"><span>Sei un Ristoratore?</span></a>
          <button class="my-cart" @click="showCart">
            <span class="dot" v-show="store.cart.length >= 1">{{ getTotalItem }}</span>
            <i class="fa-solid fa-cart-shopping"></i>
          </button>

        </div>

        <div class="navbar-menu dropdown-link" :class="{ 'open': showDropDown }">
          <div>
            <router-link to="/restaurants"><span>Tutti i Ristoranti</span></router-link>
            <router-link to="/contact"><span>Contatti</span></router-link>
            <a href="http://127.0.0.1:8000/" target="_blank"><span>Sei un Ristoratore?</span></a>
          </div>
        </div>

        <div class="hamburger">
          <i class="fa-solid fa-bars fs-5" @click="menuToggle"></i>
          <button class="my-cart" @click="showCart"><span class="dot" v-show="store.cart.length >= 1">{{getTotalItem }}</span><i
              class="fa-solid fa-cart-shopping"></i></button>
        </div>

      </div>

    </nav>
</Transition>
</template>

<script>
import Swal from 'sweetalert2';
import { store } from '../store';
import CartComponent from './CartComponent.vue';

export default {
  name: "HeaderComponent",
  data() {
    return {
      showNav: false,
      showDropDown: false,
      store,
    };
  },
  mounted() {
    store.cart = this.getAllCart;
    if (this.$route.name === "home") {
      window.addEventListener("scroll", this.handleScroll);
    }
    else {
      this.showNav = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    getTotalItem() {
      let total = 0
      for (let i = 0; i < store.cart.length; i++) {
          total += store.cart[i].quantity
      }
      return total
    },
  
    getAllCart() {
      let storage = JSON.parse(localStorage.getItem('cart')) || [];
      return storage;
    },
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 250) {
        this.showNav = true;
      }
      else {
        this.showNav = false;
      }
    },
    menuToggle() {
      this.showDropDown = !this.showDropDown;
    },
    showCart() {
      if (window.innerWidth <= 1199 && (this.$route.name == 'menu' || this.$route.name == 'check-out')) {
        this.store.cartShow = !this.store.cartShow;
        return;
      }


      if (this.$route.name != 'menu' && this.$route.name != 'check-out' && localStorage.getItem('cart') &&  !JSON.parse(localStorage.getItem('cart')).length || !localStorage.getItem('cart')) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Il carrello e vuoto',
          showConfirmButton: false,
          timer: 1500
        });
        return;


      }

      if (this.$route.name != 'menu' && this.$route.name != 'check-out' && localStorage.getItem('cart') &&  JSON.parse(localStorage.getItem('cart')).length) {
        const restaurantSlug = localStorage.getItem('restaurantSlug');
        this.$router.push({ name: 'check-out', params: { slug : restaurantSlug} });
        return;
      }
    }

  },
  components: { CartComponent }
}
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/__variables.scss" as *;

.scroll-enter-active,
.scroll-leave-active {
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.scroll-enter-from,
.scroll-leave-to {
  transform: translateY(-100%);
}


.nav-position {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;


  .menu-box {


    .menu-link,
    .dropdown-link {

      font-weight: $font-w-md;

      a:hover {
        color: $black;
      }

      a span {

        position: relative;
        padding: 10px;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: $black;
          transition: all 0.6s cubic-bezier(.215, .61, .355, 1);
        }


        &:hover {
          &::after {
            width: 100%;
          }
        }


      }


    }

  }

  .dropdown-link {
    display: none;
  }

  .hamburger {
    display: none;
  }


  .menu-link button,
  .hamburger button {

    margin-left: 16px;
    background-color: transparent;
    border: 0;
    color: $orange;
    position: relative;


    .dot {
      display: block;
      width: 23px;
      height: 23px;
      background-color: $red;
      border-radius: 50%;
      position: absolute;
      top: -12px;
      right: -7px;
      font-weight: bolder;
    }

  }


}
.fa-solid.fa-cart-shopping{
  font-size: 26px;
}
.nav-block {
  position: sticky;
}



@media (max-width: 768px) {

  .nav-position {


    .menu-box {


      .menu-link {
        display: none;
      }

      .dropdown-link {

        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transform: translateY(98%);
        background-color: $white;
        text-align: center;
        transition: all 1s cubic-bezier(.215, .61, .355, 1);

        div {
          padding: 18px 0;


          a {
            display: block;
            margin-bottom: 6px;
          }

        }
      }

      .open {
        max-height: 200px;
      }

      .hamburger {
        display: block;
        cursor: pointer;
      }

    }

  }
}


.my-cart{
  transition: 0.5s;
  &:hover{
    animation: tilt-shaking 0.2s ease 0s 5;

}
}

@keyframes tilt-shaking {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
  }
</style>
