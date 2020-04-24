<template>
    <b-col md="12">
        <highcharts v-if="actived" :key="dailykey" :options="dataComputed" ></highcharts>
    </b-col>    
</template>
<script>
export default {
    name: 'Daily',
    props: ['country'],
    data() {
        return {
            actived: false,
            dailykey: 1,
            options: {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Departamentos'
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: '',                        
                    }
                },
                series: []
            }
        }
    },
    watch: {
    // whenever question changes, this function will run
    country: function () {
        this.actived = false;
        console.log('mounted DAILY')
        let confirmed = [] , deaths = [], active = [] , recovered = []
        this.options.xAxis.categories = []
        this.options.xAxis.series = []
        this.country.days.map( item => {
            this.options.xAxis.categories.push(item.date);
            confirmed.push(item.confirmed)
            deaths.push(item.deaths)
            recovered.push(item.recovered)
            active.push(item.confirmed - item.deaths - item. recovered)
        })
        this.options.series.push(
            {name: 'Confirmados', data: confirmed},
            {name: 'Recuperados', data: recovered},
            {name: 'Decesos', data: deaths},
            {name: 'Activos', data: active}
        )
        this.dailykey += 1;
        this.actived = true;
    }
  },
    mounted: function() {
        this.actived = false;
        console.log('mounted DAILY')
        let confirmed = [] , deaths = [], active = [] , recovered = []
        this.options.xAxis.categories = []
        this.options.xAxis.series = []
        this.country.days.map( item => {
            this.options.xAxis.categories.push(item.date);
            confirmed.push(item.confirmed)
            deaths.push(item.deaths)
            recovered.push(item.recovered)
            active.push(item.confirmed - item.deaths - item. recovered)
        })
        this.options.series.push(
            {name: 'Confirmados', data: confirmed},
            {name: 'Recuperados', data: recovered},
            {name: 'Decesos', data: deaths},
            {name: 'Activos', data: active}
        )
        
        this.actived = true;
    },
    computed: {
        dataComputed: function(){
            return this.options;
        },
    }
}
</script>