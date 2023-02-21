<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <RedComponent></RedComponent>

    <div class="container-monocard margin-negativo container-lg m-auto my-2 row g-0">
      <div class="card-riepilogo p-4 p-lg-1 d-xl-flex col-12 col-xl-8">
        <div class="card riepilogo-show p-4">
          <h3 class="text-bold text-center">Riepilogo ordine</h3>
          <div class="riepilogo-top row justify-content-center justify-content-lg-between g-0">
            <div class="info-restaurant col-12 col-lg-8 row gy-4 gx-2 mb-5 justify-content-sm-center">
              <div v-if="menu.image" class="col-12 col-sm-9 col-lg-4">
                <div class="restaurant-img">
                  <img :src="`${store.imagBasePath}${menu.image}`" :alt="menu.name" />
                </div>
              </div>
              <div class="col-12 col-sm-9 col-lg-8 d-flex justify-content-center align-items-center">
                <div>
                  <h4 class="">{{ menu.name }}</h4>
                  <p class=" text-uppercase">
                    Indirizzo :<br> {{ menu.address }}
                  </p>
                  <span v-if="isIntervalActive()">
                    <span class="text-success">Ristorante aperto</span>
                  </span>
                  <span v-else>
                    <span class="text-danger ms-2"> Ristorante chiuso , preordina</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="info-logo col-12 col-sm-9 col-lg-4 d-flex align-items-center justify-content-center">
              <div class="rider-img flex-shrink-0">
                <img src="/img/rider-icon.png" alt="" />
              </div>
              <div d-inline>
                <h3 class="px-2 text-uppercase">Dishdrop delivery</h3>
                <p class="px-2">I nostri raider sono più veloci di tutti</p>
              </div>
            </div>
          </div>
          <div class="riepilogo-down">
            <h3 class="py-2 text-bold my-3">Inserisci i tuoi dati </h3>
            <form class="col-12 text-start" id="order-form">
              <p class="mx-1 text-uppercase">Nome e cognome *</p>
              <div class="input mb-2">
                <input class="" type="text" name="name" id="name" placeholder="Nome e cognome"  maxlength="100" v-model="name" :class="{ 'is-invalid': errors.name }" :readonly="pay" required/>
                <p v-for="(error, index) in errors.name" :key="index" class="invalid-feedback">
                  {{ error }}
                </p>
              </div>
              <p class="mx-1 text-uppercase">E-mail *</p>
              <div class="input mb-2">
                <input class="" type="email" name="email" id="email" placeholder="E-mail"  maxlength="100" v-model="email" :class="{ 'is-invalid': errors.email }" :readonly="pay" required />
                <p v-for="(error, index) in errors.email" :key="index" class="invalid-feedback">
                  {{ error }}
                </p>
              </div>
              <p class="mx-1 text-uppercase">Indirizzo *</p>
              <div class="input mb-2">
                <input class="" type="text" name="address" id="address" placeholder="Indirizzo" maxlength="150"  v-model="address" :class="{ 'is-invalid': errors.address }" :readonly="pay" required />
                <p v-for="(error, index) in errors.address" :key="index" class="invalid-feedback">
                  {{ error }}
                </p>
              </div>
              <p class="mx-1 text-uppercase">Telefono *</p>
              <div class="input mb-5">
                <input class="" type="text" name="phoneNumber" id="phoneNumber" placeholder="Telefono"  maxlength="10" v-model="phoneNumber" :class="{ 'is-invalid': errors.phoneNumber }" :readonly="pay" required/>
                <p v-for="(error, index) in errors.phoneNumber" :key="index" class="invalid-feedback">
                  {{ error }}
                </p>
              </div>
              <!-- <a class="btn button credit-card mb-4" @click.prevent="purchase()">
                <i class="fa-solid fa-credit-card"></i> Carta di Credito</a> -->
                <button @click.prevent="validate()"  :disabled="store.loading"  class="validate-button">{{ pay ? 'Modifica i dati' : 'Procedi al pagamento'}}</button>
            </form>
            <Transition>
              <div v-if="pay" class="my-height">
                <h3 class="py-2 text-bold">Paga con Carta di Credito</h3>
                <PaymentComponent />
              </div>
            </Transition>
          </div>
        
        </div>
      </div>

      <div class="col-4 p-lg-1">
        <CartComponent />
      </div>
    </div>

  </div>
  <div class="container-monocard p-4 p-lg-1 container-lg m-auto  mb-4 d-flex justify-content-start">
    <div class="card card-help col-12 col-xl-8 p-3">
      <h3 class="py-2">Hai bisogno di un aiuto?</h3>
      <p>
        Per qualsiasi informazione puoi contattare il ristorante e il nostro
        servizio clienti
      </p>
      <div class="card-tel my-3 d-flex">
        <div class="icon me-2 text-center">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div class="info-tel">
          <p>Chiama {{ menu.name }} al <a :href="`tel:${menu.phone_number}`">+39{{ menu.phone_number }}</a> </p>
        </div>
      </div>
      <div class="card-email my-3 d-flex">
        <div class="icon me-2 text-center">
          <i class="fa-solid fa-envelope"></i>
        </div>
        <div class="info-email">
          <p>Invia una mail a <a :href="`mailto:${menu.email}`">{{ menu.name }}</a></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store";
