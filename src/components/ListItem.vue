<template>
    <b-col md="12">
        <highcharts v-if="loaded" 
            :key="dailykey" 
            :options="dataComputed" />
    </b-col>    
</template>
<script>
export default {
    name: 'ListItem',
    props: ['days','min','countryName'],
    data() {
        return {
            loaded: false,
            dailykey: 1,
            options: {
                chart: {
                    type: 'area',
                    height: 250,
                },
                legend: {
                    enable:false
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Casos',                
                    align: 'right',
                    verticalAlign: 'bottom',                
                },
                 
                xAxis: {
                    categories: [],
                    visible:false
                },
                yAxis: {
                    startOnTick: false,
                    min: this.min,
                    visible:false,
                    title: {
                        text: ''
                    }
                },
                colors: [
                    '#aaaadd' ,
                    '#ff8888' ,
                    '#66dd66' ,
                    '#888888' ,
                ],
                series: [],
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                annotations: []
            }
        }
    },
    mounted: function() {
        this.setOptions()        
    },
    methods: {
        setOptions: function() {
            this.loaded = false
            this.dailykey += 1
                let options = {symbol:null,showInLegend: false}
            this.options.series.push(
                {name: 'Confirmados', 
                    ...options,
                    data: this.days.map(day => day.confirmed)
                },
                {name: 'Activos', 
                    ...options,
                    data: this.days.map(day => day.active)
                },
                {name: 'Recuperados', 
                    ...options,
                    data: this.days.map(day => day.recovered)
                },
                {name: 'Decesos', 
                    ...options,
                    data: this.days.map(day => day.deaths)
                },
            )
            this.options.xAxis.categories = this.days.map(day => day.date)
            this.options.title.text = this.countryName
            
            this.loaded = true;
        }
    },
    computed: {
        dataComputed: function(){
            return this.options;
        },
    },
}
</script>
<style lang="scss" scoped>
    .highcharts-credit {
        opacity:0;
        display:none !important;
    }
</style>