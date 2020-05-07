<template>
<div>
<div v-for="(item, index) in clasificados" :key="index">
    <b-row>
        <h3 class="mt-3">
            +{{item.text}}
        </h3>
    </b-row>
    <b-row>
        <b-col md="3" v-for="country in item.data" :key="country.name">
                <ListItem :key="country.name" 
                    :days="getDays(country)" 
                    :countryName="country.name" 
                    :min="100" 
                    v-if="masDe100Confirmados( country )"/>
        </b-col>        
    </b-row>
</div>
</div>
</template>

<script>
/*
<b-col md="3" v-for="(country,index) in allCountries" :key="country.name">
                <li v-if="false">{{index+1}}</li>
                <ListItem :key="country.name" 
                    :days="getDays(country)" 
                    :countryName="country.name" 
                    :min="100" 
                    v-if="masDe100Confirmados( country )"/>
            </b-col>
  */
import ListItem from '@/components/ListItem'
import { mapGetters } from 'vuex'
export default {
        name: 'Clasificados',
        data(){
        return {
            alldata: null,
            countriesData: [],
            orderByCases: 'Recovered',
            opcionesSelect: [
                {value: 'Recovered',text: 'Recovered'},
                {value: 'Active',text: 'Active'},
                {value: 'Confirmed',text: 'Confirmed'}
            ]
        }
    },
    mounted: function(){
        
    },
    methods: {
        getDays(data){
            return data.timeseries.filter(day => {
                return day.confirmed > 100 ? 1 : 0
            });
        },
        masDe100Confirmados(country){
            return  country.timeseries.slice(-1)[0].confirmed > 100 
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
    computed: {
        ...mapGetters(['allCountries']),
        clasificados(){
        return [
            {
                text: '1M', 
                data: this.allCountries.filter(({confirmed}) => 
                     confirmed > 1000000 
                ),
            },
            {
                text: '100.000', 
                data: this.allCountries.filter(({confirmed}) => 
                    1000000 > confirmed && confirmed> 100000
                )
            },
            {
                text: '10.000', 
                data: this.allCountries.filter(({confirmed}) => 
                    100000 > confirmed && confirmed> 10000
                )
            },
            {
                text: '1.000', 
                data: this.allCountries.filter(({confirmed}) => 
                    10000 > confirmed && confirmed> 1000
                )
            },
            {
                text: '100', 
                data: this.allCountries.filter(({confirmed}) => 
                    1000 > confirmed && confirmed > 100
                )
            }
        ]
    
        }
    },
    components: {
      ListItem
    },
    beforeDestroy: function () {
        this.clasificados = []
    }
}
</script>
<style lang="scss" scoped>
.lista {
    text-align: center;
}
h3 {
    font-weight: bold;
    display:inline;
    color:#fff;
    padding: 10px;
    background-color: #112;
    border-radius: 100px;

}
h1  {
    span {
        font-size: 1rem;
        font-weight: bold;
        color:#888;
    }
    select {
        margin: 0 10px;
        display: inline-block;
        width:200px;
    }
}
</style>