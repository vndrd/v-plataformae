<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">Covid Tracker</b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item to="/">País</b-nav-item>
            <b-nav-item to="/lista">Mundo</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <a href="https://github.com/pomber/covid19/">API</a>
        </b-navbar-nav>
    </b-navbar>
    <LoadingBar />
    <router-view v-if="loaded" />
  </div>
</template>

<style lang="scss">

</style>
<script>
import { mapActions } from 'vuex'
import LoadingBar from '@/components/loadingbar.vue'
export default {
data() {
        return {
            loaded: false,
            menu: [/*
                {
                    header: true,
                    title: 'Main Navigation',
                    hiddenOnCollapse: true
                },*/
                {
                    href: '/',
                    title: 'General',
                    icon: 'fa fa-chart-area'
                },
                {
                    title: 'Por Municipios',
                    icon: 'fa fa-chart-bar'
                },
                {
                    title: 'Por Grupos de Contagio',
                    icon: 'fa fa-chart-pie'
                },
                {
                    
                    title: 'Evolución de los Casos COVID-19',
                    icon: 'fa fa-chart-area',
                    /*
                    child: [
                        {
                            href: '/charts/sublink',
                            title: 'Sub Link'
                        }
                    ]*/
                }
            ]
        }
    },
    async created(){
        await this.fetchCountries()
        this.loaded = true;
    },
    methods: {
        ...mapActions(['fetchCountries'])
    },
    components: {
        LoadingBar
    }
}
</script>