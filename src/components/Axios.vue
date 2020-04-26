<template>
    <div>
        <div class="m-5">
            <b-row>
                <b-col md="3">
                    <b-form-select                    
                        v-model="temporalName"
                        :options="countries"
                        required
                    ></b-form-select>
                    <b-button class="qwe" variant="secondary" @click="cambiar" v-if="showButton"> 
                        <b-icon-arrow-right-short />
                        </b-button>
                    <Today :currentCountry="currentCountry" />
                </b-col>
                <b-col md="9">
                    <Daily v-if="activeDaily" :key="dailykey+1" :days="fromcase1" :min="0"/>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                
            </b-row>
            <b-row>
                <b-col md="6">
                    <h1>Desde Caso 100</h1>
                    <Daily v-if="activeDaily" :key="dailykey+2" :days="fromcase100" :min="100"/>
                </b-col>
                <b-col md="6">
                    <h1>Desde Caso 500</h1>
                    <Daily v-if="activeDaily" :key="dailykey+3" :days="fromcase500" :min="500"/>
                </b-col>
            </b-row>
        </div>
    </div>    
</template>
<script>
//<Daily v-if="activeDaily" :key="dailykey" :days="fromday0" :min="0"/>
import axios from 'axios'
import Today from '@/components/Today'
import Daily from '@/components/Daily'
export default {
    name: 'Axios',
    data(){
        return {
            temporalName: 'Bolivia',
            dailykey:1,
            activeDaily: false,
            countries: [{value: null, text: 'Seleccionar País'}],
            currentCountry: {
                days: [],
                name: 'Bolivia',
                confirmed: 0,
                recovered: 0,
                deaths: 0,
                active: 0,
                lastUpdate: '',
            },
            allData: null
        }
    },
    created() {
        this.getDataPomber();
    },
    methods: {
        getDataPomber(){
            console.log('getDataPomber')
            fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => {
                this.allData = data
                this.countries = []
                for (var property in this.allData) {
                    this.countries.push({value: property, text: property})
                }
                this.getCountryPomberData()    
            });
        },
        getCountryPomberData() {
            this.dailykey += 1
            this.activeDaily = false;
            let name = this.currentCountry.name;
            //daily data
            let days = this.allData[name]
            //current data
            let len = this.allData[this.currentCountry.name].length
                let lastOne = this.allData[this.currentCountry.name][len-1]
            let {confirmed, deaths, recovered, date:lastUpdate} = lastOne
            let active = confirmed - deaths - recovered
            this.currentCountry = { 
                        name,
                        confirmed, 
                        deaths,
                        recovered,
                        active,
                        lastUpdate,
                        days
            }
            this.activeDaily = true;
        },
        cambiar() {
            this.currentCountry.name = this.temporalName
            this.getCountryPomberData();
        },
        getCountriesMathdro() {          
            axios.get(`https://covid19.mathdro.id/api/countries`).then(
                response => {
                    console.log(response.data.countries)
                    let css = response.data.countries;
                    css.map(item => {
                        this.countries.push({value: item.iso3,text: item.name })
                    })
                }
            )
        },
        getDataMathdro(){
            axios.get(`https://covid19.mathdro.id/api/countries/${this.currentCountry.name}`)
                .then(response => {
                    this.currentCountry.recovered = response.data.recovered.value;
                    this.currentCountry.confirmed = response.data.confirmed.value;
                    this.currentCountry.deaths = response.data.deaths.value;                    
                    let fecha = new Date(response.data.lastUpdate)
                    this.currentCountry.lastUpdate = fecha.toTimeString()
                })
            axios.get(`https://covid19.mathdro.id/api/countries/${this.currentCountry.name}/confirmed`)
            .then(response => {
                this.currentCountry.active = response.data[0].active
            })
        },
        changeCountry(){
            this.getDataPomber();
        },
        readTextFile(file, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
                }
            }
            rawFile.send(null);
        },
        fromcasen: function(n){
            let days = []
            this.currentCountry.days.map( day => {
                if (day.confirmed > n){
                    days.push(day)
                }
            })
            return days;
        },
    },
    computed: {
        fromcase500: function(){            return this.fromcasen(500)        },
        fromcase100: function(){            return this.fromcasen(100)        },
        fromcase1: function(){            return this.fromcasen(0)        },
        fromday0: function() {
            return this.currentCountry.days
        },
        showButton: function(){
            return this.temporalName != this.currentCountry.name
        }
    },
    components: {
        Today,
        Daily
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
    .qwe {
        position: absolute;
        right: 20;
        z-index: 999;
    }
</style>