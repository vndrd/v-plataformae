<template>
    <div>
        <h3>País: {{currentCountry.name}}</h3>
        <b-row class="mt-4">
            <b-col md="3">
                <b-card
                    title="Confirmados"
                    style="max-width: 20rem;"
                    class="mb-2"    >
                    <b-card-text>
                        <h6>{{currentCountry.confirmed}}</h6>
                        <p>Última Actualización: {{currentCountry.lastUpdate}}</p>
                    </b-card-text>
                </b-card>
            </b-col> 
            <b-col md="3">                
                <b-card
                    title="Recuperados"
                    style="max-width: 20rem;"
                    class="mb-2"    >
                    <b-card-text>
                        <h6>{{currentCountry.recovered}}</h6>
                        <p>Última Actualización: {{currentCountry.lastUpdate}}</p>
                    </b-card-text>
                </b-card>
            </b-col> 
            <b-col md="3">
                <b-card
                    title="Fallecidos"
                    style="max-width: 20rem;"
                    class="mb-2"    >
                    <b-card-text>
                        <h6>{{currentCountry.deaths}}</h6>
                        <p>Última Actualización: {{currentCountry.lastUpdate}}</p>
                    </b-card-text>
                </b-card>
            </b-col>    
            <b-col md="3">       
                <b-card
                    title="Activos"
                    style="max-width: 20rem;"
                    class="mb-2"    >
                    <b-card-text>
                        <h6>{{currentCountry.active}}</h6>
                        <p>Última Actualización: {{currentCountry.lastUpdate}}</p>
                    </b-card-text>
                </b-card>
            </b-col>        
        </b-row>    
    </div>
</template>
<script>
export default {
    name: 'Today',
    props: ['currentCountry']
}
</script>>
