<template>
    <div class="cart" :class="{ 'show': store.cartShow }">


        <div class="my-cart">

            <div class="inner-cart d-flex flex-column justify-content-between">
                <i class="fa-solid fa-xmark" @click="store.cartShow = false"></i>
                <h2 class="text-center">Il tuo ordine</h2>
                <div class="py-3 items-box">
                    <div v-for="(item, i) in store.cart" class="cart-item">
                        <div class="close" @click="removeItem(item, i)">X</div>
                        <div class="img-box">
                            <img v-if="item.image" :src="`${store.imagBasePath}${item.image}`">
                            <img v-else src="/img/dd-slide.png" alt="">
                            <div class="pricex">{{ item.price }} &nbsp;&euro; </div>
                        </div>
                        <span class="text-capitalize me-3">{{ item.name }} </span>
                        <div class="d-flex">
                            <button class="btn-cart" @click="removeQuantity(item, i)"> - </button>
                            <span class="px-2">{{ item.quantity }}</span>
                            <button class="btn-cart" @click="addQuantity(item, i)"> + </button>
                        </div>
                    </div>
                </div>

                <div v-if="store.cart.length >= 1" class="price">{{ store.totalPrice }} &euro;</div>
                <div class="text-center cart-buttons" v-if="store.cart.length >= 1">
                    <button class="reset-btn" @click="resetOrder()">Resetta</button>
                    <router-link :to="{ name: 'check-out', params: { slug: restaurantSlug } }"
                        @click="store.cartShow = false"><button>Compra</button></router-link>
                </div>
                <div class="cart-buttons text-center" v-else>Aggiungi un prodotto per ordinare</div>
            </div>

        </div>

    </div>
</template>

<script>
import { store } from '../store'
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            store,
            restaurantSlug: 'aaa'
        }
    },
    computed: {

    },
    methods: {
        addQuantity(dish, i) {
            store.cart[i].quantity++
            const cart = JSON.parse(localStorage.getItem('cart'));
            const item = cart.find(item => item.id === dish.id);
            item.quantity++
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        removeQuantity(dish, i) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            const item = cart.find(item => item.id === dish.id);
            item.quantity--
            if (item.quantity) {
                localStorage.setItem('cart', JSON.stringify(cart));
                store.cart[i].quantity--;
            } else {
                cart = cart.filter((element) => element.slug !== dish.slug)
                localStorage.setItem('cart', JSON.stringify(cart));
                store.cart.splice(i, 1)
            }
        },
        clearCart() {
            localStorage.clear()
            store.cart = [];

        },
        resetOrder() {
            Swal.fire({
                title: 'Sei sicuro di annullare l\'ordine?',
                text: "Non sarai più in grado di recuperarlo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Annulla',
                confirmButtonText: 'Si, cancella!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.clearCart();
                    Swal.fire(
                        'Eliminato!',
                        'Il tuo ordine è stato cancellato.',
                        'success'
                    )
                }
            })


        },
        getTotal() {
            let total = 0
            for (let i = 0; i < store.cart.length; i++) {
                total += (store.cart[i].price * store.cart[i].quantity)
                // console.log(store.cart[i].price)
                // console.log(store.cart[i].quantity)
                // console.log(total)



            }
            total = total.toFixed(2)
            store.totalPrice = total
        },
        getRestaurantSLug() {
            this.restaurantSlug = localStorage.getItem('restaurantSlug') || 'aaa'

        },
        removeItem(item, i) {
            store.cart.splice(i, 1);

            const cart = JSON.parse(localStorage.getItem('cart'));
            const index = cart.findIndex((element) => {
                return element.id == item.id;
            });
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
        }

    },
    watch: {
        'store.cart': {
            handler() {
                this.getTotal()
            },
            deep: true
        }
    },
    mounted() {
        this.getTotal()
        this.getRestaurantSLug()
    }
}

</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;

.price {
    text-align: center;
    font-weight: bold;
    font-size: 1.3rem;
    color: $red;
}

.cart {
    width: 100%;
}

.my-cart {
    padding: 0 1rem 1rem 1rem;

    .inner-cart {

        min-height: 286px;
        max-height: 624px;
        overflow: hidden;
        padding: 16px;
        background-color: $white;
        border-radius: 6px;
        -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
        position: relative;




        .items-box {
            max-height: calc(624px - 160px);
            overflow: auto;

            &::-webkit-scrollbar {
                display: none;
            }
        }


        i {
            display: none;
        }

        span{
            font-weight: 500;
        }
        .btn-cart {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            width: 25px;
            height: 25px;
            border: 0;
            background-color: $white;
            border-radius: 50%;

            &:hover {
                background-color: $orange;

            }
        }

        .cart-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            position: relative;

            &:hover {
                cursor: pointer;
                background-color: $white;
                border-radius: 6px;
                -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.54);

                .close {
                    display: block;
                }
            }

            .close {
                position: absolute;
                top: 10px;
                right: 10px;
                display: none;
                color: $red;
                font-weight: bolder;
                font-size: $font-md;
                transition: 0.5s;

                &:hover{
                    animation: tilt-shaking 0.2s ease 0s 4;
                }
            }
            @keyframes tilt-shaking {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(8deg); }
              50% { transform: rotate(0eg); }
              75% { transform: rotate(-8deg); }
              100% { transform: rotate(0deg); }
              }
            .img-box {
                width: 90px;
                height: 90px;
                border-radius: 6px;
                overflow: hidden;
                margin-right: 15px;
                flex-shrink: 0;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .pricex {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    padding: 3px 3px;
                    background-color: $red;
                    color: $white;
                    font-weight: $font-w-md;
                    font-size: $font-sl;
                }
            }
        }




        .cart-buttons {

            button {
                margin-top: 8px;
                padding: 6px 12px;
                border-radius: 6px;
                
                position: relative;
                display: inline-block;
                text-align: center;
                letter-spacing: 1px;
                text-decoration: none;
                color: $red;
                background: transparent;
                cursor: pointer;
                transition: ease-out 0.5s;
                border: 2px solid $red;
                border-radius: 10px;
                box-shadow: inset 0 0 0 0 $red;

                &:hover{
                  color: white;
                    box-shadow: inset 0 -100px 0 0 $red;
                }
                &:active{
                  transform: scale(0.9);
                }

                &.reset-btn {
                    margin-right: 12px;
                    color: $orange;
                    border: 2px solid $orange;
                    box-shadow: inset 0 0 0 0 $orange;
                    &:hover{
                        box-shadow: inset 0 -100px 0 0 $orange;
                  color: white;

                    }
                }

            }
        }
    }
}



@media (max-width: 1199px) {

    .cart {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1050;
        background-color: rgba(0, 0, 0, 0.3);
        display: none;

    }

    .my-cart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        min-height: 324px;

        .inner-cart {
            height: 100%;
            position: relative;

            i {
                display: block !important;
                position: absolute;
                top: 24px;
                left: 24px;
                cursor: pointer;
            }

        }
    }

    .show {
        display: block;
    }
}



@media (max-width: 768px) {


    .my-cart {

        .inner-cart {
            .btn-cart {
            font-size: 18px;
            width: 20px;
            height: 20px;

        }
            .cart-item {

                padding: 16px;

                .close {
                    font-size: $font-sl;
                    top: 4px;
                    right: 4px;
                    display: block;
                }
            }

            .img-box {
                display: none;
            }

        }


    }
}
</style>