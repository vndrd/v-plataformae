<template>
<div>
    <div class="wrapper" v-if="false">
        <div v-for="(item, index) in clasificados" :key="index" >
            <b-row>
                <h3 class="mt-3">
                    +{{item.text}}
1                </h3>
            </b-row>
            <b-row>
                <b-col md="3" v-for="country in item.data" :key="country.name">
                    <h5>{{country.name}}</h5>
                    <h4>{{acortarNumero(country.confirmed)}}</h4>
                    <ListItem :key="country.name" 
                        :days="getDays(country)" 
                        :countryName="country.name" 
                        :min="100" 
                        v-if="masDe100Confirmados( country )"/>
                </b-col>        
            </b-row>
        </div>
    </div>
    <b-row>
        <b-col md="3" v-for="country in ordenados" :key="country.name">
            <h5>{{country.name}}</h5>
            <h4>{{acortarNumero(country.active)}}</h4>
            <ListItem :key="country.name" 
                :days="getDays(country)" 
                :countryName="country.name" 
                :min="100" 
                v-if="masDe100Confirmados( country )"/>
        </b-col>        
    </b-row>
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
import { mapGetters, mapActions } from 'vuex'
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
        ...mapActions(['resetCartState']),
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
        },
        acortarNumero(numero){
            if (numero > 1000000) 
                return `${parseInt(numero / 1000000)} M`
            if ( 1000000 > numero && numero > 9999) 
                return `${parseInt(numero / 1000)} k`
            return `${parseInt(numero / 100)/10} k`
        }
    },
    computed: {
        ...mapGetters(['allCountries']),
        ordenados(){
            let all = this.allCountries;
            return all.sort( ({active: a},{active: b}) => {return a > b ? -1: 1 })
        },
        clasificados(){
            let all = this.allCountries;
            all.sort( ({confirmed: a},{confirmed: b}) => {return a > b ? -1: 1 })
        return [
            {
                text: '1M', 
                data: all.filter(({confirmed}) => 
                     confirmed > 1000000 
                ),
            },
            {
                text: '100.000', 
                data: all.filter(({confirmed}) => 
                    1000000 > confirmed && confirmed> 100000
                )
            },
            {
                text: '10.000', 
                data: all.filter(({confirmed}) => 
                    100000 > confirmed && confirmed> 10000
                )
            },
            {
                text: '1.000', 
                data: all.filter(({confirmed}) => 
                    10000 > confirmed && confirmed> 1000
                )
            },
            {
                text: '100', 
                data: all.filter(({confirmed}) => 
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
        this.resetCartState();
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
h4 {
    position: absolute;
    z-index:9999999;
    left:40px;
    top:70px;
    font-weight: bold;
    font-size: 1rem;
    padding-left: 10px;
    border-left: rgba(255,0,0,.3) solid 4px;
}

h5 {
    padding: 5px 20px;
    border-radius: 0px 20px 20px 0px;
    background: rgba(1,1,1,.5);
    color:#fff;
    left:40px;
    top:30px;
    position: absolute;
    z-index:9999999;
    
}
</style>