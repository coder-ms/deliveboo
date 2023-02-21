<template>
    <div class="container-fluid footer-container">
        <div class="container-lg py-4">

            <div
                class="primary-section d-flex flex-column flex-md-row align-items-center justify-content-md-between align-items-md-center mb-md-4">
                <div class="col-4 col-sm-2 mb-4">
                    <img src="/img/dish-drop-rw-01.png" alt="logo">
                </div>
                <div class="icons">
                    <a href="#nogo"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#nogo"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
            <div class="second-section mt-3 mt-md-0">
                <div class="d-flex flex-column flex-md-row align-items-center justify-content-sm-between text-center">
                    <div class="text-white my-4 transition-underline" v-for="(item, index) in FooterMenu">
                        <h4 class="mb-3" v-if="item.title != ''">{{ item.title }}</h4>
                        <ul class="text-white">
                            <li class="mb-3" v-for="(obj, j) in item.voices"><a href="#nogo" class="select">{{
                                obj
                            }}</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FooterMenu } from '../data/data';


export default {
    name: 'FooterComponent',

    data() {
        return {
            FooterMenu: FooterMenu,
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;

.footer-container {
    background-color: $dark;


    .icons {
        font-size: 1.6rem;
        color: $white;

        a {
            margin-right: 24px;
            transition: all 0.4s cubic-bezier(.215, .61, .355, 1);

            &:hover {
                opacity: 0.6;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .transition-underline:last-child {

        a {
            cursor: initial;

        }

    }

    .transition-underline:not(:last-child) {



        .select {

            position: relative;
            padding-bottom: 6px;
            padding-inline: 6px;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 1px;
                background-color: $white;
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
</style>