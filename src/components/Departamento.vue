<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <highcharts :options="allall" v-if="actived"></highcharts>

            </b-col>
        </b-row>

    </b-container>
</template>

<script>
//https://yaminncco.github.io/vue-sidebar-menu/#/props
/*
<b-col lg="12">
                <h4>Departamentos</h4>
                <highcharts :options="chartOptions"></highcharts>
            </b-col>
*/

export default {
    name: 'Departamento',
    props: ['chartData','char2'],
    mounted: function(){
        this.chartOptionsLatin.xAxis.categories = []
        let arConfirmados = []
        let arRecuperados = []
        let arDecesos    = []
        let arTests     = []
        this.char2.map(x => {
            this.chartOptionsLatin.xAxis.categories.push(x.country)
            arConfirmados.push(x.nroConfirmados)
            arRecuperados.push(x.nroRecuperados)
            arDecesos.push(x.nroDecesos)
            arTests.push(x.nroTests)
        })
        this.chartOptionsLatin.series = []
        this.chartOptionsLatin.series.push({name: 'Confirmados',data: arConfirmados})
        this.chartOptionsLatin.series.push({name: 'Decesos',data: arDecesos})
        this.chartOptionsLatin.series.push({name: 'Recuperados',data: arRecuperados})
        this.chartOptionsLatin.series.push({name: 'Tests',data: arTests})
        this.actived = true
    },
    computed: {
        allall: function(){
            return this.chartOptionsLatin;
        },
    },
    data: () =>({
        actived: false,
        chartOptionsLatin: {
            chart: {
                type: 'column'
            },
    
    title: {
        text: 'REPORTE CORONAVIRUS AMÉRICA DEL SUR'
    },
    subtitle: {
        text: 'Viernes 10 de Abril de 2020'
    },
            colors: ['#aa5555', '#5c5c61', '#a9ff96','#FFBC75'],
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        ]
			},
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
    }
    )
}
</script>

<style lang="scss">
    
</style>