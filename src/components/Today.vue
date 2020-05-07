<template>
<div>
<h3 class="mt-3">{{currentCountry.name}}</h3>
<b-row class="mt-2">
    <b-col md="12" class="roww">
        <b-card
            title="Confirmados"
            class="mb-2"    >
            <b-card-text>
                <h2>{{currentCountry.confirmed}}</h2>
            </b-card-text>
        </b-card>                
        <b-card
            title="Recuperados"
            class="mb-2"    >
            <b-card-text>
                <h2>{{currentCountry.recovered}}</h2>
                <span class="hide2">{{porcentajeRecovered}}%</span>
            </b-card-text>
        </b-card>
        <b-card
            title="Fallecidos"
            class="mb-2"    >
            <b-card-text>
                <h2>{{currentCountry.deaths}}</h2>
                <span class="hide2">{{porcentajeDeaths}}%</span>
            </b-card-text>
        </b-card>
        <b-card
            title="Activos"
            class="mb-2"    >
            <b-card-text>
                <h2>{{currentCountry.active}}</h2>
                <span class="hide2">{{porcentajeActive}}%</span>
            </b-card-text>
        </b-card>
        <b-card
            title=""
            class="pt-2"    >
            <b-card-text>
                (Última Actualización: {{currentCountry.lastUpdate}})
            </b-card-text>
        </b-card>
    </b-col>        
</b-row>    
</div>
</template>
<script>
export default {
    name: 'Today',
    props: ['currentCountry'],
    methods: {
        porcentaje(num){
            console.log("elnum:"+num)
            let por = (num / this.currentCountry.confirmed) * 10000
            return (Math.round((por + Number.EPSILON)) / 100)
        }
    },
    computed: {
        porcentajeActive: function(){
            let a = this.porcentaje(this.currentCountry.active);
            return isNaN(a) ? '': a;
        },
        porcentajeDeaths: function(){
            let a = this.porcentaje(this.currentCountry.deaths)
            return isNaN(a) ? '': a;
        },
        porcentajeRecovered: function(){
            let a = this.porcentaje(this.currentCountry.recovered)
            return isNaN(a) ? '': a;
        }
    }
}
</script>>
<style lang="scss" scoped>
.card{
    color: white;
}
.card:nth-child(1) {
    background: #6666dd !important;
    :hover{ 
        background: #3333aa !important;
    }
}
.card:nth-child(2) {
    background: #66dd66 !important;
    :hover{
        background: #33aa33 !important;
    }
}
.card:nth-child(3) {
    background: #666 !important;
    :hover{
        background: #333 !important;
    }
}
.card:nth-child(4) {
    background: #dd6666 !important;
    :hover{
        background: #aa3333 !important;
    }
}
.card:nth-child(5) {
    color: black !important;
    border: rgba($color: #000000, $alpha: 0);
    text-align: right;
    .card-title, .card-body{
        text-align: right;
        color: black !important;
    }
}
.card:hover{
    transition: .5s ease-in-out;
    //background: rgba($color: #fff, $alpha: 0) !important;
    color: #aaa;
    .card-title{
        transition: .5s ease-in-out;
        filter: brightness(1);
        color: rgba($color: #ddd, $alpha: 1);
    }
}
    .card-title {
        margin-bottom: 0.15rem;
        position: absolute;
        top: -1px;
        width: 90%;
        font-size: 1rem;
        color: rgba($color: #fff, $alpha: 0);
        z-index: 99;
    }
    h3 , h2{
        text-align: center;
    }
    .card-body {
        padding: .75rem;
        text-align: center;
        h2{
            font-size: 3rem;
            font-weight: bold;
            padding: 0;
            margin-bottom: 0 !important;
        }
        span {
            font-size: 1rem;
        }
    }

</style>