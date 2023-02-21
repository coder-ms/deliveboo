<template>
    <div id="jumbo">
        <div class="container d-flex justify-content-between align-items-center">
            <div class="logobox ms-5">
                <img src="img/dish-drp-bw-01.png" alt="Dishdrop Logo">

            </div>
            <div class="imgbox">
                <img src="img/sushijumbo 1 (1).png" alt="sushi-jumbo">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;

#jumbo {
    background-color: $red;

    .logobox {


        img {
            width: 400px;
        }
    }
}
</style>