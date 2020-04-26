<template>
    <b-col md="12">
        <highcharts v-if="actived" :key="dailykey" :options="dataComputed" ></highcharts>
    </b-col>    
</template>
<script>
export default {
    name: 'Daily',
    props: ['days','min'],
    data() {
        return {
            actived: false,
            dailykey: 1,
            options: {
                chart: {
                    type: 'area',
                    height: 550,
                },
                title: {
                    text: 'Casos'                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    startOnTick: false,
                    min: this.min,
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
    watch: {
    // whenever question changes, this function will run
    country: function () {
        this.setOptions()        
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
            console.log(this.options.xAxis.series)
            console.log(this.options.xAxis.categories)
            this.days.map( item => {
                this.options.xAxis.categories.push(item.date);
                confirmed.push(item.confirmed)
                deaths.push(item.deaths)
                recovered.push(item.recovered)
                active.push(item.confirmed - item.deaths - item. recovered)
            })
            let marker = {symbol:null}
            this.options.series.push(
                {name: 'Confirmados', data: confirmed, marker},
                {name: 'Activos', data: active , marker},
                {name: 'Recuperados', data: recovered ,marker},
                {name: 'Decesos', data: deaths ,marker},
            )
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