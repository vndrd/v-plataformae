<template>
  <div>  
    <Axios />
</div>
</template>
<script>

import Axios from '@/components/Axios'

export default {
  name: 'Home',
  data: () => ({
    loaded: false,
    
  }),  
  components: {
    Axios
  }
}
</script>
