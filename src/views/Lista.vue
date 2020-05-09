<template>
  <div class="lista">
    <h1 class="my-4  fixed" >
        COVID - Mundo 
        <span>(+100 casos)</span>        
    </h1>
        <NoClasificados 
            v-if="false"        
        />
        <Clasificados 
            
        />
    
  </div>
</template>
<script>
import NoClasificados from '@/components/NoClasificados'
import Clasificados from '@/components/Clasificados'
export default {
    data(){
        return {
            opcion: 1
        }
    },
    components: {
        NoClasificados, Clasificados
    }
}
</script>
<style lang="scss">
h1  {
    span {
        font-size: 1rem;
        font-weight: bold;
        color:#888;
    }
}
.lista {
    text-align: center;
}
</style>