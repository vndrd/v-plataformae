<template>
  <div class="container">
    <Departamento :chartData="chartData"/>
  </div>
</template>
<script>

import Departamento from '@/components/Departamento'

export default {
  name: 'Home',
  data: () => ({
    loaded: false,
    chartData: {
      'LPZ': 39,
      'SCZ': 103,
      'CBB': 38,
      'BEN': 0,
      'PTS':10,
      'ORU': 8,
      'CHU': 1,
      'TAR': 1,
      'PAN': 10
    }
  }),  
  components: {
    Departamento
  }
}
</script>
