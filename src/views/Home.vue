<template>
  <div class="container">
    <Departamento :chartData="chartData" :char2="allofthem"/>
  </div>
</template>
<script>

import Departamento from '@/components/Departamento'

export default {
  name: 'Home',
  data: () => ({
    loaded: false,
    allofthem: [
      {country: 'BRASIL',
        nroConfirmados: 19943,
        nroDecesos: 1074,
        nroRecuperados: 173,
        nroTests: 62985
      },
      {country: 'ECUADOR',  
        nroConfirmados: 7161,
        nroDecesos: 297,
        nroRecuperados: 368,
        nroTests: 21568
      },
      {country: 'CHILE',
        nroConfirmados: 6501,
        nroDecesos: 65,
        nroRecuperados: 1571,
        nroTests: 72797
      },
      {country: 'PERÚ',
        nroConfirmados: 5897,
        nroDecesos: 169,
        nroRecuperados:   1569,
        nroTests:   56681
      },
      {country: 'COLOMBIA',
        nroConfirmados: 2473,
        nroDecesos: 80,
        nroRecuperados: 197,
        nroTests: 37593
      },
      {country: 'ARGENTINA',
        nroConfirmados: 1975,
        nroDecesos: 82,
        nroRecuperados: 375,
        nroTests: 16379
      },
      {country: 'URUGUAY',
        nroConfirmados: 494,
        nroDecesos: 7,
        nroRecuperados: 214,
        nroTests: 7496
      },
      {country: 'BOLIVIA',
        nroConfirmados: 275,
        nroDecesos: 20,
        nroRecuperados: 2,
        nroTests: 2185
      },
      {country: 'VENEZUELA',
        nroConfirmados: 175,
        nroDecesos: 9,
        nroRecuperados: 84,
        nroTests: 159597
      },
      {country: 'PARAGUAY',
        nroConfirmados: 133,
        nroDecesos: 6,
        nroRecuperados: 18,
        nroTests: 2482
      },
      {country: 'GUYANA F',
        nroConfirmados: 83,
        nroDecesos: 0,
        nroRecuperados: 43,
        nroTests: 0
      },
      {country: 'GUYANA',   
        nroConfirmados: 37, 
        nroDecesos: 6,
        nroRecuperados: 8,
        nroTests: 145
      },
      {country: 'SURINAM',   
        nroConfirmados: 10,
        nroDecesos: 1,
        nroRecuperados: 4,
        nroTests: 0
      },
      {country: 'MALVINAS',
        nroConfirmados: 5,
        nroDecesos: 0,
        nroRecuperados: 1,
        nroTests: 137
      },
    ],
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
