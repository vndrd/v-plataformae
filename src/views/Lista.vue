<template>
  <div class="lista">
    <h1 class="mt-4 fixed">
        COVID - Mundo <span>(+100 casos)</span>
    </h1>
    <b-container>
        <div class="loading" v-if="!loaded">
            Cargando
        </div>
        <b-row v-if="loaded">
            <b-col md="3" v-for="country in countriesData" :key="country.name">
                <ListItem :key="country.name" :days="getDays(country)" :min="100" :countryName="country.name"/>
            </b-col>
        </b-row>
    </b-container>

  </div>
</template>
<script>
import ListItem from '@/components/ListItem'
export default {
    data(){
        return {
            loaded: false,
            alldata: null,
            countriesData: [],
        }
    },
    created: function(){
        this.getDataPomber();
    },
    methods: {
        getDataPomber(){
            fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                this.allData = data
                this.countries = []
                for (var property in this.allData) {
                    this.countriesData.push({name: property, timeseries: data[property]})
                }
                this.countriesData.sort((a,b) => {
                    let lasta = a.timeseries[a.timeseries.length-1]
                    let lastb = b.timeseries[b.timeseries.length-1]
                    if(lasta.confirmed > lastb.confirmed){
                        return 0;
                    }
                    return 1;
                })
                this.loaded = true
            });
        },
        getDays(data){
            console.log(data)
            return data.timeseries.filter(day => {
                if(day.confirmed > 100) {
                    return 1
                }
                return 0
            });
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