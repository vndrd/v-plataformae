<template>
  <div class="m-5">
    <b-row>
        <b-col md="3">
            <b-form-select                    
                v-model="temporalName"
                :options="allNameCountries"
                required
            ></b-form-select>
            <b-button class="btn-cambiar" 
                    variant="secondary" 
                    v-if="showButton"
                    @click="cambiar">
                <b-icon-arrow-right-short />
            </b-button>
            <Today :currentCountry="currentCountry" />
        </b-col>
        <b-col md="9">
            <Daily v-if="activeDaily" 
                    :key="dailykey+1" 
                    :days="fromcase1" 
                    :min="0"/>
        </b-col>
    </b-row>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Today from '@/components/Today'
import Daily from '@/components/Daily'
export default {
    name: 'Axios',
    data(){
        return {
            temporalName: 'Bolivia',
            dailykey:1,
            activeDaily: true,
            countries: [{value: null, text: 'Seleccionar País'}],
            currentCountry: {
                timeseries: [],
                name: 'Bolivia',
                confirmed: 0,
                recovered: 0,
                    deaths: 0,
                    active: 0,
                    date: '',
            },
            allData: null
        }
    },
    async mounted() {
        this.setCountry()    
    },
    methods: {
        setCountry() {
            this.dailykey += 1
            const {name} = this.currentCountry;
            const {timeseries} = this.allCountries.find((country) => country.name == name)
            const last = timeseries.slice(-1)[0]
            this.currentCountry = {...last, name, timeseries }
        },
        cambiar() {
            this.currentCountry.name = this.temporalName
            this.setCountry();
        },
        fromcasen: function(n){
            let days = []
            this.currentCountry.timeseries.map( day => {
                if (day.confirmed > n){
                    days.push(day)
                }
            })
            return days;
        },
    },

    computed: {
        ...mapGetters(['getEjemplo','allCountries','allNameCountries']),
        fromcase1: function(){            return this.fromcasen(0)        },
        fromday0: function() {
            return this.currentCountry.days
        },
        showButton: function(){
            return this.temporalName != this.currentCountry.name
        },
    },
    components: {
        Today,
        Daily
    },
    beforeDestroy: function () {
        this.allCountries = []
    }
}
</script>


<style lang="scss" scope>
h6 {
    font-size: 3em !important;
    text-align:center;
}
h4 {
    text-align: center;
}
.custom-select {
    margin-right: 10px;
    /*width: 75% !important;*/
}
.btn-cambiar {
    position: absolute;
    right: 20;
    z-index: 999;
}
</style>