<template>
    <b-col md="12">
        <highcharts v-if="actived" :key="dailykey" :options="dataComputed" ></highcharts>
    </b-col>    
</template>
<script>
export default {
    name: 'ListItem',
    props: ['days','min','countryName'],
    data() {
        return {
            actived: false,
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
                }
            }
        }
    },
    mounted: function() {
        this.setOptions()        
    },
    methods: {
        setOptions: function() {
            this.actived = false;
            this.dailykey += 1            
            let confirmed = [] , deaths = [], active = [] , recovered = []
            this.options.xAxis.categories = []
            this.options.xAxis.series = []
            this.days.map( item => {
                this.options.xAxis.categories.push(item.date);
                confirmed.push(item.confirmed)
                deaths.push(item.deaths)
                recovered.push(item.recovered)
                active.push(item.confirmed - item.deaths - item. recovered)
            })
            let marker = {symbol:null}
            this.options.series.push(
                {name: 'Confirmados', data: confirmed, marker,showInLegend: false},
                {name: 'Activos', data: active , marker,showInLegend: false},
                {name: 'Recuperados', data: recovered ,marker,showInLegend: false},
                {name: 'Decesos', data: deaths ,marker,showInLegend: false},
            )
            this.options.title.text = this.countryName
            this.actived = true;
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