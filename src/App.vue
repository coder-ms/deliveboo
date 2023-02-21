<template>
  <div :class="{ 'cartTest': store.cartShow }">
    <router-view></router-view>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
import { store } from './store';

export default {
  name: 'App',

  components: {
    RouterView,
    FooterComponent,
  },

  data() {
    return {
      store,
    }
  }

}
</script>

<style lang="scss" scoped>
.cartTest {
  height: 100vh;
  overflow: hidden;
}
</style>