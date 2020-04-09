<template>
    <b-container>
        <b-row>
            <b-col lg="6">
                <h4>Departamentos</h4>
                <bar-chart :data="chartData" :stacked="true" :colors="['#b55']"/>
            </b-col>
            <b-col lg="6">
                <h4>Departamentos</h4>
                <highcharts :options="chartOptions"></highcharts>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
export default {
    name: 'Departamento',
    props: ['chartData'],
    data: () =>({
        chartOptions: {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Departamentos'
            },
            xAxis: {
                categories: ['LPZ', 'SCZ', 'CBB','BEN', 
                'PTS', 'ORU','CHU', 'TAR', 'PAN']
            },
            yAxis: {
                title: {
                    text: 'Casos'
                }
            },
            series: [{
                    name: 'Casos Confirmados',
                    data: [39,103,38,0,10,8,1,1,10]
                }
            ]
			}
    })
}
</script>

<style lang="scss">
    
</style>