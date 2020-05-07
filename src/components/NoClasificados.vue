<template>
<b-container>
    <b-select
        v-model="orderByCases"
        :options="opcionesSelect"
        @change="changeOrderByCases"
        required
    >
    </b-select>
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
</template>

<script>
import ListItem from '@/components/ListItem'
import { mapGetters } from 'vuex'
export default {
        name: 'Noclasificados',
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
        console.log("slslslslslsls")
        console.log(this.clasificados)
        this.orderByConfirmed();
    },
    methods: {
        changeOrderByCases(){
            if(this.orderByCases == 'Recovered') this.orderByRecovered()
            if(this.orderByCases == 'Active') this.orderByActive()
            if(this.orderByCases == 'Confirmed') this.orderByConfirmed()
        },
        orderByActive(){
            this.allCountries.sort((a,b) => {
                    const { active: aact} = a.timeseries.slice(-1)[0]
                    const { active: bact} = b.timeseries.slice(-1)[0]
                    return aact > bact ? -1: 1
                }
            )
        },
        orderByRecovered(){
            this.allCountries.sort((a,b) => {
                    const { recovered: arec} = a.timeseries.slice(-1)[0]
                    const { recovered: brec} = b.timeseries.slice(-1)[0]
                    return arec > brec ? -1: 1
                }
            )
        },
        orderByConfirmed(){
            this.allCountries.sort((a,b) => {
                    const { confirmed: acon} = a.timeseries.slice(-1)[0]
                    const { confirmed: bcon} = b.timeseries.slice(-1)[0]
                    return acon > bcon ? -1: 1
                }
            )
        },
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
    computed: mapGetters(['allCountries' , 'clasificados']),
    components: {
        ListItem
    },
    beforeDestroy: function () {
        this.allCountries = []
        this.clasificados = []
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
    select {
        margin: 0 10px;
        display: inline-block;
        width:200px;
    }
}
</style>