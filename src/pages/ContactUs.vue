<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <ContactComponent />
    </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import ContactComponent from '../components/ContactComponent.vue';
export default {
    name: "CheckOutPage",
    components: { HeaderComponent, ContactComponent }
}
</script>

<style lang="scss" scoped>

</style>