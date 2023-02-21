<template>
    <div class="jumbo-restaurant">
        
        
    </div>



</template>

<script>
import axios from 'axios';
import{store} from '../store';
    export default {
       data(){
        return{
            store,
            
        }
       },
      
    
    }
        
       
       
    

</script>

<style lang="scss" scoped>
@use '../assets/styles/partials/_variables' as *;
@use '../assets/styles/partials/_mixins' as *;
.jumbo-restaurant{
    background-color: $red;
    width: 100%;
    position:relative;
height: 80px;
        
    
    

}

</style>