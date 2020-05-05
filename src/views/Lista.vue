<template>
  <div class="lista">
    <h1 class="mt-4 fixed">
        COVID - Mundo <span>(+100 casos)</span>
    </h1>
    <b-container>
        <b-row>
            <b-col md="3" v-for="(country,index) in allCountries" :key="country.name">
                <li v-if="false">{{index+1}}</li>
                <ListItem :key="country.name" 
                        :days="getDays(country)" 
                        :countryName="country.name" 
                        :min="100" 
                        v-if="masDe100Confirmados( country )"/>
            </b-col>
        </b-row>
    </b-container>

  </div>
</template>
<script>
import ListItem from '@/components/ListItem'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            alldata: null,
            countriesData: [],
        }
    },
    mounted: function(){
        //this.getDataPomber();
        this.allCountries.sort((a,b) => {
                const { confirmed:ac} = a.timeseries.slice(-1)[0]
                const { confirmed:bc} = b.timeseries.slice(-1)[0]
                return ac > bc ? -1: 1
            }
        )
    },
    methods: {
        getDays(data){
            return data.timeseries.filter(day => {
                return day.confirmed > 100 ? 1 : 0
            });
        },
        masDe100Confirmados(country){
            return  (country.timeseries.slice(-1)[0].confirmed > 100) 
            
        },
        cambiando(){
            alert("Hyer")
            this.countriesData.sort((a,b) => {
                let lasta = a.timeseries[a.timeseries.length-1]
                let lastb = b.timeseries[b.timeseries.length-1]
                if(lasta.recovered > lastb.recovered){
                    return 0;
                }
                return 1;
            })
        }
    },
    computed: mapGetters(['allCountries']),
    components: {
        ListItem
    }
}
</script>
<style lang="scss" scoped>
.lista {
    text-align: center;
}
h1  {
    span {
        font-size: 1rem;
        font-weight: bold;
        color:#888;
    }
}
</style>