import HeaderComponent from "../components/HeaderComponent.vue";
import RedComponent from "../components/RedComponent.vue";
import { Manipulation } from "swiper";
import CartComponent from "../components/CartComponent.vue";
import PaymentComponent from "../components/PaymentComponent.vue";
import Swal from 'sweetalert2';



export default {
  name: "CheckOutPage",
  components: { HeaderComponent, RedComponent, CartComponent, PaymentComponent },
  data() {
    return {
      store,
      menu: [],
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      errors: {},
      pay: false
    };
  },
  mounted() {
    this.getDishes();
  },
  computed: {

  },

  methods: {
    getDishes() {
      axios
        .get(`${this.store.apiBaseUrl}/restaurants/${this.$route.params.slug}`)
        .then((response) => {
          // console.log(response.data.results);
          if (response.data.success) {
            this.menu = response.data.results;
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
    purchase() {
      const data = {
        name: this.name,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
        totalPrice: store.totalPrice,
        cart: store.cart,
        paymentStatus: store.paymentStatus
      }
      axios.post(`${store.apiBaseUrl}/purchase`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
        console.log(response.data.results)
        console.log(response.data.order)
        store.loading= false;
        if (!response.data.success) {
            this.errors = response.data.errors;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'I dati non sono corretti',
              showConfirmButton: false,
              timer: 1500
            });
        } else {
          this.name = '';
          this.email = '';
          this.address = '';
          this.phoneNumber = '';
          localStorage.setItem('cart', JSON.stringify([]))
          store.cart = []
          setTimeout(()=>this.pay=false,2000)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'L\'ordine è stato effettuato',
            showConfirmButton: false,
            timer: 1500
          });
         
        }
      })

    },
    validate(){
      if(this.pay){
        this.pay = false
        return
      }
      if(!store.cart.length){
        Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Il carrello è vuoto',
              showConfirmButton: false,
              timer: 1500
            });
            return
      }
      const form = document.getElementById('order-form')
      const check = form.checkValidity()
      console.log(check)
      const data = {
        name: this.name,
        email: this.email,
        address: this.address,
        phoneNumber: this.phoneNumber,
      }
      if(check){
        axios.post(`${store.apiBaseUrl}/checkform`, data, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
          if (!response.data.success) {
            this.errors = response.data.errors;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'I dati non sono corretti',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            this.errors = {}
            this.pay = true
          }
        })
      }else{
        form.reportValidity()
      }
    }
  },
  watch: {
    'store.saveOrder': {
      handler() {
        this.purchase()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/partials/_variables" as *;
@use "../assets/styles/partials/_mixins" as *;

.container-monocard {
  width: 100%;

  // CARD CON FORM
  .card-riepilogo {
    .riepilogo-show {
      .riepilogo-top {
        .info-restaurant {

          .restaurant-img {
            height: 154px;
            border-radius: 6px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
            }
          }
        }

        .info-logo {

          .rider-img {
            height: 154px;

            img {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
            }
          }
        }
      }

      .riepilogo-down {
        form {
          max-width: 100%;

          .input {
            max-width: 100%;

            input {
              border-radius: 10px;
              width: 100%;
              padding: 10px 12px;
              font-size: 14px;
              line-height: 16px;
              border: 2px solid #fec7d7;
            }
          }

          .input:not(:last-child) {
            margin-bottom: 10px;
          }

          .credit-card {
            background-image: linear-gradient(180deg,
                $red 0%,
                rgba(241, 78, 83, 0.7609418767507002) 66%,
                $orange 100%);
            height: 60px;
            width: 300px;
            font-size: 28px;
            text-align: center;
          }
        }
      }
    }
  }

  // CARD CON INFO
  .card-help {
    a {

      &:hover {
        text-decoration: underline;
        color: $black;
      }
    }


    .card-tel {
      .icon {
        .fa-phone {
          font-size: 40px;
        }
      }
    }

    .card-email {
      .icon {
        .fa-envelope {
          font-size: 40px;
        }
      }
    }
  }
}

.my-height{
  height: 400px;
}

.validate-button{
  padding: 0.5rem 1rem;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;

  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: $orange;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.5s;
  border: 2px solid $orange;
  border-radius: 10px;
  box-shadow: inset 0 0 0 0 $orange;

  &:hover{
    color: white;
  box-shadow: inset 0 -100px 0 0 $orange;
  }
  &:active{
    transform: scale(0.9);
  }
}

.margin-negativo {

  margin-top: -60px !important;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.8s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition-delay: 0s;

}

@media screen  and (max-width: 575px) {
  .my-height{
  height: 500px;
}

}
</style>

