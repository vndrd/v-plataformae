<template>
    <div>
        <b-container class="mt-4">
            <b-row>
                <b-col md="4">
                    <b-form-select
                        v-model="currentCountry.name"
                        :options="countries"
                        required
                    ></b-form-select>
                </b-col>
                <b-col md="4">
                    <b-button variant="secondary" @click="getCountryPomberData"> Cambiar </b-button>
                </b-col>
            </b-row>
            <b-row>
                <Today :currentCountry="currentCountry" />
            </b-row>
            <b-row class="mt-4">
                <Daily v-if="activeDaily" :country="currentCountry"/>
            </b-row>
        </b-container>
    </div>    
</template>
<script>
import axios from 'axios'
import Today from '@/components/Today'
import Daily from '@/components/Daily'
export default {
    name: 'Axios',
    data(){
        return {
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
        console.log("mounted bitch");
        //this.getCountriesMathdro()
        //this.getDataMathdro(); 
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
</style>